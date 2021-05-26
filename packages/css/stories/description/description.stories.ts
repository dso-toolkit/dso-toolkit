import { storiesOfDescription, DescriptionArgs, DescriptionTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

// @ts-ignore
import readme from './readme.md';

const template: DescriptionTemplateFn<TemplateResult> = ({ textBefore, textAfter, term, content, open, identifier }: DescriptionArgs) => html`
  ${textBefore}
  <a
    id="${identifier}-term"
    href="${identifier}-content"
    class="dso-description-term ${open ? `dso-open` : ''}"
    aria-expanded="${ifDefined(open ? 'true' : 'false')}"
    aria-controls="${identifier}-content">
    ${term}
  </a>
  <span id="${identifier}-content" class="dso-description-content">
    ${content}
    <a href="${identifier}-term">
      <span class="sr-only">Verbergen</span>
    </a>
  </span>
  ${textAfter}
`;

storiesOfDescription<TemplateResult>({
  module,
  storiesOf,
  readme,
  template
});
