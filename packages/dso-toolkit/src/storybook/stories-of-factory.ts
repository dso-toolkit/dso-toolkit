import { Args, StoryApi } from "@storybook/addons";

import { TemplateContainer } from "../template-container.js";

import { createStories } from "./create-stories.function.js";
import { StorybookParameters } from "./storybook-parameters.interface.js";

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
  ): StoryApi<TemplateFnReturnType>;
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

  return factory(stories, (mapper) => (a) => {
    // misschien fuseren met TemplateContainer.fromArgs() ?
    const { preferredImplementation } = a;
    const args = { ...a };
    delete args["preferredImplementation"];

    const templates = templateContainer.create(preferredImplementation, stories.kind);

    return mapper(args as never, storyTemplates(templates, templates));
  });
}
