import { labelStories } from '@dso-toolkit/stories';
import { ArgsStoryFn } from '@storybook/addons';
import { storiesOf } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

// @ts-ignore
import readme from './readme.md';

const template: ArgsStoryFn<TemplateResult> = ({ status, label, button }: any) => html`
  <dso-label status=${ifDefined(status)}>
    ${label}
    ${button
      ? html `
        <button slot="action" type="button" title=${button.title} @click=${button.onClick}>
          <dso-icon icon=${button.icon}></dso-icon>
        </button>
      `
      : nothing}
  </dso-label>
`;

labelStories({
  module,
  storiesOf,
  readme,
  template
});
