import { storiesOfProgressBar, ProgressBarArgs, ProgressBarTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';

// @ts-ignore
import readme from './readme.md';

const template: ProgressBarTemplateFn<TemplateResult> = ({ progress, label, min, max }: ProgressBarArgs) => html`
  <div class="progress">
    <div
      class="progress-bar"
      role="progressbar"
      aria-valuenow="${Math.round(progress / (max || 100) * 100)}"
      aria-valuemin="${min || 0}"
      aria-valuemax="${max || 100}"
      style="width: ${Math.round(progress / (max || 100) * 100)}%"
    >
      <span>
        ${label ?? ''}
      </span>
    </div>
  </div>
`;

storiesOfProgressBar<TemplateResult>({
  module,
  storiesOf,
  readme,
  template
});
