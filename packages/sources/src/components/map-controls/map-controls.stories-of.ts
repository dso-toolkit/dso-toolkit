import { DecoratorFunction } from '@storybook/addons';
import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { mapControlsArgsMapper, mapControlsArgTypes, MapControlsArgs } from './map-controls.args';
import { baseLayers, overlays } from './map-controls.content';
import { MapControls } from './map-controls.models';

export interface MapControlsTemplates<TemplateFnReturnType> {
  mapControlsTemplate: (mapControlsProperties: MapControls) => TemplateFnReturnType;
}

export interface MapControlsParameters<TemplateFnReturnType> {
  decorator: DecoratorFunction<TemplateFnReturnType>;
}

export const storiesOfMapControls = storiesOfFactory<MapControlsTemplates<any>, MapControlsArgs, MapControlsParameters<any>>('Map Controls', (stories, templateMapper, { decorator }) => {
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
    .addDecorator(decorator);

  stories.add(
    'Map Controls',
    templateMapper((args, { mapControlsTemplate }) => mapControlsTemplate(mapControlsArgsMapper(args)))
  );
});
