import { storiesOfLabel, LabelArgs, LabelTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

// @ts-ignore
import readme from './readme.md';

const template: LabelTemplateFn<TemplateResult> = ({ status, label, button, compact }: LabelArgs) => html`
  <dso-label
    status=${ifDefined(status)}
    @removeClick=${ifDefined(button?.onClick)}
    ?compact=${compact}
    ?removable=${button}
  >
    ${label}
  </dso-label>
`;

storiesOfLabel<TemplateResult>({
  module,
  storiesOf,
  readme,
  template
});
