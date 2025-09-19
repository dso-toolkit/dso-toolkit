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
          <dso-icon-button
            accessibleLabel="Sluiten"
            variant="tertiary"
            icon="times"
            onDsoIconButtonClick={(e) => this.dsoClose.emit(e.detail.originalEvent)}
          />
        )}
      </Fragment>
    );
  }
}
