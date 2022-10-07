import { DecoratorFunction } from '@storybook/addons';
import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { mapControlsArgsMapper, mapControlsArgTypes, MapControlsArgs } from './map-controls.args';
import { baseLayers, overlays } from './map-controls.content';
import { MapControls } from './map-controls.models';

export interface MapControlsTemplates<TemplateFnReturnType> {
  mapControlsTemplate: (mapControlsProperties: MapControls) => TemplateFnReturnType;
  decorator: DecoratorFunction<TemplateFnReturnType>;
}

export const storiesOfMapControls = storiesOfFactory<MapControlsTemplates<any>, MapControlsArgs>('Map Controls', (stories, templateMapper) => {
  stories
    .addParameters({
      argTypes: mapControlsArgTypes,
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
    // .addDecorator(decorator);

  stories.add(
    'Map Controls',
    templateMapper((args, { mapControlsTemplate }) => mapControlsTemplate(mapControlsArgsMapper(args)))
  );
});
