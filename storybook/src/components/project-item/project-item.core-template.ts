import { ProjectItem } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreProjectItem: ComponentImplementation<ProjectItem<TemplateResult>> = {
  component: "projectItem",
  implementation: "core",
  template: ({ anchorTemplate, buttonTemplate, headingTemplate, definitionListTemplate }) =>
    function projectItemTemplate({ href, title, headingLevel, label, actions, progress, status }) {
      return html`<dso-project-item label=${label}>
        ${headingTemplate({
          level: headingLevel ?? 2,
          children: anchorTemplate({ label: title, url: href }),
          slotName: "title",
        })}
        ${actions?.length ? html`<div slot="actions">${actions.map((a) => buttonTemplate(a))}</div>` : nothing}
        ${progress ? definitionListTemplate({ ...progress, slotName: "progress" }) : nothing}
        ${definitionListTemplate({ ...status, slotName: "status" })}
      </dso-project-item>`;
    },
};
