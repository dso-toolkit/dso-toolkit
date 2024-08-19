import { Meta } from "@storybook/web-components";

import { documentComponentMeta, documentComponentStories } from "dso-toolkit";

import readme from "@dso-toolkit/core/src/components/document-component/readme.md?raw";

import { templateContainer } from "../../templates";
import { html } from "lit-html";
import { DocumentComponentOzonContentAnchorClickEvent, DsotDocumentComponentDemoCustomEvent } from "@dso-toolkit/core";

import { decorator } from "./document-component.decorator";

const meta: Meta = {
  ...documentComponentMeta({ readme }),
  title: "Core/Document Component",
};

export default meta;

const { Default, Demo, IMRO } = documentComponentStories(
  {
    templateContainer,
    storyTemplates: (templates) => {
      const { documentComponentTemplate } = templates;

      return {
        documentComponentTemplate,
        demoTemplate: (jsonFile, openDefault, showCanvas, ozonContentAnchorClick) =>
          html`<dsot-document-component-demo
            @dsotOzonContentAnchorClick=${(
              e: DsotDocumentComponentDemoCustomEvent<DocumentComponentOzonContentAnchorClickEvent>,
            ) => ozonContentAnchorClick(e.detail)}
            .jsonFile=${jsonFile}
            ?open-default=${openDefault}
            ?show-canvas=${showCanvas}
          ></dsot-document-component-demo>`,
      };
    },
  },
  decorator,
);

export { Default, Demo, IMRO };
