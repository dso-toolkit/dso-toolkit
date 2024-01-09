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
            [manual]="manual"
            [subcontentPrefix]="subcontentPrefix"
            (dsoCountChange)="dsoCountChange()"
            (dsoSelectedChange)="dsoSelectedChange()"
          >
            <span slot="subcontent" *ngIf="subcontent" [innerHTML]="$any(subcontent) | trustHtml"></span>
          </dso-list-button>
        `,
      };
    },
};
