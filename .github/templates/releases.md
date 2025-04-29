# Notas de Lanzamiento

*Última actualización: {{current_date}}*

{{#each releases}}
## {{this.title}} {{#if this.tag_name}}({{this.tag_name}}){{/if}}

*Lanzado el {{format_date this.created_at}}*

{{this.body}}

### Pull Requests Incluidos

{{#each this.pull_requests}}
- **[#{{this.number}}]({{this.html_url}})**: {{this.title}} *(fusionado por {{this.merged_by.login}})*
  {{#if this.linked_issues}}
  **Issues relacionados**: {{#each this.linked_issues}}[#{{this.number}}]({{this.html_url}}){{#unless @last}}, {{/unless}}{{/each}}
  {{/if}}
{{else}}
*No hay pull requests en este lanzamiento.*
{{/each}}

### Milestone Asociado

{{#if this.milestone}}
Este lanzamiento es parte del milestone [{{this.milestone.title}}]({{this.milestone.html_url}}).
{{else}}
*No hay milestone asociado a este lanzamiento.*
{{/if}}

---
{{/each}} 