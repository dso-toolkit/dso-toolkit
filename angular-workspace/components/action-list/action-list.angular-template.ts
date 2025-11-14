import { ActionList } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";
import { AngularStoryReturn } from "../helpers";

export const angularActionList: ComponentImplementation<ActionList<AngularStoryReturn>> = {
  component: "actionList",
  implementation: "angular",
  template: () =>
    function actionListTemplate(props) {
      return {
        props,
        template: `
        <dso-action-list [listTitle]="title">
          ${props.actionListItems
            .map(
              (item, index) => `
              <dso-action-list-item
                *ngIf="actionListItems[${index}] as item"
                [step]="${index + 1}"
                [itemTitle]="item.title"
                [flowLine]="item.flowLine"
                [warning]="item.warning"
                [divider]="item.divider"
              >
                ${item.content?.template ?? ""}
              </dso-action-list-item>
            `,
            )
            .join("")}
          <div class="dso-rich-content">
            <h2>Heeft u vragen?</h2>
            <dso-accordion variant="neutral">
              <dso-accordion-section handle-title="Contactinformatie gemeente Utrecht" heading="h3"></dso-accordion-section>
              <dso-accordion-section handle-title="Contactinformatie waterschap Amstel, Gooi en Vecht" heading="h3"></dso-accordion-section>
            </dso-accordion>
          </div>
        </dso-action-list>
      `,
      };
    },
};
