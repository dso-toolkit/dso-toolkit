import { ViewerGridFilterblok } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";

import { buttonTemplate } from "../button/button.template";
import { contextTemplate } from "../context/context.template";
import { labelGroupTemplate } from "../label-group/label-group.template";

export function viewerGridFilterblok({
  title,
  address,
  activeFilters,
  onAllOptions,
}: ViewerGridFilterblok<TemplateResult>) {
  return html`
    <section class="dso-filterblok">
      <div class="dso-highlight-box">
        ${contextTemplate({
          type: "label",
          label: title,
          content: buttonTemplate({
            onClick: onAllOptions,
            variant: "tertiary",
            label: "Alle opties",
            icon: {
              icon: "pencil",
            },
          }),
          children: html`
            <p class="dso-filterblok-address">${address}</p>
            ${labelGroupTemplate({ labels: activeFilters })}
          `,
        })}
      </div>
    </section>
  `;
}
