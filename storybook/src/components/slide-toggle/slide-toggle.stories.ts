import coreReadme from "@dso-toolkit/core/src/components/slide-toggle/readme.md";
import { storiesOf } from "@storybook/web-components";
import { storiesOfSlideToggle, StoryRoot } from "dso-toolkit";

import { templateContainer } from "../../templates";

storiesOfSlideToggle({
  parameters: {
    storiesOf,
    module,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ slideToggleTemplate }) => {
    type SlideToggleConnector = (
      parameters: Parameters<
        ReturnType<Parameters<typeof storiesOfSlideToggle>[0]["storyTemplates"]>["slideToggleTemplate"]
      >
    ) => Parameters<typeof slideToggleTemplate>[0];

    const slideToggleConnector: SlideToggleConnector = ([props]) => ({
      ...props,
      dsoActiveChange(e) {
        this.checked = e.detail.checked;
        props.dsoActiveChange(e);
      },
    });

    return {
      slideToggleTemplate: (props) => slideToggleTemplate(slideToggleConnector([props])),
    };
  },
});
