import { SlideToggle } from "dso-toolkit";
import { ComponentImplementation } from "../../templates";

export const angularSlideToggle: ComponentImplementation<SlideToggle> = {
  component: "slideToggle",
  implementation: "angular",
  template: () =>
    function slideToggleTemplate(props) {
      return {
        props,
        template: `
        <div *ngIf="useOwnLabelId"><label [for]="useOwnLabelId">Label gemaakt door de implementatie</label></div>
        <div *ngIf="labelledbyId"><span [id]="labelledbyId">Label elders op de pagina</span></div>
        <dso-slide-toggle
          [identifier]="useOwnLabelId"
          [checked]="checked"
          [disabled]="disabled"
          [accessibleLabel]=accessibleLabel
          [labelledbyId]="labelledbyId"
          (dsoActiveChange)="dsoActiveChange()"
        >
          <span *ngIf="label">{{ label }}</span>
        </dso-slide-toggle>
        `,
      };
    },
};
