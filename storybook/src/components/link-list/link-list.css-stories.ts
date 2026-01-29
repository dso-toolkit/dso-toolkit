import type { Meta } from "@storybook/web-components-vite";
import { HighlightBoxColor, LinkListArgs, linkListMeta, linkListStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/link-list/readme.md?raw";
import { TemplateResult, html } from "lit-html";

import { templateContainer } from "../../templates";

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
        ${highlightBoxTemplate({ content: linkList, color: HighlightBoxColor.grey })}
        ${highlightBoxTemplate({ content: linkList, color: HighlightBoxColor.yellow })}
        ${highlightBoxTemplate({ content: linkList, border: true, color: HighlightBoxColor.grey })}
        ${highlightBoxTemplate({
          content: linkList,
          dropShadow: true,
          color: HighlightBoxColor.white,
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

export { InFooter, InHighlightBox, InNav, Ol, Ul };
