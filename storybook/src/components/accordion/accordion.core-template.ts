import { Accordion } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

export const coreAccordion: ComponentImplementation<Accordion<TemplateResult>> = {
  component: "accordion",
  implementation: "core",
  template: () =>
    function accordionTemplate({ variant, reverseAlign, dsoToggleSection, dsoToggleSectionAnimationEnd, sections }) {
      return html`
        <dso-accordion
          variant=${ifDefined(variant)}
          ?reverse-align=${reverseAlign}
          @dsoToggleSection=${dsoToggleSection}
          @dsoToggleSectionAnimationEnd=${dsoToggleSectionAnimationEnd}
        >
          ${sections.map(
            (section) => html`<dso-accordion-section
              ?open=${ifDefined(section.open)}
              handle-title=${section.handleTitle}
              heading=${section.heading}
              handle-url=${ifDefined(section.handleUrl)}
              state=${ifDefined(section.state)}
              status=${ifDefined(section.status)}
              icon=${ifDefined(section.icon)}
              attachment-count=${ifDefined(section.attachmentCount)}
            >
              ${section.content}
            </dso-accordion-section>`
          )}
        </dso-accordion>
      `;
    },
};
