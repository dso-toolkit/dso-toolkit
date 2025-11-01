import { OzonContent } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

const defaultPropValues = {
  slotName: "slotName",
  content: "content",
  inline: "inline",
  mark: "mark",
  dsoClick: "dsoClick($event.detail)",
  dsoOzonContentMarkItemHighlight: "dsoOzonContentMarkItemHighlight($event.detail)",
  urlResolver: "urlResolver",
  begripResolver: "begripResolver",
};

export const angularOzonContent: ComponentImplementation<OzonContent> = {
  component: "ozonContent",
  implementation: "angular",
  template: () =>
    function ozonContentTemplate(props, propValues) {
      const {
        slotName,
        content,
        dsoClick,
        inline,
        mark,
        dsoOzonContentMarkItemHighlight,
        urlResolver,
        begripResolver,
      } = {
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
            [begripResolver]="${begripResolver}"
            (dsoClick)="${dsoClick}"
            (dsoOzonContentMarkItemHighlight)="${dsoOzonContentMarkItemHighlight}"
          ></dso-ozon-content>
        `,
      };
    },
};
