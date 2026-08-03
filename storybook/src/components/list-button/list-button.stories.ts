import readme from "@dso-toolkit/core/src/components/list-button/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { StoryObj } from "../../shared/story-obj.js";

import { ListButtonArgs, listButtonArgTypes, listButtonArgsMapper, listButtonDefaultArgs } from "./list-button.args.js";
import { ListButtonChangeEvent, ListButtonSelectedEvent } from "./list-button.models.js";
import { listButtonTemplate } from "./list-button.template.js";

type ListButtonStory = StoryObj<ListButtonArgs, Renderer>;

const meta: Meta<ListButtonArgs> = {
  title: "Core/List Button",
  argTypes: listButtonArgTypes,
  args: {
    label: "Milieubelastende activiteit - Melding",
    dsoCountChange: fn(),
    dsoSelectedChange: fn(),
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const listButtonConnector = ([props]: [ReturnType<typeof listButtonArgsMapper>]) => ({
  ...props,
  dsoCountChange(e: CustomEvent<ListButtonChangeEvent>) {
    this.count = e.detail.count;
    props.dsoCountChange?.(e);
  },
  dsoSelectedChange(e: CustomEvent<ListButtonSelectedEvent>) {
    this.checked = e.detail.checked;
    props.dsoSelectedChange?.(e);
  },
});

const render = (args: ListButtonArgs) => listButtonTemplate(listButtonConnector([listButtonArgsMapper(args)]));

export const SingleSelect: ListButtonStory = {
  render,
};

export const MultiSelect: ListButtonStory = {
  args: listButtonDefaultArgs({
    count: 5,
    min: 0,
    max: 99,
  }),
  render,
};
