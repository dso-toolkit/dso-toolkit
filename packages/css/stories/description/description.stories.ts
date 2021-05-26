import { storiesOfDescription, Description, DescriptionArgs, DescriptionExampleArgs, DescriptionExampleTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

// @ts-ignore
import readme from './readme.md';

const descriptionTemplate = ({ id, open, term, content }: Description) => html`
  <a
    id="${id}-term"
    href="${id}-content"
    class="dso-description-term ${open ? `dso-open` : ''}"
    aria-expanded="${ifDefined(open ? 'true' : 'false')}"
    aria-controls="${id}-content">
    ${term}
  </a>
  <span id="${id}-content" class="dso-description-content">
    ${content}
    <a href="${id}-term">
      <span class="sr-only">Verbergen</span>
    </a>
  </span>
`;

const template: DescriptionExampleTemplateFn<TemplateResult> = ({ textBefore, id, term, content, open, textAfter }: DescriptionExampleArgs) => html`
  ${textBefore} ${descriptionTemplate({ id, term, content, open })} ${textAfter}
`;

storiesOfDescription<TemplateResult>({
  module,
  storiesOf,
  readme,
  descriptionTemplate: ({ id, term, content, open }: DescriptionArgs) => descriptionTemplate({ id, term, content, open }),
  exampleTemplate: template
});
