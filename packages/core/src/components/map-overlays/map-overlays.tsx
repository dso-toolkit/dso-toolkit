import { Component, Event, EventEmitter, Prop, h, ComponentInterface } from '@stencil/core';
import { v4 as uuidv4 } from 'uuid';

import { Overlay, OverlayChangeEvent } from './map-overlays.interfaces';

import { SelectableChangeEvent } from '../selectable/selectable';

@Component({
  tag: 'dso-map-overlays',
  styleUrl: './map-overlays.scss',
  shadow: true
})
export class MapOverlays implements ComponentInterface {
  previousOverlays: Overlay[] | undefined;
  selectableRefs: { [id: number]: HTMLDsoSelectableElement } = {};

  @Prop()
  group = uuidv4();

  @Prop()
  overlays!: Overlay[];

  @Event()
  dsoToggleOverlay!: EventEmitter<OverlayChangeEvent>;

  overlayChangeHandler(overlay: Overlay, e: CustomEvent<SelectableChangeEvent>) {
    const checked = e.detail.target instanceof HTMLInputElement ? !!e.detail.target.checked : false;

    this.dsoToggleOverlay.emit({ overlay, checked });
  }

  componentDidRender() {
    this.overlays
      .filter(o => !o.disabled && this.previousOverlays?.find(p => p.id === o.id)?.disabled === true)
      .forEach(o => {
        this.selectableRefs[o.id]?.toggleInfo(false);
      });

    this.previousOverlays = this.overlays;
  }

  render() {
    for (const ref in this.selectableRefs) {
      delete this.selectableRefs[ref];
    }

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
              key={overlay.id}
              type="checkbox"
              value={overlay.name}
              checked={overlay.checked}
              disabled={overlay.disabled}
              name={this.group}
              ref={ref => this.selectableRefs[overlay.id] = ref!}
              onDsoChange={e => this.overlayChangeHandler(overlay, e)}
            >
              {overlay.name}
              {overlay.info
                ? <p slot="info">{overlay.info}</p>
                : null
              }
            </dso-selectable>
          ))}
        </div>
      </fieldset>
    );
  }
}
