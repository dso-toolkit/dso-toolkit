import { Addon_DecoratorFunction } from "@storybook/types";
import { StoriesOfArguments, storiesOfFactory, componentArgs } from "../../storybook/index.js";

import { ModalArgs, modalArgsMapper, modalArgTypes } from "./modal.args.js";
import { Modal } from "./modal.models.js";

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

export interface ModalParameters<TemplateFnReturnType> {
  decorator?: Addon_DecoratorFunction<TemplateFnReturnType>;
}

export function storiesOfModal<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ModalTemplates<TemplateFnReturnType>
  >,
  { decorator }: ModalParameters<TemplateFnReturnType>,
) {
  return storiesOfFactory("Modal", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: modalArgTypes,
      args: {
        role: undefined,
      },
    });

    if (decorator) {
      stories.addDecorator(decorator);
    }

    stories.add(
      "confirm",
      templateMapper<ModalArgs>((args, { modalTemplate, confirmBody, confirmFooter }) =>
        modalTemplate(modalArgsMapper(args, confirmBody, confirmFooter)),
      ),
      {
        args: componentArgs<Pick<ModalArgs, "role" | "modalTitle">>({
          role: "dialog",
          modalTitle: "Disclaimer",
        }),
      },
    );

    stories.add(
      "passive",
      templateMapper<ModalArgs>((args, { modalTemplate, passiveBody, passiveFooter }) =>
        modalTemplate(modalArgsMapper(args, passiveBody, passiveFooter)),
      ),
      {
        args: componentArgs<Pick<ModalArgs, "role" | "modalTitle">>({
          role: "dialog",
          modalTitle: "Bestandsformaten",
        }),
      },
    );

    stories.add(
      "active",
      templateMapper<ModalArgs>((args, { modalTemplate, activeBody, activeFooter }) =>
        modalTemplate(modalArgsMapper(args, activeBody, activeFooter)),
      ),
      {
        args: componentArgs<Pick<ModalArgs, "role" | "modalTitle">>({
          role: "alertdialog",
          modalTitle: "Verwijderen werkzaamheid",
        }),
      },
    );

    stories.add(
      "loading",
      templateMapper<ModalArgs>((args, { modalTemplate, loadingBody }) =>
        modalTemplate(modalArgsMapper(args, loadingBody)),
      ),
      {
        args: componentArgs<Pick<ModalArgs, "role">>({
          role: "alert",
        }),
      },
    );

    stories.add(
      "with datepicker",
      templateMapper<ModalArgs>((args, { modalTemplate, datePickerBody }) =>
        modalTemplate(modalArgsMapper(args, datePickerBody)),
      ),
      {
        args: componentArgs<Pick<ModalArgs, "role" | "modalTitle">>({
          role: "dialog",
          modalTitle: "Zet een datum",
        }),
      },
    );

    stories.add(
      "fullscreen",
      templateMapper<ModalArgs>((args, { modalTemplate, datePickerBody }) =>
        modalTemplate(modalArgsMapper(args, datePickerBody)),
      ),
      {
        args: componentArgs<Pick<ModalArgs, "role" | "modalTitle" | "fullscreen">>({
          role: "dialog",
          modalTitle: "Fullscreen",
          fullscreen: true,
        }),
      },
    );

    return stories;
  });
}
