import { Component, h, Prop, Event, EventEmitter, ComponentInterface } from "@stencil/core";
import { v4 as uuidv4 } from "uuid";

import { BaseLayer, BaseLayerChangeEvent } from "./map-base-layers.interfaces";

@Component({
  tag: "dso-map-base-layers",
  styleUrl: "./map-base-layers.scss",
  shadow: true,
})
export class MapBaseLayers implements ComponentInterface {
  previousBaselayers: BaseLayer[] | undefined;
  selectableRefs: { [id: number]: HTMLDsoSelectableElement } = {};

  @Event()
  dsoBaseLayerChange!: EventEmitter<BaseLayerChangeEvent>;

  @Prop()
  group = uuidv4();

  @Prop()
  baseLayers!: BaseLayer[];

  baseLayerChangeHandler(baseLayer: BaseLayer): void {
    this.dsoBaseLayerChange.emit({ activeBaseLayer: baseLayer });
  }

  componentDidRender() {
    this.baseLayers
      .filter((l) => !l.disabled && this.previousBaselayers?.find((p) => p.id === l.id)?.disabled === true)
      .forEach((o) => {
        this.selectableRefs[o.id]?.toggleInfo(false);
      });

    this.previousBaselayers = this.baseLayers;
  }

  render() {
    for (const ref in this.selectableRefs) {
      delete this.selectableRefs[ref];
    }

    return (
      <fieldset class="form-group dso-radios">
        <legend class="sr-only">Achtergrond</legend>
        <div class="dso-label-container">
          <span class="control-label" aria-hidden="true">
            Achtergrond
          </span>
        </div>
        <div class="dso-field-container">
          {this.baseLayers.map((baseLayer) => (
            <dso-selectable
              key={baseLayer.id}
              type="radio"
              value={baseLayer.name}
              checked={baseLayer.checked}
              disabled={baseLayer.disabled}
              name={this.group}
              ref={(ref) => ref && (this.selectableRefs[baseLayer.id] = ref)}
              onDsoChange={() => this.baseLayerChangeHandler(baseLayer)}
            >
              {baseLayer.name}
              {baseLayer.info ? <p slot="info">{baseLayer.info}</p> : null}
            </dso-selectable>
          ))}
        </div>
      </fieldset>
    );
  }
}
