import { storiesOfProgressBar, ProgressBarArgs, ProgressBarTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

// @ts-ignore
import readme from './readme.md';

const template: ProgressBarTemplateFn<TemplateResult> = ({ progress, label, min, max }: ProgressBarArgs) => html`
  <dso-progress-bar
    progress=${progress}
    min=${ifDefined(min || undefined)}
    max=${ifDefined(max || undefined)}
  >${label ?? ''}</dso-progress-bar>
`;

storiesOfProgressBar<TemplateResult>({
  module,
  storiesOf,
  readme,
  template
});
