import { Meta } from "@storybook/web-components-vite";
import { DefinitionList, DocumentHeaderArgs, documentHeaderMeta, documentHeaderStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/document-header/readme.md?raw";
import { TemplateResult, html } from "lit-html";

import { templateContainer } from "../../templates";

const meta: Meta<DocumentHeaderArgs> = {
  ...documentHeaderMeta({ readme }),
  title: "HTML|CSS/Document Header",
};

export default meta;

const { Default, DefaultOntwerp, DefaultBesluitversie, Sticky, StickyOntwerp, StickyBesluitversie } =
  documentHeaderStories({
    templateContainer,
    storyTemplates: (templates) => {
      const { documentHeaderTemplate, linkTemplate } = templates;

      const features: DefinitionList<TemplateResult> = {
        modifier: "dso-document-header-features",
        definitions: [
          {
            term: html`Opschrift:`,
            descriptions: [
              {
                content: "Besluit van 3 juli 2018, houdende regels over activiteiten in de fysieke leefomgeving",
              },
            ],
          },
          {
            term: html`Identificatie:`,
            descriptions: [
              {
                content: "/akn/nl/act/mnre1034/2021/BWBR0041330",
              },
            ],
          },
          {
            term: html`Besluit:`,
            descriptions: [
              {
                content: linkTemplate({
                  label: "Bekijk besluit",
                  url: "#",
                  icon: {
                    icon: "external-link",
                  },
                  iconMode: "after",
                }),
              },
            ],
          },
        ],
      };

      return {
        documentHeaderTemplate,
        features,
      };
    },
  });

export { Default, DefaultBesluitversie, DefaultOntwerp, Sticky, StickyBesluitversie, StickyOntwerp };
