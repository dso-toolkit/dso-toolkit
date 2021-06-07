import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { highlightBoxArgsMapper, highlightBoxArgTypes } from './highlight-box.args';
import { HighlightBox } from './highlight-box.models';

export interface HighlightBoxParameters<TemplateFnReturnType> {
  highlightBoxTemplate: (highlightBoxProperties: HighlightBox<TemplateFnReturnType>) => TemplateFnReturnType;
  richContent: TemplateFnReturnType;
}

export function storiesOfHighlightBox<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    highlightBoxTemplate,
    richContent
  }: HighlightBoxParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(highlightBoxArgsMapper, highlightBoxTemplate);

  const stories = storiesOf('Highlight Box', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      args: {
        yellow: false,
        white: false,
        border: false,
        dropShadow: false,
        step: null,
        icon: null,
        richContent
      },
      argTypes: highlightBoxArgTypes
    });

  stories.add(
    'default',
    template
  );

  stories.add(
    'yellow',
    template,
    {
      args: {
        yellow: true
      }
    }
  );

  stories.add(
    'white with dropshadow',
    template,
    {
      args: {
        white: true,
        dropShadow: true
      }
    }
  );

  stories.add(
    'with border',
    template,
    {
      args: {
        border: true
      }
    }
  );

  stories.add(
    'with step',
    template,
    {
      args: {
        yellow: true,
        step: 2
      }
    }
  );

  stories.add(
    'with icon',
    template,
    {
      args: {
        yellow: true,
        icon: 'plus'
      }
    }
  );
}
