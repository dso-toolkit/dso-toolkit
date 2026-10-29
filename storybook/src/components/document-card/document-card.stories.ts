import { Meta, StoryObj } from "@storybook/web-components-vite";

import {
  DocumentCardArgs,
  documentCardArgTypes,
  documentCardArgs,
  documentCardArgsMapper,
} from "./document-card.args.js";
import { infoButton, labels, typeItems } from "./document-card.content.js";
import { documentCardTemplate } from "./document-card.template.js";

type DocumentCardStory = StoryObj<DocumentCardArgs>;

const meta: Meta<DocumentCardArgs> = {
  title: "Core/Document Card",
  tags: ["!autodocs"],
  argTypes: documentCardArgTypes,
  args: documentCardArgs,
};

export default meta;

export const Default: DocumentCardStory = {
  render: (args) => documentCardTemplate(documentCardArgsMapper(args, typeItems())),
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
  render: (args) => documentCardTemplate(documentCardArgsMapper(args, typeItems())),
};

export const WithTypeToelichting: DocumentCardStory = {
  args: documentCardArgs,
  render: (args) => documentCardTemplate(documentCardArgsMapper(args, typeItems(), infoButton())),
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
  render: (args) => documentCardTemplate(documentCardArgsMapper(args, typeItems())),
};

export const WithLabels: DocumentCardStory = {
  args: documentCardArgs,
  render: (args) => documentCardTemplate(documentCardArgsMapper(args, typeItems(), undefined, labels())),
};
