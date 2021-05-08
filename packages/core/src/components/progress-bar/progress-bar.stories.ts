import { progressBarStories } from '@dso-toolkit/stories';
import { ArgsStoryFn } from '@storybook/addons';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

// @ts-ignore
import readme from './readme.md';

const template: ArgsStoryFn<TemplateResult> = ({ progress, label, min, max }: any) => html`
  <dso-progress-bar
    progress=${progress}
    min=${ifDefined(min || undefined)}
    max=${ifDefined(max || undefined)}
  >${label ?? ''}</dso-progress-bar>
`;

progressBarStories({
  module,
  storiesOf,
  readme,
  template
});
