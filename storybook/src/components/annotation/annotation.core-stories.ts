import type { Meta } from "@storybook/web-components";
import { annotationMeta, annotationStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "dso-toolkit/src/components/annotation/readme.md?raw";

const meta: Meta = {
  ...annotationMeta({ readme }),
  title: "Core/Annotation",
};

export default meta;

const { Activiteit, Gebiedsaanwijzing, Omgevingsnorm, Werkingsgebied } = annotationStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { annotationTemplate } = templates;

    return {
      annotationTemplate,
    };
  },
});

export { Activiteit, Gebiedsaanwijzing, Omgevingsnorm, Werkingsgebied };
