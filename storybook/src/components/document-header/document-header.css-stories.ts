import { Meta } from "@storybook/web-components-vite";
import { DocumentHeaderArgs, documentHeaderMeta, documentHeaderStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/document-header/readme.md?raw";

import { templateContainer } from "../../templates";

import { featuresContent } from "./document-header.content";

const meta: Meta<DocumentHeaderArgs> = {
  ...documentHeaderMeta({ readme }),
  title: "HTML|CSS/Document Header",
};

export default meta;

const { Default, DefaultOntwerp, DefaultBesluitversie, Sticky, StickyOntwerp, StickyBesluitversie } =
  documentHeaderStories({
    templateContainer,
    storyTemplates: (templates) => {
      const { documentHeaderTemplate } = templates;

      return {
        documentHeaderTemplate,
        features: featuresContent(templates),
      };
    },
  });

export { Default, DefaultBesluitversie, DefaultOntwerp, Sticky, StickyBesluitversie, StickyOntwerp };
