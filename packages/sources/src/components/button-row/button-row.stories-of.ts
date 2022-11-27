import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { ButtonRowArgs, buttonRowArgsMapper, buttonRowArgTypes } from "./button-row.args";
import { ButtonRow } from "./button-row.models";

export interface ButtonRowTemplates<TemplateFnReturnType> {
  buttonRowTemplate: (buttonRowProperties: ButtonRow) => TemplateFnReturnType;
}

export function storiesOfButtonRow<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ButtonRowTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Button Row", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: buttonRowArgTypes,
    });

    const template = templateMapper<ButtonRowArgs>((args, { buttonRowTemplate }) =>
      buttonRowTemplate(buttonRowArgsMapper(args))
    );

    stories.add("default", template, {
      args: {
        buttons: [
          {
            variant: "secondary",
            label: "Button 1",
          },
          {
            variant: "secondary",
            label: "Button 2",
          },
          {
            variant: "secondary",
            label: "Button 3",
          },
          {
            variant: "secondary",
            label: "Button 4",
          },
          {
            variant: "secondary",
            label: "Button 5",
          },
        ],
      },
    });

    stories.add("alle button varianten", template, {
      args: {
        buttons: [
          {
            icon: {
              icon: "chevron-left",
              iconMode: "before",
            },
            variant: "tertiary",
            label: "Naar project overzicht",
          },
          {
            icon: {
              icon: "redo",
              iconMode: "before",
            },
            variant: "secondary",
            label: "Aanvullen",
          },
          {
            icon: {
              icon: "pencil",
              iconMode: "before",
            },
            variant: "secondary",
            label: "Intrekken",
          },
          {
            icon: {
              icon: "trash",
              iconMode: "before",
            },
            variant: "secondary",
            label: "Verwijderen",
          },
          {
            icon: {
              icon: "download",
              iconMode: "before",
            },
            variant: "secondary",
            label: "Download verzoek als PDF",
          },
        ],
      },
    });

    return stories;
  });
}
