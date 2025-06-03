import { TemplateResult } from "lit-html";
import { compiler } from "markdown-to-jsx";

import { Templates, templateContainer } from "./templates";

export function examplePageStories(storyTemplates: (templates: Templates) => TemplateResult) {
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
    },
    args: {
      preferredImplementation: "core",
    },
    parameters: { layout: "fullscreen", docs: { page: () => compiler("") } },
    render: templateContainer.render(storyTemplates, (_args, storyTemplates) => storyTemplates),
  };
}
