import { ComponentAnnotations, Renderer } from "@storybook/types";

import { FormArgs, formArgsMapper, formArgTypes } from "./form.args.js";
import { Form } from "./form.models.js";
import { formGroupCollectionContent, formGroupContent } from "./form.content.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface";

type FormStory = StoryObj<FormArgs, Renderer>;

interface FormStories {
  Horizontal: FormStory;
  HorizontalCollections: FormStory;
  Vertical: FormStory;
  VerticalCollections: FormStory;
  SinglePage: FormStory;
}

export interface FormTemplates<TemplateFnReturnType> {
  formTemplate: (form: Form<TemplateFnReturnType>) => TemplateFnReturnType;
}

interface FormStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, FormTemplates<TemplateFnReturnType>> {}

export function formMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  FormArgs
> {
  return {
    argTypes: formArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function formStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: FormStoriesParameters<Implementation, Templates, TemplateFnReturnType>): FormStories {
  return {
    Horizontal: {
      args: {
        mode: "horizontal",
      },
      render: templateContainer.render(storyTemplates, (args, { formTemplate }) =>
        formTemplate(formArgsMapper(args, formGroupContent)),
      ),
    },
    HorizontalCollections: {
      args: {
        mode: "horizontal",
      },
      render: templateContainer.render(storyTemplates, (args, { formTemplate }) =>
        formTemplate(formArgsMapper(args, formGroupCollectionContent)),
      ),
    },
    Vertical: {
      args: {
        mode: "vertical",
      },
      render: templateContainer.render(storyTemplates, (args, { formTemplate }) =>
        formTemplate(formArgsMapper(args, formGroupContent)),
      ),
    },
    VerticalCollections: {
      args: {
        mode: "vertical",
      },
      render: templateContainer.render(storyTemplates, (args, { formTemplate }) =>
        formTemplate(formArgsMapper(args, formGroupCollectionContent)),
      ),
    },
    SinglePage: {
      args: {
        formModifier: "dso-single-page",
      },
      render: templateContainer.render(storyTemplates, (args, { formTemplate }) =>
        formTemplate(formArgsMapper(args, formGroupCollectionContent)),
      ),
    },
  };
}
