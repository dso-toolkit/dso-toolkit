import type { Meta } from "@storybook/web-components";
import { AnnotationArgs, annotationMeta, annotationStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import { annotationContent } from "./annotation.content";

import readme from "./readme.md?raw";

const meta: Meta<AnnotationArgs> = {
  ...annotationMeta({ readme }),
  title: "Annotation",
};

export default meta;

const { Default, MetLid } = annotationStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { annotationTemplate } = templates;

    return {
      annotationTemplate,
      annotationContent: annotationContent(templates),
    };
  },
});

export { Default, MetLid };
