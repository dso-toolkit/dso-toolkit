import { Meta, StoryObj } from "@storybook/web-components-vite";

import { options } from "../advanced-select/advanced-select.content.js";

import { DocumentHeaderArgs, documentHeaderArgTypes, documentHeaderArgsMapper } from "./document-header.args.js";
import { featuresContent } from "./document-header.content.js";
import { documentHeaderTemplate } from "./document-header.template.js";

type DocumentHeaderStory = StoryObj<DocumentHeaderArgs>;

const meta: Meta<DocumentHeaderArgs> = {
  title: "HTML|CSS/Document Header",
  tags: ["!autodocs"],
  argTypes: documentHeaderArgTypes,
  args: {
    advancedSelect: {
      options: options(),
    },
    title: "Omgevingsplan gemeente Gouda",
    type: "Een omgevingsplan waar de omgeving mooier van wordt",
    owner: "Gemeente Gouda",
    featuresOpen: false,
    sticky: false,
  },
  render: (args) => documentHeaderTemplate(documentHeaderArgsMapper(args, featuresContent())),
};

export default meta;

export const Default: DocumentHeaderStory = {};
export const DefaultBesluitversie: DocumentHeaderStory = {
  args: {
    statusMessage: "Wijzigingen in regeling door wijzigingbesluit",
    variant: "besluitversie",
  },
};
export const DefaultOntwerp: DocumentHeaderStory = {
  args: {
    statusMessage: "Wijzigingen door ontwerpbesluit",
    variant: "ontwerp",
  },
};
export const Sticky: DocumentHeaderStory = {
  args: {
    sticky: true,
  },
};
export const StickyBesluitversie: DocumentHeaderStory = {
  args: {
    sticky: true,
    variant: "besluitversie",
  },
};
export const StickyOntwerp: DocumentHeaderStory = {
  args: {
    sticky: true,
    variant: "ontwerp",
  },
};
