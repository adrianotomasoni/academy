"""Helper compartilhado para integrações externas com fallback para mock.

Todas as integrações (apibrasil, datajud, pncp, escavador) seguem o mesmo
padrão: tentam a chamada real e, em caso de indisponibilidade, caem num mock
para não quebrar o fluxo do dossiê. Este helper centraliza esse padrão e
diferencia o tipo de erro no log (timeout vs. autenticação vs. HTTP vs. inesperado),
em vez de cada módulo reimplementar o mesmo try/except genérico.
"""
import logging
from typing import Callable, Optional, TypeVar

import httpx

T = TypeVar("T")


def consultar_com_fallback(
    buscar_real: Callable[[], T],
    mock: Callable[[], T],
    *,
    fonte: str,
    logger: Optional[logging.Logger] = None,
) -> T:
    """Executa ``buscar_real`` e, em qualquer falha de rede/parse, cai em ``mock``.

    Args:
        buscar_real: callable que faz a chamada real (sem argumentos).
        mock: callable que devolve o resultado simulado (sem argumentos).
        fonte: nome da integração, usado nas mensagens de log.
        logger: logger opcional; se ausente, usa ``logging.getLogger(fonte)``.
    """
    log = logger or logging.getLogger(fonte)
    try:
        return buscar_real()
    except httpx.TimeoutException as exc:
        log.warning("%s: timeout (%s) — usando mock", fonte, exc)
    except httpx.HTTPStatusError as exc:
        status = exc.response.status_code if exc.response is not None else "?"
        if status in (401, 403):
            log.warning("%s: autenticação falhou (HTTP %s) — usando mock", fonte, status)
        else:
            log.warning("%s: erro HTTP %s — usando mock", fonte, status)
    except httpx.HTTPError as exc:
        log.warning("%s: indisponível (%s) — usando mock", fonte, exc)
    except Exception as exc:  # noqa: BLE001 — fallback defensivo (parse, chave ausente etc.)
        log.warning("%s: erro inesperado (%s) — usando mock", fonte, exc)
    return mock()
