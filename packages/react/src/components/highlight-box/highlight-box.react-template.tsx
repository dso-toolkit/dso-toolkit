import { HighlightBox } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoHighlightBox } from "../..";
import { ComponentImplementation } from "../../templates";

export const reactHighlightBox: ComponentImplementation<HighlightBox> = {
  component: "highlightBox",
  implementation: "react",
  template: ({ iconTemplate }) =>
    function highlightBoxTemplate({ yellow, white, dropShadow, border, step, icon, richContent }) {
      return (
        <DsoHighlightBox step={step} yellow={yellow} white={white} dropShadow={dropShadow} border={border}>
          {icon && iconTemplate({ icon, slot: "icon" })}
          {typeof richContent === "string" ? (
            <div className="dso-rich-content" dangerouslySetInnerHTML={{ __html: richContent }} />
          ) : (
            <div className="dso-rich-content">{richContent}</div>
          )}
        </DsoHighlightBox>
      );
    },
};
