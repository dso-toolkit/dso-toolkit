import { storiesOfDocumentList } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "@dso-toolkit/css/src/components/document-list/readme.md";

import { StoryRoot } from "@dso-toolkit/sources/src/storybook";
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
