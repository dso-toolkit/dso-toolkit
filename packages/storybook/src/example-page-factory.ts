import { storiesOfFactory } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';
import { TemplateResult } from 'lit-html';

import { templateContainer, Templates } from './templates';

export function examplePageFactory(
  location: string,
  name: string,
  storyTemplates: (templates: Templates, allTemplates: Templates) => TemplateResult
) {
  storiesOfFactory(
    `Voorbeeldpagina's/${location}/${name}`,
    {
      parameters: {
        module,
        readme: '',
        storiesOf
      },
      storyTemplates,
      templateContainer
    },
    (stories, templateMapper) => {
      stories
        .addParameters({
          layout: 'fullscreen'
        })
        .add(name, templateMapper((_args, storyTemplates) => storyTemplates))
    }
  );
}
