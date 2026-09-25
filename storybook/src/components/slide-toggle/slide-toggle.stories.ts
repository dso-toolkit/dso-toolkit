import readme from "@dso-toolkit/core/src/components/slide-toggle/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { fn } from "storybook/test";
import { v4 as uuidv4 } from "uuid";

import {
  SlideToggleArgs,
  slideToggleArgTypes,
  slideToggleArgsMapper,
  slideToggleDefaultArgs,
} from "./slide-toggle.args.js";
import { SlideToggleChangeEvent } from "./slide-toggle.models.js";
import { slideToggleTemplate } from "./slide-toggle.template.js";

type SlideToggleStory = StoryObj<SlideToggleArgs>;

const meta: Meta<SlideToggleArgs> = {
  title: "Core/Slide Toggle",
  argTypes: slideToggleArgTypes,
  args: {
    dsoActiveChange: fn(),
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
  render: (args) => slideToggleTemplate(slideToggleConnector([slideToggleArgsMapper(args)])),
};

export default meta;

const slideToggleConnector = ([props]: [ReturnType<typeof slideToggleArgsMapper>]) => ({
  ...props,
  dsoActiveChange(e: CustomEvent<SlideToggleChangeEvent>) {
    this.checked = e.detail.checked;
    props.dsoActiveChange?.(e);
  },
});

export const Default: SlideToggleStory = {
  args: slideToggleDefaultArgs({
    checked: false,
    accessibleLabel: "sr-only label van het schuifje",
  }),
};

export const Disabled: SlideToggleStory = {
  args: slideToggleDefaultArgs({
    checked: false,
    disabled: true,
  }),
};

export const ZichtbaarLabel: SlideToggleStory = {
  args: slideToggleDefaultArgs({
    checked: false,
    useOwnLabelId: uuidv4(),
  }),
};

export const LabelledById: SlideToggleStory = {
  args: slideToggleDefaultArgs({
    checked: false,
    labelledbyId: uuidv4(),
  }),
};
