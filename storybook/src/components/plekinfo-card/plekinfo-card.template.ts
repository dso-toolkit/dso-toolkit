import { DsoPlekinfoCardCustomEvent } from "@dso-toolkit/core";
import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { labelTemplate } from "../label/label.template.js";
import { renvooiTemplate } from "../renvooi/renvooi.template.js";
import { richContentTemplate } from "../rich-content/rich-content.template.js";
import { slideToggleTemplate } from "../slide-toggle/slide-toggle.template.js";

import { PlekinfoCard, PlekinfoCardClickEvent, PlekinfoCardItem } from "./plekinfo-card.models.js";

export function plekinfoCardTemplate({
  label,
  href,
  targetBlank,
  active,
  symbool,
  content,
  meta,
  wijzigactie,
  interaction,
  items,
  dsoPlekinfoCardClick,
}: PlekinfoCard) {
  const renderedItems: TemplateResult | undefined =
    items && items.length > 0
      ? html`${items.map(
          (item: PlekinfoCardItem) => html`
            <dso-plekinfo-card-item slot="content" wijzigactie=${ifDefined(item.wijzigactie)}>
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
    wijzigactie=${ifDefined(wijzigactie || undefined)}
    ?active=${active}
    @dsoPlekinfoCardClick=${(event: DsoPlekinfoCardCustomEvent<PlekinfoCardClickEvent>) => {
      if (!event.detail.isModifiedEvent) {
        event.detail.originalEvent.preventDefault();
      }

      dsoPlekinfoCardClick?.(event);
    }}
  >
    ${symbool ? html`<span slot="symbol">${symbool}</span>` : nothing}
    ${html`<h2 slot="heading">${typeof label === "string" ? label : renvooiTemplate(label)}</h2>`}
    ${meta ? html`<div slot="meta">${labelTemplate(meta)}</div>` : nothing}
    ${
      interaction
        ? html`<div slot="interaction">
            <div class="dso-card-interaction">${slideToggleTemplate(interaction)}</div>
          </div>`
        : nothing
    }
    ${renderedItems ? renderedItems : content ? richContentTemplate({ children: content, slot: "content" }) : nothing}
  </dso-plekinfo-card>`;
}
