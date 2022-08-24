import { bindTemplate, createStories, StorybookParameters } from '../../storybook';

import { imageArgsMapper, imageArgTypes } from './image.args';
import { Image } from './image.models';

export interface ImageParameters<TemplateFnReturnType> {
  imageTemplate: (imageProperties: Image) => TemplateFnReturnType;
}

export function storiesOfImage<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    imageTemplate
  }: ImageParameters<TemplateFnReturnType>
) {
  const stories = createStories('Image', parameters, imageArgTypes)
    .addParameters({
      args: {
        source: 'images/sneeuwpop.png',
        alt: 'Afbeelding van een sneeuwpop'
      }
    });

  const template = bindTemplate(imageArgsMapper, imageTemplate);

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
    'circle',
    template,
    {
      args: {
        modifier: 'img-circle'
      }
    }
  );
}
