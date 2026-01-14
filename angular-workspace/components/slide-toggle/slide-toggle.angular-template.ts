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
        @if(useOwnLabelId){
          <div><label [for]="useOwnLabelId">Label gemaakt door de implementatie</label></div>
        }
        @if(labelledbyId){
          <div><span [id]="labelledbyId">Label elders op de pagina</span></div>
        }
        <dso-slide-toggle
          [identifier]="useOwnLabelId"
          [checked]="checked"
          [disabled]="disabled"
          [accessibleLabel]=accessibleLabel
          [labelledbyId]="labelledbyId"
          (dsoActiveChange)="dsoActiveChange?.($event)"
        >
        @if(label){
          <span>{{ label }}</span>
        }
        </dso-slide-toggle>
        `,
      };
    },
};
