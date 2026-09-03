import { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/document-header/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";
import { options } from "../advanced-select/advanced-select.content.js";

import { DocumentHeaderArgs, documentHeaderArgTypes, documentHeaderArgsMapper } from "./document-header.args.js";
import { featuresContent } from "./document-header.content.js";
import { documentHeaderTemplate } from "./document-header.template.js";

type DocumentHeaderStory = StoryObj<DocumentHeaderArgs, Renderer>;

const meta: Meta<DocumentHeaderArgs> = {
  title: "HTML|CSS/Document Header",
  argTypes: documentHeaderArgTypes,
  args: {
    advancedSelect: {
      options,
    },
    title: "Omgevingsplan gemeente Gouda",
    type: "Een omgevingsplan waar de omgeving mooier van wordt",
    owner: "Gemeente Gouda",
    featuresOpen: false,
    sticky: false,
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: DocumentHeaderArgs) => documentHeaderTemplate(documentHeaderArgsMapper(args, featuresContent));

export const Default: DocumentHeaderStory = { render };
export const DefaultBesluitversie: DocumentHeaderStory = {
  args: {
    statusMessage: "Wijzigingen in regeling door wijzigingbesluit",
    variant: "besluitversie",
  },
  render,
};
export const DefaultOntwerp: DocumentHeaderStory = {
  args: {
    statusMessage: "Wijzigingen door ontwerpbesluit",
    variant: "ontwerp",
  },
  render,
};
export const Sticky: DocumentHeaderStory = {
  args: {
    sticky: true,
  },
  render,
};
export const StickyBesluitversie: DocumentHeaderStory = {
  args: {
    sticky: true,
    variant: "besluitversie",
  },
  render,
};
export const StickyOntwerp: DocumentHeaderStory = {
  args: {
    sticky: true,
    variant: "ontwerp",
  },
  render,
};
