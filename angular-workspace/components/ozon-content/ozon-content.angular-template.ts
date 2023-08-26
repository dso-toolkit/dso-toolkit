import { OzonContent } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

const defaultPropValues = {
  slotName: "slotName",
  content: "content",
  dsoAnchorClick: "dsoAnchorClick($event.detail)",
};

export const angularOzonContent: ComponentImplementation<OzonContent> = {
  component: "ozonContent",
  implementation: "angular",
  template: () =>
    function ozonContentTemplate(props, propValues) {
      const { slotName, content, dsoAnchorClick } = { ...defaultPropValues, ...propValues };

      return {
        props,
        template: `
          <dso-ozon-content
            ${props.slotName ? `[slot]="${slotName}"` : ""}
            [content]="${content}"
            (dsoAnchorClick)="${dsoAnchorClick}"
          ></dso-ozon-content>
        `,
      };
    },
};
