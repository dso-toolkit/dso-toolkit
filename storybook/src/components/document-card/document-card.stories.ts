import readme from "@dso-toolkit/core/src/components/document-card/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { TemplateResult } from "lit-html";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import {
  DocumentCardArgs,
  documentCardArgTypes,
  documentCardArgs,
  documentCardArgsMapper,
} from "./document-card.args.js";
import { infoButton, labels, typeItems } from "./document-card.content.js";
import { documentCardTemplate } from "./document-card.template.js";

type DocumentCardStory = StoryObj<DocumentCardArgs<TemplateResult>, Renderer>;

const meta: Meta<DocumentCardArgs<TemplateResult>> = {
  title: "Core/Document Card",
  argTypes: documentCardArgTypes,
  args: documentCardArgs,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Default: DocumentCardStory = {
  render: (args: DocumentCardArgs<TemplateResult>) => documentCardTemplate(documentCardArgsMapper(args, typeItems)),
};

export const WithLabel: DocumentCardStory = {
  args: {
    ...documentCardArgs,
    meta: {
      status: "warning",
      compact: true,
      label: "Ontwerp",
    },
  },
  render: (args: DocumentCardArgs<TemplateResult>) => documentCardTemplate(documentCardArgsMapper(args, typeItems)),
};

export const WithTypeToelichting: DocumentCardStory = {
  args: documentCardArgs,
  render: (args: DocumentCardArgs<TemplateResult>) =>
    documentCardTemplate(documentCardArgsMapper(args, typeItems, infoButton())),
};

export const WithStatusToelichting: DocumentCardStory = {
  args: {
    ...documentCardArgs,
    statusToelichtingOutline: {
      status: "outline",
      message: "!",
    },
    statusToelichtingWarning: {
      status: "warning",
      message: "!",
    },
  },
  render: (args: DocumentCardArgs<TemplateResult>) => documentCardTemplate(documentCardArgsMapper(args, typeItems)),
};

export const WithLabels: DocumentCardStory = {
  args: documentCardArgs,
  render: (args: DocumentCardArgs<TemplateResult>) =>
    documentCardTemplate(documentCardArgsMapper(args, typeItems, undefined, labels)),
};
