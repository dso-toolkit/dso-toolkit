import type { Meta } from "@storybook/web-components";

import { LinkListArgs, linkListMeta, linkListStories } from "dso-toolkit";

import readme from "dso-toolkit/src/components/link-list/readme.md?raw";

import { templateContainer } from "../../templates";
import { html, TemplateResult } from "lit-html";

const meta: Meta<LinkListArgs> = {
  ...linkListMeta({ readme }),
  title: "HTML|CSS/Link List",
};

export default meta;

const { InFooter, InHighlightBox, InNav, Ol, Ul } = linkListStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { linkListTemplate, highlightBoxTemplate } = templates;

    function inFooterTemplate(linkList: TemplateResult) {
      return html`<footer>${linkList}</footer>`;
    }

    function inHighlightBoxTemplate(linkList: TemplateResult) {
      return html`
        ${highlightBoxTemplate({ content: linkList })} ${highlightBoxTemplate({ content: linkList, yellow: true })}
        ${highlightBoxTemplate({ content: linkList, border: true })}
        ${highlightBoxTemplate({
          content: linkList,
          dropShadow: true,
          white: true,
        })}
      `;
    }

    return {
      linkListTemplate,
      inHighlightBoxTemplate,
      inFooterTemplate,
    };
  },
});

export { Ul, Ol, InHighlightBox, InNav, InFooter };
