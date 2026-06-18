import { TemplateResult } from "lit-html";
import { compiler } from "markdown-to-jsx";
import { Args } from "storybook/internal/types";

import { Templates, templateContainer } from "./templates";

interface ExamplePageStoriesOptions<TArgs extends Args> {
  argTypes?: Record<string, unknown>;
  args?: Partial<TArgs>;
}

export function examplePageStories<TArgs extends Args = Args>(
  storyTemplates: (templates: Templates, args: TArgs) => TemplateResult,
  options?: ExamplePageStoriesOptions<TArgs>,
) {
  const implementations = templateContainer.getImplementationTypes();

  return {
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
      ...options?.argTypes,
    },
    args: {
      preferredImplementation: "core",
      ...options?.args,
    },
    parameters: { layout: "fullscreen", docs: { page: () => compiler("") } },
    render: templateContainer.render(
      (templates) => templates,
      (args: TArgs, templates) => storyTemplates(templates, args),
    ),
  };
}
