import { ArgsStoryFn } from '@storybook/addons';
import { action } from '@storybook/addon-actions';

import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';

// @ts-ignore
import readme from './readme.md';
import { Overlay } from '../map-overlays/map-overlays';

/**
 * Storybook's control type "check" (possibly other enum typed controls as well) return (undefined | string[] | T), the component that's
 * being storied can't handle that
 * @param checked
 * Storybook input.
 *
 * @param items
 * Array to map from.
 *
 * @param selector
 * Identifier function to map Storybook values with.
 *
 * @returns
 * New array with original values from `items`.
 */
function checkFix<T>(
  checked: T | string[] | undefined,
  items: T[],
  selector: (value: T) => string
): T[] {
  if (checked === undefined) {
    return [];
  }

  if (Array.isArray(checked)) {
    return checked
      .map(id => items.find(i => selector(i) === id))
      .filter((item): item is T => !!item);
  }

  return [checked];
}

const template: ArgsStoryFn<TemplateResult> = ({ zoomIn, zoomOut, open, baseLayers, selectedBaseLayer, overlays, checkedOverlays }: any) => {
  return html`
    <div class="dsosb-map-container-mock" style="background-color: #efefef; height: 500px; position: relative; overflow: hidden">
      <dso-map-controls
        @zoomIn=${zoomIn}
        @zoomOut=${zoomOut}
        ?open=${open}
      >
        <form>
          <div class="rich-content">
            <p>Inhoud</p>
          </div>
          <dso-map-base-layers
            .baseLayers=${baseLayers}
            .selectedBaseLayer=${selectedBaseLayer}
            @baseLayerChange=${(e: CustomEvent) => action('baseLayerChange')(e.detail)}
          ></dso-map-base-layers>
          <dso-map-overlays
            .overlays=${overlays}
            .checkedOverlays=${checkFix<Overlay>(checkedOverlays, overlays, o => o.id)}
            @checkedOverlaysChange=${(e: CustomEvent) => action('checkedOverlaysChange')(e.detail)}
          ></dso-map-overlays>
          <div class="rich-content">
            <p>Ook nog meer inhoud</p>
          </div>
        </form>
      </dso-map-controls>
    </div>
  `;
};

const baseLayers = [{ id: 'kaart', label: 'Kaart' }, { id: 'luchtfoto', label: 'Luchtfoto' }];
const selectedBaseLayer = baseLayers[baseLayers.length - 1].id;
const overlays = [{ id: 'kadastrale-grenzen', label: 'Kadastrale grenzen' }, { id: 'bag', label: 'Basisregistratie Adressen en Gebouwen (BAG)' }];

const stories = storiesOf('Map Panel', module)
  .addParameters({
    docs: {
      page: readme
    },
    decorators: [],
    args: {
      open: false,
      baseLayers,
      selectedBaseLayer,
      overlays
    },
    argTypes: {
      open: {
        type: 'boolean'
      },
      zoomIn: {
        action: 'zoomIn'
      },
      zoomOut: {
        action: 'zoomOut'
      },
      baseLayers: {
        control: {
          disable: true
        }
      },
      selectedBaseLayer: {
        options: baseLayers.map(b => b.id),
        mapping: baseLayers.reduce((map, layer) => Object.assign(map, { [layer.id]: layer }), {}),
        control: {
          type: 'select'
        }
      },
      overlays: {
        control: {
          disable: true
        }
      },
      checkedOverlays: {
        options: overlays.map(o => o.id),
        mapping: overlays.reduce((map, overlay) => Object.assign(map, { [overlay.id]: overlay }), {}),
        control: {
          type: 'check'
        }
      }
    }
  });


stories.add(
  'Map Panel',
  template
);
