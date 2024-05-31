import type { Meta } from "@storybook/web-components";
import { annotationMeta, annotationStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import rootReadme from "@dso-toolkit/core/src/components/annotation/readme.md?raw";
import activiteitReadme from "@dso-toolkit/core/src/components/annotation/annotation-activiteit/readme.md?raw";
import gebiedsaanwijzingReadme from "@dso-toolkit/core/src/components/annotation/annotation-gebiedsaanwijzing/readme.md?raw";
import omgevingsnormReadme from "@dso-toolkit/core/src/components/annotation/annotation-omgevingsnorm/readme.md?raw";
import werkingsgebiedReadme from "@dso-toolkit/core/src/components/annotation/annotation-werkingsgebied/readme.md?raw";
import { decorator } from "./annotation.decorator";

const meta: Meta = {
  ...annotationMeta({
    rootReadme,
    implementationReadmes: [activiteitReadme, gebiedsaanwijzingReadme, omgevingsnormReadme, werkingsgebiedReadme],
  }),
  title: "Core/Annotation",
};

export default meta;

const { Activiteit, Gebiedsaanwijzing, Omgevingsnorm, Werkingsgebied } = annotationStories(
  {
    templateContainer,
    storyTemplates: (templates) => {
      const { annotationTemplate } = templates;

      return {
        annotationTemplate,
      };
    },
  },
  decorator,
);

export { Activiteit, Gebiedsaanwijzing, Omgevingsnorm, Werkingsgebied };
