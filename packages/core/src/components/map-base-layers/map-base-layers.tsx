import { Component, ComponentInterface, Element, Event, EventEmitter, h, Prop } from "@stencil/core";
import { v4 as uuidv4 } from "uuid";
import { i18n } from "i18next";

import { dtI18n } from "../../utils/i18n";

import { BaseLayer, BaseLayerChangeEvent } from "./map-base-layers.interfaces";
import { translations } from "./map-base-layers.i18n";

@Component({
  tag: "dso-map-base-layers",
  styleUrl: "./map-base-layers.scss",
  shadow: true,
})
export class MapBaseLayers implements ComponentInterface {
  private previousBaselayers: BaseLayer[] | undefined;
  private selectableRefs: { [id: number]: HTMLDsoSelectableElement } = {};

  @Element()
  host!: HTMLDsoMapBaseLayersElement;

  /**
   * Emitted when the user checks or unchecks a base layer.
   */
  @Event()
  dsoBaseLayerChange!: EventEmitter<BaseLayerChangeEvent>;

  /**
   * To group the overlays together. Generally the default value suffices.
   */
  @Prop()
  group = uuidv4();

  /**
   * The base layers.
   */
  @Prop()
  baseLayers!: BaseLayer[];

  private baseLayerChangeHandler(baseLayer: BaseLayer): void {
    this.dsoBaseLayerChange.emit({ activeBaseLayer: baseLayer });
  }

  private i18nInstance: i18n | undefined;

  async componentWillLoad() {
    this.i18nInstance = await dtI18n(this.host, translations);
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
            {this.i18nInstance?.t("background")}
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
