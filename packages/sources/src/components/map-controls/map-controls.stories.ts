import { ArgsStoryFn } from '@storybook/addons';
import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { mapControlsArgsMapper, mapControlsArgTypes } from './map-controls.args';
import { baseLayers, overlays, selectedBaseLayer } from './map-controls.content';
import { MapControls } from './map-controls.models';

export interface MapControlsParameters<TemplateFnReturnType> {
  mapControlsTemplate: (mapControlsProperties: MapControls) => TemplateFnReturnType;
  decorator: (story: ArgsStoryFn<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function storiesOfMapControls<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    mapControlsTemplate,
    decorator
  }: MapControlsParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(mapControlsArgsMapper, mapControlsTemplate);

  const stories = storiesOf('Map Controls', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      args: {
        open: false,
        baseLayers,
        selectedBaseLayer,
        overlays
      },
      argTypes: mapControlsArgTypes,
      html: {
        root: '#map-container-mock'
      }
    })
    // @ts-ignore Incorrect typings in Storybook
    .addDecorator(decorator);

  stories.add(
    'Map Controls',
    template
  );
}
