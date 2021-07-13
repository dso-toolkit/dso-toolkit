import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { anchorArgsMapper, anchorArgTypes } from './anchor.args';
import { Anchor } from './anchor.models';

export interface AnchorParameters<TemplateFnReturnType> {
  anchorTemplate: (anchorProperties: Anchor) => TemplateFnReturnType;
}

export function storiesOfAnchor<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    anchorTemplate
  }: AnchorParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(anchorArgsMapper, anchorTemplate);

  const stories = storiesOf('Anchor', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: anchorArgTypes
    });

  stories.add(
    'default',
    template,
    {
      args: {
        label: 'Home',
        url: '#'
      }
    }
  );

  stories.add(
    'download link',
    template,
    {
      args: {
        label: 'Download Afvalkalender 2017',
        url: 'afvalkalender.pdf',
        modifier: 'download'
      }
    }
  );

  stories.add(
    'external link',
    template,
    {
      args: {
        label: 'Een link naar Google',
        url: 'http://www.google.nl',
        modifier: 'extern'
      }
    }
  );

  stories.add(
    'link with icon',
    template,
    {
      args: {
        label: 'Product zoeken',
        url: '#',
        icon: 'search'
      }
    }
  );

  stories.add(
    'icon only',
    template,
    {
      args: {
        label: 'Product zoeken',
        url: '#',
        icon: 'search',
        iconMode: 'only'
      }
    }
  );
}
