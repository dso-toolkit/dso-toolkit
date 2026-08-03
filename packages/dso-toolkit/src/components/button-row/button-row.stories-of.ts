import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters2, StoryObj } from "../../template-container.js";

import { ButtonRowArgs, buttonRowArgTypes, buttonRowArgsMapper } from "./button-row.args.js";
import { ButtonRow } from "./button-row.models.js";

type ButtonRowStory = StoryObj<ButtonRowArgs, Renderer>;

interface ButtonRowStories {
  Default: ButtonRowStory;
  AlleButtonVarianten: ButtonRowStory;
  PrimaireButtonVarianten: ButtonRowStory;
  SecundaireButtonVarianten: ButtonRowStory;
  TertiaireButtonVarianten: ButtonRowStory;
  Emphasized: ButtonRowStory;
}

interface ButtonRowStoriesParameters<TemplateFnReturnType> extends StoriesParameters2<
  ButtonRowTemplates<TemplateFnReturnType>
> {}

interface ButtonRowTemplates<TemplateFnReturnType> {
  buttonRowTemplate: (buttonRowProperties: ButtonRow) => TemplateFnReturnType;
}

export function buttonRowMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ButtonRowArgs
> {
  return {
    argTypes: buttonRowArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function buttonRowStories<TemplateFnReturnType>({
  storyTemplates,
}: ButtonRowStoriesParameters<TemplateFnReturnType>): ButtonRowStories {
  const render = (args: ButtonRowArgs) => storyTemplates().buttonRowTemplate(buttonRowArgsMapper(args));
  return {
    Default: {
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
      render,
    },
    AlleButtonVarianten: {
      args: {
        buttons: [
          {
            icon: {
              icon: "chevron-left",
            },
            variant: "tertiary",
            label: "Naar project overzicht",
          },
          {
            icon: {
              icon: "redo",
            },
            variant: "secondary",
            label: "Aanvullen",
          },
          {
            icon: {
              icon: "pencil",
            },
            variant: "secondary",
            label: "Intrekken",
          },
          {
            icon: {
              icon: "trash",
            },
            variant: "secondary",
            label: "Verwijderen",
          },
          {
            icon: {
              icon: "download",
            },
            variant: "secondary",
            label: "Download verzoek als PDF",
          },
        ],
      },
      render,
    },
    PrimaireButtonVarianten: {
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
            },
          },
          {
            variant: "primary",
            label: "Disabled with icon",
            disabled: true,
            icon: {
              icon: "chevron-left",
            },
          },
          {
            variant: "primary",
            label: "Extern",
            icon: {
              icon: "external-link",
            },
            iconMode: "after",
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
            },
            iconMode: "after",
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
            },
          },
        ],
      },
      render,
    },
    SecundaireButtonVarianten: {
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
            },
            iconMode: "after",
          },
          {
            variant: "secondary",
            label: "Disabled with icon",
            disabled: true,
            icon: {
              icon: "chevron-left",
            },
          },
          {
            variant: "secondary",
            label: "Extern",
            icon: {
              icon: "external-link",
            },
            iconMode: "after",
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
            },
            iconMode: "after",
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
            },
          },
        ],
      },
      render,
    },
    TertiaireButtonVarianten: {
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
            },
            iconMode: "after",
          },
          {
            variant: "tertiary",
            label: "Disabled with icon",
            disabled: true,
            icon: {
              icon: "chevron-left",
            },
          },
          {
            variant: "tertiary",
            label: "Extern",
            icon: {
              icon: "external-link",
            },
            iconMode: "after",
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
            },
            iconMode: "after",
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
            },
          },
        ],
      },
      render,
    },
    Emphasized: {
      args: {
        emphasized: true,
        buttons: [
          {
            icon: {
              icon: "chevron-left",
            },
            variant: "tertiary",
            label: "Naar project overzicht",
          },
          {
            icon: {
              icon: "redo",
            },
            variant: "tertiary",
            label: "Aanvullen",
          },
          {
            icon: {
              icon: "pencil",
            },
            variant: "tertiary",
            label: "Intrekken",
          },
          {
            icon: {
              icon: "trash",
            },
            variant: "tertiary",
            label: "Verwijderen",
          },
          {
            icon: {
              icon: "download",
            },
            variant: "tertiary",
            label: "Download verzoek als PDF",
          },
        ],
      },
      render,
    },
  };
}
