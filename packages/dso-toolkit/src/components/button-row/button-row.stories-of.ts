import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { ButtonRowArgs, buttonRowArgsMapper, buttonRowArgTypes } from "./button-row.args.js";
import { ButtonRow } from "./button-row.models.js";

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

    stories.add("primaire button varianten", template, {
      args: {
        buttons: [
          {
            variant: "primary",
            label: "Primary",
          },
          {
            variant: "primary",
            label: "Disabled",
            disabled: true,
          },
          {
            variant: "primary",
            label: "Chevron",
            icon: {
              icon: "chevron-right",
              iconMode: "before",
            },
          },
          {
            variant: "primary",
            label: "Disabled with icon",
            disabled: true,
            icon: {
              icon: "chevron-left",
              iconMode: "before",
            },
          },
          {
            variant: "primary",
            label: "Extern",
            icon: {
              icon: "external-link",
              iconMode: "after",
            },
          },
          {
            variant: "primary",
            label: "Spinner",
            modifier: "dso-spinner-left",
          },
          {
            variant: "primary",
            label: "Download",
            icon: {
              icon: "download",
              iconMode: "after",
            },
          },
          {
            variant: "primary",
            label: "Anchor",
          },
          {
            variant: "primary",
            label: "Anchor with icon",
            icon: {
              icon: "chevron-left",
              iconMode: "before",
            },
          },
          {
            variant: "primary",
            label: "Small",
            compact: true,
          },
          {
            variant: "primary",
            label: "Small",
            compact: true,
            icon: {
              icon: "download",
              iconMode: "before",
            },
          },
        ],
      },
    });

    stories.add("secundaire button varianten", template, {
      args: {
        buttons: [
          {
            variant: "secondary",
            label: "Primary",
          },
          {
            variant: "secondary",
            label: "Disabled",
            disabled: true,
          },
          {
            variant: "secondary",
            label: "Chevron",
            icon: {
              icon: "chevron-right",
              iconMode: "after",
            },
          },
          {
            variant: "secondary",
            label: "Disabled with icon",
            disabled: true,
            icon: {
              icon: "chevron-left",
              iconMode: "before",
            },
          },
          {
            variant: "secondary",
            label: "Extern",
            icon: {
              icon: "external-link",
              iconMode: "after",
            },
          },
          {
            variant: "secondary",
            label: "Spinner",
            modifier: "dso-spinner-left",
          },
          {
            variant: "secondary",
            label: "Download",
            icon: {
              icon: "download",
              iconMode: "after",
            },
          },
          {
            variant: "secondary",
            label: "Anchor",
          },
          {
            variant: "secondary",
            label: "Anchor with icon",
            icon: {
              icon: "chevron-left",
              iconMode: "before",
            },
          },
          {
            variant: "secondary",
            label: "Small",
            compact: true,
          },
          {
            variant: "secondary",
            label: "Small",
            compact: true,
            icon: {
              icon: "download",
              iconMode: "before",
            },
          },
        ],
      },
    });

    stories.add("tertiare button varianten", template, {
      args: {
        buttons: [
          {
            variant: "tertiary",
            label: "Primary",
          },
          {
            variant: "tertiary",
            label: "Disabled",
            disabled: true,
          },
          {
            variant: "tertiary",
            label: "Chevron",
            icon: {
              icon: "chevron-right",
              iconMode: "after",
            },
          },
          {
            variant: "tertiary",
            label: "Disabled with icon",
            disabled: true,
            icon: {
              icon: "chevron-left",
              iconMode: "before",
            },
          },
          {
            variant: "tertiary",
            label: "Extern",
            icon: {
              icon: "external-link",
              iconMode: "after",
            },
          },
          {
            variant: "tertiary",
            label: "Spinner",
            modifier: "dso-spinner-left",
          },
          {
            variant: "tertiary",
            label: "Download",
            icon: {
              icon: "download",
              iconMode: "after",
            },
          },
          {
            variant: "tertiary",
            label: "Anchor",
          },
          {
            variant: "tertiary",
            label: "Anchor with icon",
            icon: {
              icon: "chevron-left",
              iconMode: "before",
            },
          },
          {
            variant: "tertiary",
            label: "Small",
            compact: true,
          },
          {
            variant: "tertiary",
            label: "Small",
            compact: true,
            icon: {
              icon: "download",
              iconMode: "before",
            },
          },
        ],
      },
    });

    stories.add("emphasized", template, {
      args: {
        emphasized: true,
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
            variant: "tertiary",
            label: "Aanvullen",
          },
          {
            icon: {
              icon: "pencil",
              iconMode: "before",
            },
            variant: "tertiary",
            label: "Intrekken",
          },
          {
            icon: {
              icon: "trash",
              iconMode: "before",
            },
            variant: "tertiary",
            label: "Verwijderen",
          },
          {
            icon: {
              icon: "download",
              iconMode: "before",
            },
            variant: "tertiary",
            label: "Download verzoek als PDF",
          },
        ],
      },
    });

    return stories;
  });
}
