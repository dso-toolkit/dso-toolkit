import { ComponentAnnotations, Renderer } from "@storybook/types";
import { compiler } from "markdown-to-jsx";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { FormButtonsArgs, formButtonsArgTypes, formButtonsArgsMapper } from "./form-buttons.args.js";
import { FormButtons } from "./form-buttons.models.js";

type FormButtonsStory = StoryObj<FormButtonsArgs, Renderer>;

interface FormButtonsStories {
  Default: FormButtonsStory;
  MultiPage: FormButtonsStory;
  Sections: FormButtonsStory;
  SimpleForm: FormButtonsStory;
}

export interface FormButtonsTemplates<TemplateFnReturnType> {
  formButtonsTemplate: (formButtonsProperties: FormButtons) => TemplateFnReturnType;
}

interface FormButtonsStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    FormButtonsTemplates<TemplateFnReturnType>
  > {}

export function formButtonsMeta<TRenderer extends Renderer>({
  readme,
}: MetaOptions = {}): ComponentAnnotations<TRenderer> {
  return {
    argTypes: formButtonsArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function formButtonsStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: FormButtonsStoriesParameters<Implementation, Templates, TemplateFnReturnType>): FormButtonsStories {
  const render = templateContainer.render(storyTemplates, (args: FormButtonsArgs, { formButtonsTemplate }) =>
    formButtonsTemplate(formButtonsArgsMapper(args)),
  );

  return {
    Default: {
      args: {
        buttons: [
          {
            variant: "secondary",
            label: "Annuleren",
          },
          {
            variant: "primary",
            label: "Verstuur",
          },
        ],
      },
      render,
    },
    MultiPage: {
      args: {
        buttons: [
          {
            variant: "secondary",
            label: "Secundaire actie",
          },
          {
            icon: {
              icon: "angle-right",
            },
            iconMode: "after",
            variant: "primary",
            label: "Volgende stap",
          },
        ],
        asideButtons: [
          {
            icon: {
              icon: "angle-left",
            },
            variant: "tertiary",
            label: "Vorige stap",
          },
        ],
      },
      render,
    },
    Sections: {
      args: {
        buttons: [
          {
            variant: "secondary",
            label: "Secundaire actie",
          },
          {
            variant: "primary",
            label: "Primaire actie",
          },
        ],
      },
      render,
    },
    SimpleForm: {
      args: {
        buttons: [
          {
            variant: "primary",
            label: "Volgende",
          },
        ],
      },
      render,
    },
  };
}
