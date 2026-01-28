import { HighlightBox, HighlightBoxColor } from "dso-toolkit";
import * as React from "react";

import { DsoHighlightBox } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactHighlightBox: ComponentImplementation<HighlightBox> = {
  component: "highlightBox",
  implementation: "react",
  template: ({ iconTemplate }) =>
    function highlightBoxTemplate({ color, dropShadow, border, step, icon, content }) {
      return (
        <DsoHighlightBox step={step} color={color ?? HighlightBoxColor.grey} dropShadow={dropShadow} border={border}>
          {icon && iconTemplate({ icon, slot: "icon" })}
          {typeof content === "string" ? (
            <div className="dso-rich-content" dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <div className="dso-rich-content">{content}</div>
          )}
        </DsoHighlightBox>
      );
    },
};
