import { Component, ComponentInterface, Element, Fragment, Prop, h } from "@stencil/core";

import { IconAlias } from "../..";

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
   */
  @Prop({ reflect: true })
  variant!: "success" | "error" | "instruction" | undefined;

  private get messageSlottedElement(): Element | null {
    return this.host.querySelector('[slot="message"]');
  }

  private get actionsSlottedElement(): Element | null {
    return this.host.querySelector('[slot="actions"]');
  }

  render() {
    const hasMessageSlot = this.messageSlottedElement !== null;
    const hasActionsSlot = this.actionsSlottedElement !== null;
    const iconName =
      this.variant && this.variant !== "instruction" ? (`status-${this.variant}` as IconAlias) : undefined;
    const hasActions = iconName !== undefined && hasActionsSlot;
    const role: "alert" | "status" = this.variant === "error" ? "alert" : "status";

    return (
      <Fragment>
        <div
          class={{
            "map-message-content": true,
            "has-actions": hasActions,
          }}
          role={role}
          aria-atomic={hasMessageSlot ? "true" : undefined}
        >
          <div class="map-message-body">
            {iconName && <dso-icon class="map-message-icon" icon={iconName} aria-hidden="true" />}
            {hasMessageSlot && (
              <span class="map-message-text">
                <slot name="message" />
              </span>
            )}
          </div>
          {hasActions && <slot name="actions" />}
        </div>
      </Fragment>
    );
  }
}
