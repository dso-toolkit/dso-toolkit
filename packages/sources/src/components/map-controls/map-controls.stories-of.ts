import { DecoratorFunction } from '@storybook/addons';
import { bindTemplate, createStories, StorybookParameters } from '../../storybook';

import { mapControlsArgsMapper, mapControlsArgTypes } from './map-controls.args';
import { baseLayers, overlays } from './map-controls.content';
import { MapControls } from './map-controls.models';

export interface MapControlsParameters<TemplateFnReturnType> {
  mapControlsTemplate: (mapControlsProperties: MapControls) => TemplateFnReturnType;
  decorator: DecoratorFunction<TemplateFnReturnType>;
}

export function storiesOfMapControls<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    mapControlsTemplate,
    decorator
  }: MapControlsParameters<TemplateFnReturnType>
) {
  const stories = createStories('Map Controls', parameters, mapControlsArgTypes)
    .addParameters({
      args: {
        open: false,
        baseLayers,
        overlays
      },
      html: {
        root: '#map-container-mock'
      },
      layout: 'fullscreen'
    })
    .addDecorator(decorator);

  const template = bindTemplate(mapControlsArgsMapper, mapControlsTemplate);

  stories.add(
    'Map Controls',
    template
  );
}
