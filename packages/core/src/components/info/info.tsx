import { Component, Event, EventEmitter, Fragment, Prop, Watch, h } from "@stencil/core";

import { InfoCloseEvent } from "./info.interfaces";

/**
 * @slot - The content to be displayed inside the info box.
 */
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
   * The accessible label of the close button. Make this specific, for example `Sluit toelichting [label]`.
   */
  @Prop()
  closeLabel = "Sluiten";

  /**
   * Emitted when the user activates the close button.
   *
   * `previousActiveElement` contains the element that had focus when the Info was activated. Use it to return focus
   * after closing the Info.
   */
  @Event()
  dsoClose!: EventEmitter<InfoCloseEvent>;

  private previousActiveElement?: HTMLElement;

  @Watch("active")
  activeChanged(active?: boolean) {
    this.previousActiveElement = active ? getDeepActiveElement() : undefined;
  }

  componentWillLoad() {
    this.activeChanged(this.active);
  }

  render() {
    return (
      <Fragment>
        <slot></slot>
        {!this.fixed && (
          <dso-icon-button
            label={this.closeLabel}
            variant="tertiary"
            icon="cross"
            onDsoClick={(e) =>
              this.dsoClose.emit({
                originalEvent: e.detail.originalEvent,
                previousActiveElement: this.previousActiveElement,
              })
            }
          />
        )}
      </Fragment>
    );
  }
}

function getDeepActiveElement(): HTMLElement | undefined {
  let activeElement = document.activeElement;

  while (activeElement?.shadowRoot?.activeElement) {
    activeElement = activeElement.shadowRoot.activeElement;
  }

  return activeElement instanceof HTMLElement && activeElement !== document.body ? activeElement : undefined;
}
