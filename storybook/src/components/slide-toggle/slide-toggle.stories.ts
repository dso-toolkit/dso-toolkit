import readme from "@dso-toolkit/core/src/components/slide-toggle/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";
import { v4 as uuidv4 } from "uuid";

import { StoryObj } from "../../shared/story-obj.js";

import {
  SlideToggleArgs,
  slideToggleArgTypes,
  slideToggleArgsMapper,
  slideToggleDefaultArgs,
} from "./slide-toggle.args.js";
import { SlideToggleChangeEvent } from "./slide-toggle.models.js";
import { slideToggleTemplate } from "./slide-toggle.template.js";

type SlideToggleStory = StoryObj<SlideToggleArgs, Renderer>;

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
};

export default meta;

const slideToggleConnector = ([props]: [ReturnType<typeof slideToggleArgsMapper>]) => ({
  ...props,
  dsoActiveChange(e: CustomEvent<SlideToggleChangeEvent>) {
    this.checked = e.detail.checked;
    props.dsoActiveChange?.(e);
  },
});

const render = (args: SlideToggleArgs) => slideToggleTemplate(slideToggleConnector([slideToggleArgsMapper(args)]));

export const Default: SlideToggleStory = {
  args: slideToggleDefaultArgs({
    checked: false,
    accessibleLabel: "sr-only label van het schuifje",
  }),
  render,
};

export const Disabled: SlideToggleStory = {
  args: slideToggleDefaultArgs({
    checked: false,
    disabled: true,
  }),
  render,
};

export const ZichtbaarLabel: SlideToggleStory = {
  args: slideToggleDefaultArgs({
    checked: false,
    useOwnLabelId: uuidv4(),
  }),
  render,
};

export const LabelledById: SlideToggleStory = {
  args: slideToggleDefaultArgs({
    checked: false,
    labelledbyId: uuidv4(),
  }),
  render,
};
