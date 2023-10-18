import { storiesOf } from "@storybook/web-components";
import { storiesOfAnnotation, StoryRoot } from "dso-toolkit";

import baseReadme from "dso-toolkit/src/components/annotation/readme.md?raw";
import buttonReadme from "@dso-toolkit/core/src/components/annotation-button/readme.md?raw";
import outputReadme from "@dso-toolkit/core/src/components/annotation-output/readme.md?raw";

import { templateContainer } from "../../templates";
import { annotationContent } from "./annotation.content";

storiesOfAnnotation({
  parameters: {
    module,
    storiesOf,
    readme: [baseReadme, buttonReadme, outputReadme].join("\n"),
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ annotationTemplate }, templates) => ({
    annotationTemplate,
    annotationContent: annotationContent(templates),
  }),
});
