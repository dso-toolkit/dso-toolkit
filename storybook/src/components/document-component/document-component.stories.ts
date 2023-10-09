import { storiesOfDocumentComponent, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import coreReadme from "@dso-toolkit/core/src/components/document-component/readme.md?raw";

import { templateContainer } from "../../templates";
import { html } from "lit-html";
import { DocumentComponentOzonContentAnchorClickEvent, DsotDocumentComponentDemoCustomEvent } from "@dso-toolkit/core";

storiesOfDocumentComponent({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ documentComponentTemplate }) => ({
    documentComponentTemplate,
    demoTemplate: (jsonFile, openDefault, showCanvas, ozonContentAnchorClick) =>
      html`<style>
          body {
            overflow: hidden;
          }
        </style>
        <dsot-document-component-demo
          @dsotOzonContentAnchorClick=${(
            e: DsotDocumentComponentDemoCustomEvent<DocumentComponentOzonContentAnchorClickEvent>
          ) => ozonContentAnchorClick(e.detail)}
          .jsonFile=${jsonFile}
          ?open-default=${openDefault}
          ?show-canvas=${showCanvas}
        ></dsot-document-component-demo>`,
  }),
});
