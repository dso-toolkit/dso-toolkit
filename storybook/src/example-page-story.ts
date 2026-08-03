import { TemplateResult } from "lit-html";
import { compiler } from "markdown-to-jsx/react";
import { ArgTypes, Args, Renderer } from "storybook/internal/types";

import { StoryObj } from "./shared/story-obj.js";

interface ExamplePageStoryOptions<TArgs extends Args> {
  argTypes?: Partial<ArgTypes<TArgs>>;
  args?: Partial<TArgs>;
}

export function examplePageStory<TArgs extends Args = Args>(
  template: (args: TArgs) => TemplateResult,
  options?: ExamplePageStoryOptions<TArgs>,
): StoryObj<TArgs, Renderer> {
  return {
    argTypes: options?.argTypes,
    args: options?.args,
    parameters: { layout: "fullscreen", docs: { page: () => compiler("") } },
    render: (args) => template(args),
  };
}
