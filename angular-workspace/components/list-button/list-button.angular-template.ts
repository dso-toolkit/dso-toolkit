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
        <form #form>
          <dso-list-button
            [label]="label"
            [sublabel]="sublabel"
            [subcontent]="subcontent"
            [count]="count"
            [disabled]="disabled"
          >
          </dso-list-button>
        </form>
        `,
      };
    },
};
