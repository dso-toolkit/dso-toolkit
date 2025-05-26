import activiteitReadme from "@dso-toolkit/core/src/components/annotation/annotation-activiteit/readme.md?raw";
import gebiedsaanwijzingReadme from "@dso-toolkit/core/src/components/annotation/annotation-gebiedsaanwijzing/readme.md?raw";
import kaartReadme from "@dso-toolkit/core/src/components/annotation/annotation-kaart/readme.md?raw";
import locatieReadme from "@dso-toolkit/core/src/components/annotation/annotation-locatie/readme.md?raw";
import omgevingsnormwaardeReadme from "@dso-toolkit/core/src/components/annotation/annotation-omgevingsnormwaarde/readme.md?raw";
import rootReadme from "@dso-toolkit/core/src/components/annotation/readme.md?raw";
import type { Meta } from "@storybook/web-components";
import { annotationMeta, annotationStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { decorator } from "./annotation.decorator";

const meta: Meta = {
  ...annotationMeta({
    rootReadme,
    implementationReadmes: [
      activiteitReadme,
      gebiedsaanwijzingReadme,
      omgevingsnormwaardeReadme,
      kaartReadme,
      locatieReadme,
    ],
  }),
  title: "Core/Annotation",
};

export default meta;

const { Activiteit, Gebiedsaanwijzing, Omgevingsnormwaarde, Locatie, Kaart } = annotationStories(
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

export { Activiteit, Gebiedsaanwijzing, Kaart, Locatie, Omgevingsnormwaarde };
