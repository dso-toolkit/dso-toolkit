import { IStory } from "@storybook/angular";

export function isStoryFnAngularReturnTypeTemplate(story: unknown): story is Pick<IStory, "props" | "template"> {
  return !!story && typeof story === "object" && ("template" in story || "props" in story);
}
