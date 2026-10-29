import { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { highlightBoxTemplate } from "../highlight-box/highlight-box.template.js";

import { LinkListArgs, linkListArgTypes, linkListArgsMapper } from "./link-list.args.js";
import { links, navLinks } from "./link-list.content.js";
import { LinkListType } from "./link-list.models.js";
import { linkListTemplate } from "./link-list.template.js";

type LinkListStory = StoryObj<LinkListArgs>;

const meta: Meta<LinkListArgs> = {
  title: "HTML|CSS/Link List",
  tags: ["!autodocs"],
  argTypes: linkListArgTypes,
  args: {
    links: links(),
  },
  render: (args) => linkListTemplate(linkListArgsMapper(args)),
};

export default meta;

export const Ul: LinkListStory = {
  args: {
    type: LinkListType.Ul,
  },
};

export const Ol: LinkListStory = {
  args: {
    type: LinkListType.Ol,
  },
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
    links: navLinks(),
    navLabel: "Projecttaken",
    type: LinkListType.Ul,
  },
};

export const InFooter: LinkListStory = {
  render: (args) => html`<footer>${linkListTemplate(linkListArgsMapper(args))}</footer>`,
};
