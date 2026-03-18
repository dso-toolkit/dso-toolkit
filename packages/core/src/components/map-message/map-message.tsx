import { Component, ComponentInterface, Prop, State, h } from "@stencil/core";

import { IconAlias } from "../..";

const iconMap: Record<string, IconAlias> = {
  success: "status-success",
  error: "status-error",
};

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
  /**
   * Variant determines the icon and actions shown.
   */
  @Prop({ reflect: true })
  variant!: "success" | "error" | "instruction" | undefined;

  @State()
  hasActions = false;

  private handleActionsSlotChange = (event: Event) => {
    const target = event.target;
    if (target instanceof HTMLSlotElement) {
      this.hasActions = target.assignedElements().length > 0;
    }
  };

  render() {
    const iconName = this.variant ? iconMap[this.variant] : undefined;
    const role: "alert" | "status" = this.variant === "error" ? "alert" : "status";

    return (
      <div
        class={{
          "map-message-content": true,
          "has-icon": iconName !== undefined,
          "has-actions": this.hasActions,
        }}
        role={role}
        aria-atomic="true"
      >
        <div class="map-message-body">
          {iconName && <dso-icon class="map-message-icon" icon={iconName} aria-hidden="true" />}
          <span class="map-message-text">
            <slot name="message" />
          </span>
        </div>
        <slot name="actions" onSlotchange={this.handleActionsSlotChange} />
      </div>
    );
  }
}
