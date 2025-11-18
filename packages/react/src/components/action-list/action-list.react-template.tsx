import { ActionList } from "dso-toolkit";
import * as React from "react";
import { JSX } from "react";

import { DsoActionList, DsoActionListItem } from "../..";
import { ComponentImplementation, Templates } from "../../templates";

export const reactActionList: ComponentImplementation<ActionList<JSX.Element>> = {
  component: "actionList",
  implementation: "react",
  template: ({ accordionTemplate }: Templates) =>
    function actionListTemplate({ title, actionListItems }) {
      return (
        <DsoActionList listTitle={title}>
          {actionListItems.map((item, index) => (
            <DsoActionListItem
              step={index + 1}
              item-title={item.title}
              flowLine={item.flowLine}
              warning={item.warning}
              divider={item.divider}
            >
              {item.content}
            </DsoActionListItem>
          ))}
          <div className="dso-rich-content">
            <h2>Heeft u vragen?</h2>
            {accordionTemplate({
              variant: "neutral",
              sections: [
                {
                  handleTitle: "Contactinformatie gemeente Utrecht",
                  heading: "h3",
                },
                {
                  handleTitle: "Contactinformatie waterschap Amstel, Gooi en Vecht",
                  heading: "h3",
                },
              ],
            })}
          </div>
        </DsoActionList>
      );
    },
};
