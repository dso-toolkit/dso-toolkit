import { Component, ComponentInterface, Element, Prop, forceUpdate, h } from "@stencil/core";

@Component({
  tag: "dso-map-message",
  styleUrl: "map-message.scss",
  shadow: true,
})
/**
 * @slot message - The message content announced as status/alert text.
 * @slot actions - Optional action controls shown for success and error variants.
 */
export class MapMessage implements ComponentInterface {
  @Element()
  host!: HTMLDsoMapMessageElement;

  /**
   * Variant determines the icon and actions shown.
   * Default is "instruction".
   */
  @Prop({ reflect: true })
  variant: "success" | "error" | "instruction" = "instruction";

  private mutationObserver?: MutationObserver;

  connectedCallback(): void {
    this.mutationObserver = new MutationObserver(() => {
      forceUpdate(this.host);
      this.syncActionClasses();
    });

    this.mutationObserver.observe(this.host, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "variant", "slot"],
    });
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();

    delete this.mutationObserver;
  }

  componentDidLoad() {
    this.syncActionClasses();
  }

  componentDidRender() {
    this.syncActionClasses();
  }

  private syncActionClasses() {
    this.host.querySelectorAll<HTMLElement>("[slot='actions']").forEach((element) => {
      if (!(element instanceof HTMLElement)) {
        return;
      }

      const variant = element.getAttribute("variant");
      const isPrimary = element.classList.contains("dso-primary") || variant === "primary";
      const isSecondary = element.classList.contains("dso-secondary") || variant === "secondary";

      if (isPrimary) {
        element.classList.add("dso-primary");
        element.classList.remove("dso-secondary");
      } else if (isSecondary) {
        element.classList.add("dso-secondary");
        element.classList.remove("dso-primary");
      }
    });
  }

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
          class={`map-message-content variant-${this.variant} ${hasActions ? "has-actions" : ""}`}
          role={hasMessageSlot ? liveRole : undefined}
          aria-atomic={hasMessageSlot ? "true" : undefined}
        >
          <div class="map-message-body">
            {hasActions && this.variant !== "instruction" && (
              <dso-icon class="map-message-icon" icon={`status-${this.variant}`} aria-hidden="true"></dso-icon>
            )}
            {hasMessageSlot && (
              <span class="map-message-text">
                <slot name="message"></slot>
              </span>
            )}
          </div>
          {hasActions && hasActionsSlot && (
            <div class="map-message-actions">
              <slot name="actions"></slot>
            </div>
          )}
        </div>
      </dso-highlight-box>
    );
  }
}
