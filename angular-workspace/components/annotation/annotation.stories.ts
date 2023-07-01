import { storiesOf } from "@storybook/angular";
import { storiesOfAnnotation } from "dso-toolkit";

import { templateContainer } from "../../templates";
import { annotationContent } from "./annotation.content";

import readme from "./readme.md?raw";

storiesOfAnnotation({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ annotationTemplate }, templates) => ({
    annotationTemplate,
    annotationContent: annotationContent(templates),
  }),
});
