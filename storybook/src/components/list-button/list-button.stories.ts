import readme from "@dso-toolkit/core/src/components/list-button/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { fn } from "storybook/test";

import { ListButtonArgs, listButtonArgTypes, listButtonArgsMapper, listButtonDefaultArgs } from "./list-button.args.js";
import { ListButtonChangeEvent, ListButtonSelectedEvent } from "./list-button.models.js";
import { listButtonTemplate } from "./list-button.template.js";

type ListButtonStory = StoryObj<ListButtonArgs>;

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
  render: (args) => listButtonTemplate(listButtonConnector([listButtonArgsMapper(args)])),
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

export const SingleSelect: ListButtonStory = {};

export const MultiSelect: ListButtonStory = {
  args: listButtonDefaultArgs({
    count: 5,
    min: 0,
    max: 99,
  }),
};
