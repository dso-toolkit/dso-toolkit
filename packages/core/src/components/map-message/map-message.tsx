import { Component, ComponentInterface, Element, Prop, h } from "@stencil/core";

/**
 * @slot message - The message content announced as status/alert text.
 * @slot actions - Optional action controls shown for success and error variants.
 */
@Component({
  tag: "dso-map-message",
  styleUrl: "map-message.scss",
  shadow: true,
})

export class MapMessage implements ComponentInterface {
  @Element()
  host!: HTMLDsoMapMessageElement;

  /**
   * Variant determines the icon and actions shown.
   * Default is "instruction".
   */
  @Prop({ reflect: true })
  variant!: "success" | "error" | "instruction";

  private get messageSlottedElement() {
    return this.host.querySelector("[slot='message']");
  }

  private get actionsSlottedElement() {
    return this.host.querySelector("[slot='actions']");
  }

  render() {
    const isError = this.variant === "error";
    const liveRole = isError ? "alert" : "status";

    const hasMessageSlot = this.messageSlottedElement !== null;
    const hasActionsSlot = this.actionsSlottedElement !== null;
    const hasActions = this.variant !== "instruction" && hasActionsSlot;

    return (
      <dso-highlight-box>
        <div
          class={`map-message-content variant-${this.variant}${hasActions ? " has-actions" : ""}`}
          role={hasMessageSlot ? liveRole : undefined}
          aria-atomic={hasMessageSlot ? "true" : undefined}
        >
          <div class="map-message-body">
            {this.variant !== "instruction" && (
              <dso-icon class="map-message-icon" icon={`status-${this.variant}`} aria-hidden="true"></dso-icon>
            )}
            {hasMessageSlot && (
              <span class="map-message-text">
                <slot name="message"></slot>
              </span>
            )}
          </div>
          {hasActions && <slot name="actions"></slot>}
        </div>
      </dso-highlight-box>
    );
  }
}
