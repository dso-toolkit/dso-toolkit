import { Component, Event, EventEmitter, Fragment, Prop, h } from "@stencil/core";

@Component({
  tag: "dso-info",
  styleUrl: "./info.scss",
  shadow: true,
})
export class Info {
  /**
   * Set to true if the Info should not be toggled and always visible.
   */
  @Prop({ reflect: true })
  fixed?: boolean;

  /**
   * Whether the Info is active.
   */
  @Prop({ reflect: true })
  active?: boolean;

  /**
   * Emitted when the user activates the close button.
   */
  @Event()
  dsoClose!: EventEmitter<MouseEvent>;

  render() {
    return (
      <Fragment>
        <slot></slot>
        {!this.fixed && (
          <button type="button" onClick={(e) => this.dsoClose.emit(e)}>
            <dso-icon icon="times"></dso-icon>
            <span class="sr-only">Sluiten</span>
          </button>
        )}
      </Fragment>
    );
  }
}
