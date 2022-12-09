import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";

import { Accordion } from "dso-toolkit";
import { ComponentImplementation } from "../../templates";

export const angularAccordion: ComponentImplementation<Accordion<StoryFnAngularReturnType>> = {
  component: "accordion",
  implementation: "angular",
  template: () =>
    function accordionTemplate(props) {
      return {
        props,
        template: `
          <dso-accordion
            [variant]="variant"
            [reverseAlign]="reverseAlign"
            [allowMultipleOpen]="allowMultipleOpen"
            (dsoToggleSection)="dsoToggleSection()"
          >
            ${props.sections
              .map(
                (s, i) => `
              <dso-accordion-section
                *ngIf="sections[${i}] as section"
                [open]="section.open"
                [handleTitle]="section.handleTitle"
                [heading]="section.heading"
                [handleUrl]="section.handleUrl"
                [state]="section.state"
                [status]="section.status"
                [icon]="section.icon"
                [attachmentCount]="section.attachmentCount"
              >
                ${s.content?.template}
              </dso-accordion-section>
            `
              )
              .join("")}
          </dso-accordion>
        `,
      };
    },
};
