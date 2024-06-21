import { StoryFnAngularReturnType } from "@storybook/angular/dist/client/types";

export function isStoryFnAngularReturnTypeTemplate(
  story: unknown,
): story is Pick<StoryFnAngularReturnType, "props" | "template"> {
  return !!story && typeof story === "object" && ("template" in story || "props" in story);
}
