import type { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/list/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { ListArgs, listArgTypes, listArgsMapper } from "./list.args.js";
import { Type } from "./list.models.js";
import { listTemplate } from "./list.template.js";

type ListStory = StoryObj<ListArgs, Renderer>;

const meta: Meta<ListArgs> = {
  argTypes: listArgTypes,
  args: {
    items: [
      { text: "Ingediende verzoeken" },
      { text: "Verder met aanvragen" },
      { text: "Opgeslagen Vergunningscheck" },
      { text: "Opgeslagen Maatregel op maat" },
      { text: "Ingediende verzoeken" },
    ],
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
  title: "HTML|CSS/List",
};

export default meta;

const render = (args: ListArgs) => listTemplate(listArgsMapper(args));

export const Columns: ListStory = {
  args: {
    type: Type.Ul,
    modifier: "columns",
  },
  render,
};

export const Group: ListStory = {
  args: {
    type: Type.Ul,
    modifier: "group",
  },
  render,
};

export const Icons: ListStory = {
  args: {
    type: Type.Ul,
    items: [
      {
        text: "Cras justo odio",
      },
      {
        text: "Dapibus ac facilisis in",
        status: "forbidden",
        statusDescription: "Niet beschikbaar",
      },
      {
        text: "Morbi leo risus",
      },
      {
        text: "Porta ac consectetur ac",
        status: "status-warning",
        statusDescription: "Let op",
      },
      {
        text: "Vestibulum at eros",
      },
    ],
  },
  render,
};

export const ImageList: ListStory = {
  args: {
    type: Type.Ul,
    modifier: "img-list",
    items: [
      {
        text: "Ingediende verzoeken",
        imgSrc: "images/rectangle1.png",
      },
      {
        text: "Verder met aanvragen",
        imgSrc: "images/rectangle2.png",
      },
      {
        text: "Opgeslagen Vergunningscheck",
        imgSrc: "images/rectangle1.png",
      },
      {
        text: "Opgeslagen Maatregel op maat",
        imgSrc: "images/rectangle2.png",
      },
      {
        text: "Ingediende verzoeken",
        imgSrc: "images/rectangle1.png",
      },
    ],
  },
  render,
};

export const Ordered: ListStory = {
  args: {
    type: Type.Ol,
  },
  render,
};

export const OrderedAction: ListStory = {
  args: {
    type: Type.Ol,
    modifier: "ordered-action",
    items: [
      { titleLabel: "Ingediende verzoeken", text: "Bekijk hier de ngediende verzoeken" },
      { titleLabel: "Verder met aanvragen", text: "Bekijk hier aanvragen" },
      { titleLabel: "Opgeslagen Vergunningscheck", text: 'Ga verder met de opgeslagen vergunningscheck"' },
      { titleLabel: "Opgeslagen Maatregel op maat", text: "Ga verder met de opgeslagen Maatregel op maat" },
      { titleLabel: "Ingediende verzoeken", text: "Bekijk ingediende verzoeken" },
    ],
  },
  argTypes: {
    type: {
      control: {
        disable: true,
      },
    },
  },
  render,
};

export const Unordered: ListStory = {
  args: {
    type: Type.Ul,
  },
  render,
};

export const UnorderedAction: ListStory = {
  args: {
    type: Type.Ul,
    modifier: "unordered-action",
    items: [
      { titleLabel: "Ingediende verzoeken", text: "Bekijk hier de ngediende verzoeken" },
      { titleLabel: "Verder met aanvragen", text: "Bekijk hier aanvragen" },
      { titleLabel: "Opgeslagen Vergunningscheck", text: 'Ga verder met de opgeslagen vergunningscheck"' },
      { titleLabel: "Opgeslagen Maatregel op maat", text: "Ga verder met de opgeslagen Maatregel op maat" },
      { titleLabel: "Ingediende verzoeken", text: "Bekijk ingediende verzoeken" },
    ],
  },
  argTypes: {
    type: {
      control: {
        disable: true,
      },
    },
  },
  render,
};

export const Unstyled: ListStory = {
  args: {
    type: Type.Ul,
    modifier: "unstyled",
  },
  render,
};
