import { Component, ComponentInterface, Element, Event, EventEmitter, h, Prop } from "@stencil/core";
import { v4 as uuidv4 } from "uuid";

import { i18n } from "../../utils/i18n";

import { SelectableChangeEvent } from "../selectable/selectable.interfaces";
import { Overlay, OverlayChangeEvent } from "./map-overlays.interfaces";
import { translations } from "./map-overlays.i18n";

@Component({
  tag: "dso-map-overlays",
  styleUrl: "./map-overlays.scss",
  shadow: true,
})
export class MapOverlays implements ComponentInterface {
  private previousOverlays: Overlay[] | undefined;
  private selectableRefs: { [id: number]: HTMLDsoSelectableElement } = {};

  @Element()
  host!: HTMLDsoMapOverlaysElement;

  /**
   * To group the overlays together. Generally the default value suffices.
   */
  @Prop()
  group = uuidv4();

  /**
   * The overlays.
   */
  @Prop()
  overlays!: Overlay[];

  /**
   * Emitted when the user selects a different overlay.
   */
  @Event()
  dsoToggleOverlay!: EventEmitter<OverlayChangeEvent>;

  private overlayChangeHandler(overlay: Overlay, e: CustomEvent<SelectableChangeEvent>) {
    const { checked } = e.detail;

    this.dsoToggleOverlay.emit({ overlay, checked });
  }

  private text = i18n(() => this.host, translations);

  componentDidRender() {
    this.overlays
      .filter((o) => !o.disabled && this.previousOverlays?.find((p) => p.id === o.id)?.disabled === true)
      .forEach((o) => {
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
            {this.text("title")}
          </span>
        </div>
        <div class="dso-field-container">
          {this.overlays.map((overlay) => (
            <dso-selectable
              key={overlay.id}
              type="checkbox"
              value={overlay.name}
              checked={overlay.checked}
              disabled={overlay.disabled}
              name={this.group}
              ref={(ref) => ref && (this.selectableRefs[overlay.id] = ref)}
              onDsoChange={(e) => this.overlayChangeHandler(overlay, e)}
            >
              {overlay.name}
              {overlay.info ? <p slot="info">{overlay.info}</p> : null}
            </dso-selectable>
          ))}
        </div>
      </fieldset>
    );
  }
}
