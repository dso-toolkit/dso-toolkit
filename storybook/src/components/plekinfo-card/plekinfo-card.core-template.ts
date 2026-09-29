import { DsoPlekinfoCardCustomEvent, PlekinfoCardClickEvent } from "@dso-toolkit/core";
import { PlekinfoCard } from "dso-toolkit";
import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const corePlekinfoCard: ComponentImplementation<PlekinfoCard<TemplateResult>> = {
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
      items,
      meta,
      wijzigactie,
      interaction,
      noStroke,
      dsoPlekinfoCardClick,
    }) {
      const renderedItems =
        items && items.length > 0
          ? html`${items.map(
              (item) => html`
                <dso-plekinfo-card-item wijzigactie=${ifDefined(item.wijzigactie || undefined)}>
                  <span slot="symbol">${item.symbool}</span>
                  <span slot="label">${typeof item.label === "string" ? item.label : renvooiTemplate(item.label)}</span>
                  ${
                    item.sublabel
                      ? html`<span slot="sublabel">
                          ${typeof item.sublabel === "string" ? item.sublabel : renvooiTemplate(item.sublabel)}
                        </span>`
                      : nothing
                  }
                  ${item.meta ? html`<div slot="meta">${labelTemplate(item.meta)}</div>` : nothing}
                </dso-plekinfo-card-item>
              `,
            )}`
          : undefined;

      return html` <dso-plekinfo-card
        href=${href}
        target-blank=${targetBlank}
        .noStroke=${noStroke}
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
        ${
          interaction
            ? html` <div slot="interaction">
                <div class="dso-card-interaction">${slideToggleTemplate(interaction)}</div>
              </div>`
            : nothing
        }
        ${
          renderedItems
            ? richContentTemplate({
                children: renderedItems,
                slot: "content",
              })
            : content
              ? richContentTemplate({ children: content, slot: "content" })
              : nothing
        }
      </dso-plekinfo-card>`;
    },
};
