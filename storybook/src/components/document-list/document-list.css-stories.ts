import { Meta } from "@storybook/web-components-vite";
import { documentListMeta, documentListStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/document-list/readme.md?raw";
import { html } from "lit-html";

import { templateContainer } from "../../templates";

const meta: Meta = {
  ...documentListMeta({ readme }),
  title: "HTML|CSS/Document List (Deprecated)",
};

export default meta;

const { Default, Sticky } = documentListStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { documentListTemplate, badgeTemplate } = templates;

    return {
      documentListTemplate,
      statusDemoMap: ({ badge, date }) => html`${badgeTemplate(badge)} ${date}`,
    };
  },
});

export { Default, Sticky };
