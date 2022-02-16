import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

import { Overlay, OverlayChangeEvent } from './map-overlays.interfaces';

import { SelectableChangeEvent } from '../selectable/selectable';

@Component({
  tag: 'dso-map-overlays',
  styleUrl: './map-overlays.scss',
  shadow: true
})
export class MapOverlays {
  @Prop()
  overlays!: Overlay[];

  @Event()
  toggleOverlay!: EventEmitter<OverlayChangeEvent>;

  overlayChangeHandler(overlay: Overlay, e: CustomEvent<SelectableChangeEvent>) {
    const checked = e.detail.target instanceof HTMLInputElement ? !!e.detail.target.checked : false;

    this.toggleOverlay.emit({ overlay, checked });
  }

  render() {
    return (
      <fieldset class="form-group dso-checkboxes">
        <legend class="sr-only">Kaartlagen</legend>
        <div class="dso-label-container">
          <span class="control-label" aria-hidden="true">
            Kaartlagen
        </span>
        </div>
        <div class="dso-field-container">
          {this.overlays.map(overlay => (
            <dso-selectable
              type="checkbox"
              value={overlay.name}
              checked={overlay.checked}
              disabled={overlay.disabled}
              onDsoChange={e => this.overlayChangeHandler(overlay, e)}
            >
              {overlay.name}
            </dso-selectable>
          ))}
        </div>
      </fieldset>
    );
  }
}
