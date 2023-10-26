import { Accordion } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

export const coreAccordion: ComponentImplementation<Accordion<TemplateResult>> = {
  component: "accordion",
  implementation: "core",
  template: () =>
    function accordionTemplate({ variant, reverseAlign, sections }) {
      return html`
        <dso-accordion variant=${ifDefined(variant)} ?reverse-align=${reverseAlign}>
          ${sections.map(
            ({
              handleTitle,
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
            }) => html`<dso-accordion-section
              ?open=${open}
              handle-title=${handleTitle}
              heading=${heading}
              handle-url=${ifDefined(handleUrl)}
              statusDescription=${ifDefined(statusDescription)}
              status=${ifDefined(status)}
              icon=${ifDefined(icon)}
              attachment-count=${ifDefined(attachmentCount)}
              @dsoToggleClick=${dsoToggleClick}
              @dsoAnimationStart=${dsoAnimationStart}
              @dsoAnimationEnd=${dsoAnimationEnd}
            >
              ${content}
            </dso-accordion-section>`
          )}
        </dso-accordion>
      `;
    },
};
