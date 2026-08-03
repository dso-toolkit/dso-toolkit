import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { Badge } from "../badge/badge.models.js";

import { Accordion } from "./accordion.models.js";

function badgeTemplate({ status, message, label, toggletipPlacement, children }: Badge<TemplateResult>) {
  return html`<dso-badge
    .status=${ifDefined(status)}
    .label=${ifDefined(label)}
    .toggletipPlacement=${ifDefined(toggletipPlacement)}
  >
    ${message} ${children ? html`<div slot="toggletip">${children}</div>` : nothing}
  </dso-badge>`;
}

export function accordionTemplate({ variant, reverseAlign, sections }: Accordion<TemplateResult>) {
  return html`
    <dso-accordion .variant=${variant} ?reverse-align=${reverseAlign}>
      ${sections.map(
        ({
          handleTitle,
          wijzigactie,
          heading,
          attachmentCount,
          content,
          dsoAnimationStart,
          dsoAnimationEnd,
          dsoToggleClick,
          handleUrl,
          icon,
          open,
          status,
          statusDescription,
          labelStatus,
          label,
          activatable,
          active,
          badge,
          dsoActiveChange,
        }) =>
          html`<dso-accordion-section
            ?open=${open}
            .handleTitle=${handleTitle}
            wijzigactie=${ifDefined(wijzigactie)}
            heading=${heading}
            handle-url=${ifDefined(handleUrl)}
            status-description=${ifDefined(statusDescription)}
            status=${ifDefined(status)}
            icon=${ifDefined(icon)}
            attachment-count=${ifDefined(attachmentCount)}
            label-status=${ifDefined(labelStatus)}
            label=${ifDefined(label)}
            ?activatable=${activatable}
            ?active=${active}
            @dsoToggleClick=${dsoToggleClick}
            @dsoAnimationStart=${dsoAnimationStart}
            @dsoAnimationEnd=${dsoAnimationEnd}
            @dsoActiveChange=${dsoActiveChange}
          >
            ${badge ? html`<span slot="badge">${badgeTemplate(badge)}</span>` : null} ${content}
          </dso-accordion-section>`,
      )}
    </dso-accordion>
  `;
}
