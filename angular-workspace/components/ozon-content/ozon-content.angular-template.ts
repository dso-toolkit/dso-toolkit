import { OzonContent } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

const defaultPropValues = {
  slotName: "slotName",
  content: "content",
  inline: "inline",
  mark: "mark",
  dsoAnchorClick: "dsoAnchorClick($event.detail)",
  dsoOzonContentMarkItemHighlight: "dsoOzonContentMarkItemHighlight($event.detail)",
  urlResolver: "urlResolver",
};

export const angularOzonContent: ComponentImplementation<OzonContent> = {
  component: "ozonContent",
  implementation: "angular",
  template: () =>
    function ozonContentTemplate(props, propValues) {
      const { slotName, content, dsoAnchorClick, inline, mark, dsoOzonContentMarkItemHighlight, urlResolver } = {
        ...defaultPropValues,
        ...propValues,
      };

      return {
        props,
        template: `
          <dso-ozon-content
            ${props.slotName ? `[slot]="${slotName}"` : ""}
            [content]="${content}"
            [inline]="${inline}"
            [mark]="${mark}"
            [urlResolver]="${urlResolver}"
            (dsoAnchorClick)="${dsoAnchorClick}"
            (dsoOzonContentMarkItemHighlight)="${dsoOzonContentMarkItemHighlight}"
          ></dso-ozon-content>
        `,
      };
    },
};
