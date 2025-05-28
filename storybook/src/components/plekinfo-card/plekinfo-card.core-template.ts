import { DsoPlekinfoCardCustomEvent, PlekinfoCardClickEvent } from "@dso-toolkit/core";
import { PlekinfoCard } from "dso-toolkit";
import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

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
        ${meta ? html` <div slot="meta">${labelTemplate(meta)}</div>` : nothing}
        ${interaction
          ? html` <div slot="interaction">
              <div class="dso-card-interaction">${slideToggleTemplate(interaction)}</div>
            </div>`
          : nothing}
        ${content && richContentTemplate({ children: content, slot: "content" })}
      </dso-plekinfo-card>`;
    },
};
