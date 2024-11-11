import { isSlideToggleInterface, PlekinfoCard } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";

import { ComponentImplementation } from "../../templates";
import { DsoPlekinfoCardCustomEvent, PlekinfoCardClickEvent } from "@dso-toolkit/core";
import { ifDefined } from "lit-html/directives/if-defined.js";

export const corePlekinfoCard: ComponentImplementation<PlekinfoCard<never>> = {
  component: "plekinfoCard",
  implementation: "core",
  template: ({ labelTemplate, renvooiTemplate, richContentTemplate, slideToggleTemplate }) =>
    function plekinfoCardTemplate({
      label,
      href,
      targetBlank,
      active,
      symbool,
      content,
      meta,
      wijzigactie,
      interaction,
      dsoPlekinfoCardClick,
    }: PlekinfoCard<TemplateResult>) {
      return html` <dso-plekinfo-card
        href=${href}
        target-blank=${targetBlank}
        wijzigactie=${ifDefined(wijzigactie || undefined)}
        ?active=${active}
        @dsoPlekinfoCardClick=${(e: DsoPlekinfoCardCustomEvent<PlekinfoCardClickEvent>) => {
          if (!e.detail.isModifiedEvent) {
            e.detail.originalEvent.preventDefault();
          }

          dsoPlekinfoCardClick?.(e);
        }}
      >
        ${symbool ? html`<span slot="symbol">${symbool}</span>` : nothing}
        ${html`<h2 slot="heading">${typeof label === "string" ? label : renvooiTemplate(label)}</h2>`}
        ${meta ? html`<div slot="meta">${labelTemplate(meta)}</div>` : nothing}
        ${interaction
          ? html`<div slot="interaction">
              <div class="dso-card-interaction">
                ${isSlideToggleInterface(interaction) ? slideToggleTemplate(interaction) : nothing}
              </div>
            </div>`
          : nothing}
        ${content && richContentTemplate({ children: content, slot: "content" })}
      </dso-plekinfo-card>`;
    },
};
