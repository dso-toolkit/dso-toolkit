import { Meta } from "@storybook/web-components";

import { DefinitionList, DocumentHeaderArgs, documentHeaderMeta, documentHeaderStories } from "dso-toolkit";

import readme from "dso-toolkit/src/components/document-header/readme.md?raw";

import { templateContainer } from "../../templates";
import { html, TemplateResult } from "lit-html";

const meta: Meta<DocumentHeaderArgs> = {
  ...documentHeaderMeta({ readme }),
  title: "HTML|CSS/Document Header",
};

export default meta;

const { Default, Sticky } = documentHeaderStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { documentHeaderTemplate, anchorTemplate } = templates;

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
              content: anchorTemplate({
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

export { Default, Sticky };
