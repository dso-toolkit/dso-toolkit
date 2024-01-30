import type { Meta } from "@storybook/web-components";
import { SlideToggleArgs, slideToggleMeta, slideToggleStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/slide-toggle/readme.md?raw";

const meta: Meta<SlideToggleArgs> = {
  ...slideToggleMeta({ readme }),
  title: "Core/Slide Toggle",
};

export default meta;

const { Default, Disabled, ZichtbaarLabel, LabelledById } = slideToggleStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { slideToggleTemplate } = templates;

    type SlideToggleConnector = (
      parameters: Parameters<
        ReturnType<Parameters<typeof slideToggleStories>[0]["storyTemplates"]>["slideToggleTemplate"]
      >,
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

export { Default, Disabled, ZichtbaarLabel, LabelledById };
