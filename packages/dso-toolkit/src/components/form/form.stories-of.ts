import { StorybookParameters, StoryRoot } from "../../storybook/index.js";

import { FormArgs, formArgsMapper, formArgTypes } from "./form.args.js";
import { Form } from "./form.models.js";
import { formGroupCollectionContent, formGroupContent } from "./form.content.js";

import { compiler } from "markdown-to-jsx";
import { TemplateContainer } from "../../template-container.js";

export interface FormTemplates<TemplateFnReturnType> {
  formTemplate: (form: Form<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function storiesOfForm<Implementation, Templates, TemplateFnReturnType>(
  { module: mainModule, storiesOf, readme }: StorybookParameters,
  templateContainer: TemplateContainer<Implementation, Templates, TemplateFnReturnType>,
  storyTemplates: (templates: Templates) => FormTemplates<TemplateFnReturnType>,
) {
  storiesOf(`${StoryRoot.HtmlCss}/Form`, mainModule)
    .addParameters({
      argTypes: formArgTypes,
      args: {
        mode: "vertical",
      },
      docs: {
        page: () => compiler(readme, { forceBlock: true }),
      },
    })
    .add(
      "vertical",
      templateContainer.fromArgs<FormArgs>((args, templates) => {
        const { formTemplate } = storyTemplates(templates);

        return formTemplate(formArgsMapper(args, formGroupContent));
      }),
    );

  storiesOf(`${StoryRoot.HtmlCss}/Form`, mainModule)
    .addParameters({
      argTypes: formArgTypes,
      args: {
        mode: "horizontal",
      },
      docs: {
        page: () => compiler(readme, { forceBlock: true }),
      },
    })
    .add(
      "horizontal",
      templateContainer.fromArgs<FormArgs>((args, templates) => {
        const { formTemplate } = storyTemplates(templates);

        return formTemplate(formArgsMapper(args, formGroupContent));
      }),
    );

  storiesOf(`${StoryRoot.HtmlCss}/Form`, mainModule)
    .addParameters({
      argTypes: formArgTypes,
      args: {
        mode: "vertical",
      },
      docs: {
        page: () => compiler(readme, { forceBlock: true }),
      },
    })
    .add(
      "vertical (collections)",
      templateContainer.fromArgs<FormArgs>((args, templates) => {
        const { formTemplate } = storyTemplates(templates);

        return formTemplate(formArgsMapper(args, formGroupCollectionContent));
      }),
    );

  storiesOf(`${StoryRoot.HtmlCss}/Form`, mainModule)
    .addParameters({
      argTypes: formArgTypes,
      args: {
        mode: "horizontal",
      },
      docs: {
        page: () => compiler(readme, { forceBlock: true }),
      },
    })
    .add(
      "horizontal (collections)",
      templateContainer.fromArgs<FormArgs>((args, templates) => {
        const { formTemplate } = storyTemplates(templates);

        return formTemplate(formArgsMapper(args, formGroupCollectionContent));
      }),
    );
}
