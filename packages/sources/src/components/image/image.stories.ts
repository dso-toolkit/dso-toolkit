import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { imageArgsMapper, imageArgTypes } from './image.args';
import { Image } from './image.models';

export interface ImageParameters<TemplateFnReturnType> {
  imageTemplate: (imageProperties: Image) => TemplateFnReturnType;
}

export function storiesOfImage<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    imageTemplate: imageTemplate
  }: ImageParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(imageArgsMapper, imageTemplate);

  const stories = storiesOf('Image', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: imageArgTypes,
      args: {
        source: 'images/avatar.png',
        alt: 'Alternatieve tekst'
      }
    });

  stories.add(
    'default',
    template
  );

  stories.add(
    'responsive',
    template,
    {
      args: {
        modifier: 'img-responsive'
      }
    }
  );

  stories.add(
    'rounded',
    template,
    {
      args: {
        modifier: 'img-rounded'
      }
    }
  );

  stories.add(
    'circle',
    template,
    {
      args: {
        modifier: 'img-circle'
      }
    }
  );

  stories.add(
    'thumbnail',
    template,
    {
      args: {
        modifier: 'img-thumbnail'
      }
    }
  );
}
