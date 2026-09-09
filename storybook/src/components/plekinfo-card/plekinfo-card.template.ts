import { DsoPlekinfoCardCustomEvent } from "@dso-toolkit/core";
import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { labelTemplate } from "../label/label.template.js";
import { renvooiTemplate } from "../renvooi/renvooi.template.js";
import { richContentTemplate } from "../rich-content/rich-content.template.js";
import { SlideToggle } from "../slide-toggle/slide-toggle.models.js";

import { PlekinfoCard, PlekinfoCardClickEvent } from "./plekinfo-card.models.js";

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

function slideToggleTemplate({
  checked,
  disabled,
  accessibleLabel,
  labelledbyId,
  label,
  useOwnLabelId,
  dsoActiveChange,
}: SlideToggle) {
  return html`
    ${useOwnLabelId ? html`<div><label for=${useOwnLabelId}>Label gemaakt door de implementatie.</label></div>` : null}
    ${labelledbyId ? html`<div><span id=${labelledbyId}>Label elders op de pagina</span></div>` : null}
    <dso-slide-toggle
      identifier=${ifDefined(useOwnLabelId)}
      checked=${ifDefined(checked)}
      disabled=${ifDefined(disabled)}
      accessible-label=${ifDefined(accessibleLabel)}
      labelledby-id=${ifDefined(labelledbyId)}
      @dsoActiveChange=${dsoActiveChange}
    >
      ${label && html`<span>${label}</span>`}
    </dso-slide-toggle>
  `;
}
