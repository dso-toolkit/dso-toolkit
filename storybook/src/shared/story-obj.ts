import { Renderer, StoryAnnotations } from "storybook/internal/types";

export type StoryObj<TArgs, TRenderer extends Renderer> = StoryAnnotations<TRenderer, TArgs>;
