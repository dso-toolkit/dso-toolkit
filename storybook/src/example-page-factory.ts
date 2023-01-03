import { storiesOfFactory } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";
import { TemplateResult } from "lit-html";

import { templateContainer, Templates } from "./templates";

export function examplePageFactory(
  location: string | null,
  name: string,
  storyTemplates: (templates: Templates, allTemplates: Templates) => TemplateResult
) {
  storiesOfFactory(
    `Voorbeeldpagina's/${[location, name].filter((s) => s).join("/")}`,
    {
      parameters: {
        module,
        readme: "",
        storiesOf,
      },
      storyTemplates,
      templateContainer,
    },
    (stories, templateMapper) => {
      return stories
        .addParameters({
          layout: "fullscreen",
        })
        .add(
          name,
          templateMapper((_args, storyTemplates) => storyTemplates)
        );
    }
  );
}
