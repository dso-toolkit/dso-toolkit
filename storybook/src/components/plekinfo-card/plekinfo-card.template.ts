import { DsoPlekinfoCardCustomEvent } from "@dso-toolkit/core";
import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { labelTemplate } from "../label/label.template.js";
import { renvooiTemplate } from "../renvooi/renvooi.template.js";
import { richContentTemplate } from "../rich-content/rich-content.template.js";

import { PlekinfoCard, PlekinfoCardClickEvent } from "./plekinfo-card.models.js";
import { slideToggleTemplate } from "../slide-toggle/slide-toggle.template.js";

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
  dsoPlekinfoCardClick,
}: PlekinfoCard) {
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
    ${
      interaction
        ? html`<div slot="interaction">
            <div class="dso-card-interaction">${slideToggleTemplate(interaction)}</div>
          </div>`
        : nothing
    }
    ${content && richContentTemplate({ children: content, slot: "content" })}
  </dso-plekinfo-card>`;
}
