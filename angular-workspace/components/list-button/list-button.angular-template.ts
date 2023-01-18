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
            [subcontent]="subcontent"
            [count]="count"
            [min]="min"
            [max]="max"
            [disabled]="disabled"
            [checked]="checked"
            (dsoCountChange)="dsoCountChange()"
            (dsoSelectedChange)="dsoSelectedChange()"
          >
          </dso-list-button>
        `,
      };
    },
};
