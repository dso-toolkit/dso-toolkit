import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

export interface Overlay {
  id: string;
  label: string;
}

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
            <div class="dso-selectable">
              <input
                type="checkbox"
                id={`dso-map-overlay-${overlay.id}`}
                name="dso-map-overlays"
                value={overlay.id}
                onInput={(e: any) => this.toggleOverlay(overlay, e.target!.checked)}
                checked={this.checkedOverlays.includes(overlay)}
              />
              <label htmlFor={`dso-map-overlay-${overlay.id}`}>
                {overlay.label}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    );
  }
}
