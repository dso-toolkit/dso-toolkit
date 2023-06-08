import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";

import { Accordion } from "dso-toolkit";
import { ComponentImplementation } from "../../templates";

export const angularAccordion: ComponentImplementation<Accordion<StoryFnAngularReturnType>> = {
  component: "accordion",
  implementation: "angular",
  template: () =>
    function accordionTemplate(props) {
      const customProps = {
        ...props,
        toggleSection: (event: CustomEvent) => {
          /* eslint-disable @typescript-eslint/no-explicit-any */
          event.detail.section.element = "elementRef" as any;
          event.detail.sections = ["elementRef"] as any;
          /* eslint-enable @typescript-eslint/no-explicit-any */

          props.dsoToggleSection?.(event);
        },
        toggleSectionAnimationEnd: (event: CustomEvent) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          event.detail.section.element = "elementRef" as any;

          props.dsoToggleSectionAnimationEnd?.(event);
        },
      };

      return {
        props: customProps,
        template: `
          <dso-accordion
            [group]="group"
            [variant]="variant"
            [reverseAlign]="reverseAlign"
            [allowMultipleOpen]="allowMultipleOpen"
            (dsoToggleSection)="toggleSection($event)"
            (dsoToggleSectionAnimationEnd)="toggleSectionAnimationEnd($event)"
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
          <dso-accordion
            *ngIf="group"
            [group]="group"
            [variant]="variant"
            [reverseAlign]="reverseAlign"
            [allowMultipleOpen]="allowMultipleOpen"
            (dsoToggleSection)="toggleSection($event)"
            (dsoToggleSectionAnimationEnd)="toggleSectionAnimationEnd($event)"
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
