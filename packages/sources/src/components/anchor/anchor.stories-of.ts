import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { AnchorArgs, anchorArgsMapper, anchorArgTypes } from './anchor.args';
import { Anchor } from './anchor.models';

export interface AnchorTemplates<TemplateFnReturnType> {
  anchorTemplate: (anchorProperties: Anchor) => TemplateFnReturnType;
}

export const storiesOfAnchor = storiesOfFactory<AnchorTemplates<any>, AnchorArgs>('Anchor', (stories, templateMapper) => {
  stories
    .addParameters({
      argTypes: anchorArgTypes
    });

  const template = templateMapper((args, { anchorTemplate }) => anchorTemplate(anchorArgsMapper(args)));

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
});
