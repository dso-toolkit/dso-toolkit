import { storiesOf } from "@storybook/web-components";
import { storiesOfAnnotation, StoryRoot } from "dso-toolkit";

import coreReadme from "dso-toolkit/src/components/annotation/readme.md";

import { templateContainer } from "../../templates";
import { annotationContent } from "./annotation.content";

storiesOfAnnotation({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ annotationTemplate }, templates) => ({
    annotationTemplate,
    annotationContent: annotationContent(templates),
  }),
});
