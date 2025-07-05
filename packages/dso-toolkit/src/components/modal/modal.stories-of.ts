import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, PartialStoryFn, Renderer } from "storybook/internal/types";

import { componentArgs } from "../../storybook/index.js";
import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { ModalArgs, modalArgTypes, modalArgsMapper } from "./modal.args.js";
import { Modal } from "./modal.models.js";

export type ModalDecorator<TemplateFnReturnType> = (story: PartialStoryFn) => TemplateFnReturnType;

type ModalStory = StoryObj<ModalArgs, Renderer>;

interface ModalStories {
  Confirm: ModalStory;
  Passive: ModalStory;
  Active: ModalStory;
  Loading: ModalStory;
  WithDatepicker: ModalStory;
  Fullscreen: ModalStory;
}

interface ModalStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, ModalTemplates<TemplateFnReturnType>> {
  decorator?: ModalDecorator<TemplateFnReturnType>;
}

export interface ModalTemplates<TemplateFnReturnType> {
  modalTemplate: (modalProperties: Modal<TemplateFnReturnType>) => TemplateFnReturnType;
  activeBody: TemplateFnReturnType;
  activeFooter: TemplateFnReturnType;
  passiveBody: TemplateFnReturnType;
  passiveFooter: TemplateFnReturnType;
  confirmBody: TemplateFnReturnType;
  confirmFooter: TemplateFnReturnType;
  loadingBody: TemplateFnReturnType;
  datePickerBody: TemplateFnReturnType;
}

export function modalMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ModalArgs
> {
  return {
    argTypes: modalArgTypes,
    args: {
      closable: true,
    },
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function modalStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
  decorator,
}: ModalStoriesParameters<Implementation, Templates, TemplateFnReturnType>): ModalStories {
  return {
    Active: {
      args: componentArgs<Pick<ModalArgs, "role" | "modalTitle">>({
        role: "alertdialog",
        modalTitle: "Verwijderen werkzaamheid",
      }),
      decorators: [decorator ? (story) => decorator(story) : (story) => story()],
      render: templateContainer.render(storyTemplates, (args, { modalTemplate, activeBody, activeFooter }) =>
        modalTemplate(modalArgsMapper(args, activeBody, activeFooter)),
      ),
    },
    Confirm: {
      args: componentArgs<Pick<ModalArgs, "role" | "modalTitle">>({
        role: "dialog",
        modalTitle: "Disclaimer",
      }),
      decorators: [decorator ? (story) => decorator(story) : (story) => story()],
      render: templateContainer.render(storyTemplates, (args, { modalTemplate, confirmBody, confirmFooter }) =>
        modalTemplate(modalArgsMapper(args, confirmBody, confirmFooter)),
      ),
    },
    Loading: {
      args: componentArgs<Pick<ModalArgs, "role">>({
        role: "alert",
      }),
      decorators: [decorator ? (story) => decorator(story) : (story) => story()],
      render: templateContainer.render(storyTemplates, (args, { modalTemplate, loadingBody }) =>
        modalTemplate(modalArgsMapper(args, loadingBody)),
      ),
    },
    Fullscreen: {
      args: componentArgs<Pick<ModalArgs, "role" | "modalTitle" | "fullscreen">>({
        role: "dialog",
        modalTitle: "Fullscreen",
        fullscreen: true,
      }),
      decorators: [decorator ? (story) => decorator(story) : (story) => story()],
      render: templateContainer.render(storyTemplates, (args, { modalTemplate, datePickerBody }) =>
        modalTemplate(modalArgsMapper(args, datePickerBody)),
      ),
    },
    Passive: {
      args: componentArgs<Pick<ModalArgs, "role" | "modalTitle">>({
        role: "dialog",
        modalTitle: "Bestandsformaten",
      }),
      decorators: [decorator ? (story) => decorator(story) : (story) => story()],
      render: templateContainer.render(storyTemplates, (args, { modalTemplate, passiveBody, passiveFooter }) =>
        modalTemplate(modalArgsMapper(args, passiveBody, passiveFooter)),
      ),
    },
    WithDatepicker: {
      args: componentArgs<Pick<ModalArgs, "role" | "modalTitle">>({
        role: "dialog",
        modalTitle: "Zet een datum",
      }),
      decorators: [decorator ? (story) => decorator(story) : (story) => story()],
      render: templateContainer.render(storyTemplates, (args, { modalTemplate, datePickerBody }) =>
        modalTemplate(modalArgsMapper(args, datePickerBody)),
      ),
    },
  };
}
