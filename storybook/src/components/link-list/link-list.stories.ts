import { storiesOfLinkList, StoryRoot } from "dso-toolkit";

import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/link-list/readme.md";

import { templateContainer } from "../../templates";
import { html, TemplateResult } from "lit-html";

storiesOfLinkList({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ linkListTemplate, highlightBoxTemplate }) => {
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

    return { linkListTemplate, inHighlightBoxTemplate, inFooterTemplate };
  },
});
