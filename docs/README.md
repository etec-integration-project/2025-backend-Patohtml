# Documentación Automática

Este directorio contiene la documentación generada automáticamente basada en los cambios en milestones, issues y pull requests de GitHub.

## Estructura

- `milestones/` - Documentación generada para cada milestone
- `changelog.md` - Registro de cambios basado en issues cerrados
- `releases.md` - Notas de lanzamiento basadas en pull requests fusionados

## Generación Automática

La documentación se genera automáticamente mediante GitHub Actions cuando ocurren cambios en milestones, issues o pull requests.

Para más información sobre la configuración, consulte el archivo [../.github/doc-config.yml](../.github/doc-config.yml). 