import { storiesOfDocumentList, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/document-list/readme.md";

import { templateContainer } from "../../templates";
import { html } from "lit-html";

storiesOfDocumentList({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ documentListTemplate, badgeTemplate }) => ({
    documentListTemplate,
    statusDemoMap: ({ badge, date }) => html`${badgeTemplate(badge)} ${date}`,
  }),
});
