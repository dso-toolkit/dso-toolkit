import readme from "@dso-toolkit/core/src/components/modal/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { StoryObj } from "../../shared/story-obj.js";

import { ModalArgs, modalArgTypes, modalArgsMapper } from "./modal.args.js";
import {
  activeBody,
  activeFooter,
  confirmBody,
  confirmFooter,
  datePickerBody,
  loadingBody,
  passiveBody,
  passiveFooter,
} from "./modal.content.js";
import { modalTemplate } from "./modal.template.js";

type ModalStory = StoryObj<ModalArgs, Renderer>;

const meta: Meta<ModalArgs> = {
  title: "Core/Modal",
  argTypes: modalArgTypes,
  args: {
    closable: true,
    dsoClose: fn(),
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Active: ModalStory = {
  args: {
    role: "alertdialog",
    modalTitle: "Verwijderen werkzaamheid",
  },
  render: (args) => modalTemplate(modalArgsMapper(args, activeBody(), activeFooter())),
};

export const Confirm: ModalStory = {
  args: {
    role: "dialog",
    modalTitle: "Disclaimer",
  },
  render: (args) => modalTemplate(modalArgsMapper(args, confirmBody(), confirmFooter())),
};

export const Loading: ModalStory = {
  args: {
    role: "alert",
  },
  render: (args) => modalTemplate(modalArgsMapper(args, loadingBody())),
};

export const Fullscreen: ModalStory = {
  args: {
    role: "dialog",
    modalTitle: "Fullscreen",
    fullscreen: true,
  },
  render: (args) => modalTemplate(modalArgsMapper(args, datePickerBody())),
};

export const Passive: ModalStory = {
  args: {
    role: "dialog",
    modalTitle: "Bestandsformaten",
  },
  render: (args) => modalTemplate(modalArgsMapper(args, passiveBody(), passiveFooter())),
};

export const WithDatepicker: ModalStory = {
  args: {
    role: "dialog",
    modalTitle: "Zet een datum",
  },
  render: (args) => modalTemplate(modalArgsMapper(args, datePickerBody())),
};
