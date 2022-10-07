import { storiesOfLinkList } from '@dso-toolkit/sources';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { storiesOf } from '@storybook/web-components';

import cssReadme from '@dso-toolkit/css/src/components/link-list/readme.md';

import { templateContainer } from '../../templates';
import { html, TemplateResult } from 'lit-html';

storiesOfLinkList(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  templateContainer,
  ({ linkListTemplate, highlightBoxTemplate }) => {
    function inFooterTemplate(linkList: TemplateResult) {
      return html`
        <footer>
          ${linkList}
        </footer>
      `;
    }
    
    function inHighlightBoxTemplate(linkList: TemplateResult) {
      return html`
        ${highlightBoxTemplate({ richContent: linkList })}
        ${highlightBoxTemplate({ richContent: linkList, yellow: true })}
        ${highlightBoxTemplate({ richContent: linkList, border: true })}
        ${highlightBoxTemplate({ richContent: linkList, dropShadow: true, white: true })}
      `;
    }
    
    
    return ({ linkListTemplate, inHighlightBoxTemplate, inFooterTemplate });
  }
);
