import type { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/link-list/readme.md?raw";
import { html } from "lit-html";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";
import { highlightBoxTemplate } from "../highlight-box/highlight-box.template.js";

import { LinkListArgs, linkListArgTypes, linkListArgsMapper } from "./link-list.args.js";
import { links, navLinks } from "./link-list.content.js";
import { LinkListType } from "./link-list.models.js";
import { linkListTemplate } from "./link-list.template.js";

type LinkListStory = StoryObj<LinkListArgs, Renderer>;

const meta: Meta<LinkListArgs> = {
  title: "HTML|CSS/Link List",
  argTypes: linkListArgTypes,
  args: {
    links,
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: LinkListArgs) => linkListTemplate(linkListArgsMapper(args));

export const Ul: LinkListStory = {
  args: {
    type: LinkListType.Ul,
  },
  render,
};

export const Ol: LinkListStory = {
  args: {
    type: LinkListType.Ol,
  },
  render,
};

export const InHighlightBox: LinkListStory = {
  render: (args) => {
    const linkList = linkListTemplate(linkListArgsMapper(args));

    return html`
      ${highlightBoxTemplate({ content: linkList })} ${highlightBoxTemplate({ content: linkList, yellow: true })}
      ${highlightBoxTemplate({ content: linkList, border: true })}
      ${highlightBoxTemplate({
        content: linkList,
        dropShadow: true,
        white: true,
      })}
    `;
  },
};

export const InNav: LinkListStory = {
  args: {
    links: navLinks,
    navLabel: "Projecttaken",
    type: LinkListType.Ul,
  },
  render,
};

export const InFooter: LinkListStory = {
  render: (args) => html`<footer>${linkListTemplate(linkListArgsMapper(args))}</footer>`,
};
