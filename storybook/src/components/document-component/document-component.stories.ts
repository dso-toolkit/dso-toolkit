import { storiesOfDocumentComponent, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import coreReadme from "@dso-toolkit/core/src/components/document-component/readme.md?raw";

import { templateContainer } from "../../templates";
import { html } from "lit-html";

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
    demo: html`<dsot-document-component-demo></dsot-document-component-demo>`,
  }),
});
