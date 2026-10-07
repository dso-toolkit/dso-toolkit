import { DsoPlekinfoCardCustomEvent } from "@dso-toolkit/core";
import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { labelTemplate } from "../label/label.template.js";
import { Renvooi } from "../renvooi/renvooi.models.js";
import { renvooiTemplate } from "../renvooi/renvooi.template.js";
import { richContentTemplate } from "../rich-content/rich-content.template.js";
import { slideToggleTemplate } from "../slide-toggle/slide-toggle.template.js";

import { PlekinfoCard, PlekinfoCardClickEvent, PlekinfoCardItem } from "./plekinfo-card.models.js";

function textTemplate(text: Renvooi | string) {
  return typeof text === "string" ? text : renvooiTemplate(text);
}

function plekinfoCardItemTemplate({ symbool, label, sublabel, meta, wijzigactie }: PlekinfoCardItem) {
  return html`
    <dso-plekinfo-card-item slot="content" wijzigactie=${ifDefined(wijzigactie)}>
      <span slot="symbol">${symbool}</span>
      <span slot="label">${textTemplate(label)}</span>
      ${sublabel ? html`<span slot="sublabel">${textTemplate(sublabel)}</span>` : nothing}
      ${meta ? html`<div slot="meta">${labelTemplate(meta)}</div>` : nothing}
    </dso-plekinfo-card-item>
  `;
}

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
    ${html`<h2 slot="heading">${textTemplate(label)}</h2>`}
    ${meta ? html`<div slot="meta">${labelTemplate(meta)}</div>` : nothing}
    ${
      interaction
        ? html`<div slot="interaction">
            <div class="dso-card-interaction">${slideToggleTemplate(interaction)}</div>
          </div>`
        : nothing
    }
    ${items ? items.map(plekinfoCardItemTemplate) : nothing}
    ${content ? richContentTemplate({ children: content, slot: "content" }) : nothing}
  </dso-plekinfo-card>`;
}
