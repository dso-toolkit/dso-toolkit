import { HighlightBox } from "dso-toolkit";
import React, { JSX } from "react";

import { DsoHighlightBox } from "../../components";
import { ComponentImplementation } from "../../templates";
import { iconTemplate } from "../icon/icon.react-template";

export const reactHighlightBox: ComponentImplementation<HighlightBox<JSX.Element>> = {
  component: "highlightBox",
  implementation: "react",
  template: () =>
    function highlightBoxTemplate({ yellow, white, green, dropShadow, border, step, icon, content }) {
      return (
        <DsoHighlightBox
          step={step}
          yellow={yellow}
          white={white}
          green={green}
          dropShadow={dropShadow}
          border={border}
        >
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
