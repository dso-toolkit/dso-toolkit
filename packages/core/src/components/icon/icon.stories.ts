import { iconStories } from '@dso-toolkit/stories';
import { ArgsStoryFn } from '@storybook/addons';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';

// @ts-ignore
import readme from './readme.md';

const template: ArgsStoryFn<TemplateResult> = ({ icon }: any) => html`
  <dso-icon icon=${icon}></dso-icon>
`;

iconStories({
  module,
  storiesOf,
  readme,
  template
});
