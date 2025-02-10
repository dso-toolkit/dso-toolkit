import { Component, ComponentInterface, Element, Event, EventEmitter, h, Prop } from "@stencil/core";
import clsx from "clsx";
import { i18n } from "../../utils/i18n";

import { translations } from "./panel.i18n";

export interface PanelCloseEvent {
  originalEvent: Event;
}

/**
 * @slot - The contents to be highlighted within the panel
 * @slot heading - The heading (h2 - h6) with the title of the panel
 */
@Component({
  tag: "dso-panel",
  styleUrl: "panel.scss",
  shadow: true,
})
export class Panel implements ComponentInterface {
  @Element()
  host!: HTMLDsoPanelElement;

  /**
   * The accessible name for the close button.
   */
  @Prop()
  closeButtonLabel?: string;

  /**
   * To display the panel as an emphasized panel.
   */
  @Prop()
  emphasized = false;

  /**
   * Emitted when the user click the close button.
   */
  @Event()
  dsoCloseClick!: EventEmitter<PanelCloseEvent>;

  private text = i18n(() => this.host, translations);

  render() {
    return (
      <div class={clsx(["dso-panel", { emphasized: this.emphasized }])}>
        <div class="panel-heading">
          <slot name="heading" />
          <button type="button" class="panel-close" onClick={(e) => this.dsoCloseClick.emit({ originalEvent: e })}>
            <dso-icon icon="times"></dso-icon>
            <span class="sr-only">{this.closeButtonLabel || this.text("close")}</span>
          </button>
        </div>
        <div class="panel-body">
          <slot></slot>
        </div>
      </div>
    );
  }
}
