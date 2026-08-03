import { TemplateResult, html, nothing } from "lit-html";

import { definitionListTemplate } from "../definition-list/definition-list.template.js";
import { headingTemplate } from "../heading/heading.template.js";
import { iconButtonTemplate } from "../icon-button/icon-button.template.js";
import { linkTemplate } from "../link/link.template.js";

import { ProjectItem } from "./project-item.models.js";

export function projectItemTemplate({
  href,
  title,
  headingLevel,
  label,
  actions,
  progress,
  status,
}: ProjectItem<TemplateResult>) {
  return html`<dso-project-item label=${label}>
    ${headingTemplate({
      level: headingLevel ?? 2,
      children: linkTemplate({ label: title, url: href }),
      slotName: "title",
    })}
    ${actions?.length ? html`<div slot="actions">${actions.map((a) => iconButtonTemplate(a))}</div>` : nothing}
    ${progress ? definitionListTemplate({ ...progress, modifier: "dso-grouped", slotName: "progress" }) : nothing}
    ${definitionListTemplate({ ...status, modifier: "dso-inline-end", slotName: "status" })}
  </dso-project-item>`;
}
