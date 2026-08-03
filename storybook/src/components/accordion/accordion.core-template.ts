import { Accordion } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

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
            ${content}
          </dso-accordion-section>`,
      )}
    </dso-accordion>
  `;
}
