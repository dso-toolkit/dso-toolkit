import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

import { Overlay } from './map-overlays.interfaces';

@Component({
  tag: 'dso-map-overlays',
  styleUrl: './map-overlays.scss',
  shadow: true
})
export class MapOverlays {
  @Prop()
  overlays!: Overlay[];

  @Prop({ mutable: true })
  checkedOverlays: Overlay[] = [];

  @Event()
  checkedOverlaysChange!: EventEmitter<Overlay[]>;

  toggleOverlay(overlay: Overlay, checked: boolean): void {
    this.checkedOverlays = checked
      ? [...this.checkedOverlays, overlay]
      : this.checkedOverlays.filter(o => o !== overlay);

    this.checkedOverlaysChange.emit(this.checkedOverlays);
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
              checked={this.checkedOverlays.includes(overlay)}
              onDsoChange={() => this.toggleOverlay(overlay, !this.checkedOverlays.includes(overlay))}
            >
              {overlay.name}
            </dso-selectable>
          ))}
        </div>
      </fieldset>
    );
  }
}
