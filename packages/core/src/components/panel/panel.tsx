import { Component, ComponentInterface, Event, EventEmitter, h } from "@stencil/core";

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
  /**
   * Emitted when the user click the close button.
   */
  @Event()
  dsoCloseClick!: EventEmitter<MouseEvent>;

  render() {
    return (
      <div class="dso-panel">
        <div class="panel-heading">
          <slot name="heading" />
          <button type="button" class="panel-close" onClick={(e) => this.dsoCloseClick.emit(e)}>
            <dso-icon icon="times"></dso-icon>
            <span class="sr-only">Sluiten</span>
          </button>
        </div>
        <div class="panel-body">
          <slot></slot>
        </div>
      </div>
    );
  }
}
