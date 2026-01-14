import { ListButton } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularListButton: ComponentImplementation<ListButton> = {
  component: "listButton",
  implementation: "angular",
  template: () =>
    function listButtonTemplate(props: ListButton) {
      return {
        props,
        template: `
          <dso-list-button
            [label]="label"
            [sublabel]="sublabel"
            [count]="count"
            [min]="min"
            [max]="max"
            [disabled]="disabled"
            [checked]="checked"
            [subcontentPrefix]="subcontentPrefix"
            (dsoCountChange)="dsoCountChange($event)"
            (dsoSelectedChange)="dsoSelectedChange($event)"
          >
            @if(subcontent){
              <span slot="subcontent" [innerHTML]="$any(subcontent) | trustHtml"></span>
            }
          </dso-list-button>
        `,
      };
    },
};
