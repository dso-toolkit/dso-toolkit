import { Args, StoryApi } from "@storybook/addons";

import { TemplateContainer } from "../template-container";

import { createStories } from "./create-stories.function";
import { StorybookParameters } from "./storybook-parameters.interface";

export interface StoriesOfArguments<Implementation, Templates, TemplateFnReturnType, StoryTemplates> {
  parameters: StorybookParameters;
  templateContainer: TemplateContainer<Implementation, Templates, TemplateFnReturnType>;
  storyTemplates: (templates: Templates, allTemplates: Templates) => StoryTemplates;
}

export interface StoryOfFactoryArguments<TemplateFnReturnType, StoryTemplates> {
  (
    stories: StoryApi<TemplateFnReturnType>,
    templateMapper: <StoryVariantArgs>(
      cb: (args: StoryVariantArgs, storyTemplates: StoryTemplates) => TemplateFnReturnType
    ) => (args: Args) => TemplateFnReturnType
  ): void;
}

export function storiesOfFactory<Implementation, TemplateFnReturnType, StoryTemplates, Templates>(
  name: string,
  {
    parameters,
    storyTemplates,
    templateContainer,
  }: StoriesOfArguments<Implementation, Templates, TemplateFnReturnType, StoryTemplates>,
  factory: StoryOfFactoryArguments<TemplateFnReturnType, StoryTemplates>
) {
  const stories = createStories(name, parameters);

  const implementations = templateContainer.getImplementationTypes();
  if (name.startsWith("Voorbeeldpagina") && implementations.length > 1) {
    stories.addParameters({
      argTypes: {
        preferredImplementation: {
          options: implementations,
          control: {
            type: "select",
          },
          table: {
            category: "Settings",
          },
        },
      },
      args: {
        preferredImplementation: "core",
      },
    });
  }

  factory(stories, (mapper) => (a) => {
    // misschien fuseren met TemplateContainer.fromArgs() ?
    const { preferredImplementation } = a;
    const args = { ...a };
    delete args.preferredImplementation;

    const templates = templateContainer.render(preferredImplementation ?? "core");

    return mapper(args as never, storyTemplates(templates, templates));
  });
}
