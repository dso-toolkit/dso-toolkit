import { storiesOfMapControls } from '@dso-toolkit/sources';
import { DecoratorFunction } from '@storybook/addons';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';

import { mapControlsTemplate } from './map-controls.template';
import readme from './readme.md';

const decorator: DecoratorFunction<TemplateResult> = story => html`
  <div id="map-container-mock" style="background-color: #efefef; height: 500px; position: relative; overflow: hidden;">
    ${story()}
  </div>
  `

storiesOfMapControls(
  {
    module,
    storiesOf,
    readme
  },
  {
    mapControlsTemplate,
    decorator
  }
);
