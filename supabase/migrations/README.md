# Migrations

Execute na ordem numérica. O conteúdo SQL completo de cada tabela está no
documento "Schema SQL — Supabase" (entregue separadamente) e deve ser
colado aqui conforme implementação.

| Arquivo | Conteúdo |
|---|---|
| 0001 | Extensões e enums (✅ pronto) |
| 0002 | usuarios + assinaturas |
| 0003 | tomadores + usuario_tomador |
| 0004 | processos_judiciais + contratos_publicos + restritivos |
| 0005 | analises_financeiras |
| 0006 | seguradoras + modalidades + linhas_de_corte + função filtrar_seguradoras |
| 0007 | documentos_kb + legislacao + condicoes_gerais + função buscar_conhecimento |
| 0008 | oportunidades_judiciais + alertas_processuais |
| 0009 | analises_documentos + regras_impedimento |
| 0010 | RLS + seed (modalidades, Mapfre inativa) |

Use `supabase db push` para aplicar (ver docs/02-supabase-setup.md).
