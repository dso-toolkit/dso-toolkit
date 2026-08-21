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

  // Een screenreader leest alleen wijzigingen voor binnen een live region die al in de
  // accessibility tree staat. Dit component komt samen met zijn melding de DOM in, dus
  // rendert de region eerst leeg en volgt de melding daarna.
  @State()
  showMessage = false;

  private animationFrame?: number;

  connectedCallback() {
    this.showMessage = false;
  }

  componentDidRender() {
    if (!this.showMessage && this.animationFrame === undefined) {
      // De browser werkt de accessibility tree gebatcht bij; vallen lege region en melding in
      // dezelfde batch, dan blijft de screenreader stil. Eén render-tick afstand bleek te kort
      // (NVDA, #3943); twee animatieframes is de kleinste afstand die betrouwbaar werkt.
      this.animationFrame = requestAnimationFrame(() => {
        this.animationFrame = requestAnimationFrame(() => {
          this.animationFrame = undefined;
          this.showMessage = true;
        });
      });
    }
  }

  disconnectedCallback() {
    if (this.animationFrame !== undefined) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = undefined;
    }
  }

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
      >
        <div class="map-message-body" role={role} aria-atomic="true">
          {iconName && <dso-icon class="map-message-icon" icon={iconName} aria-hidden="true" />}
          <span class="map-message-text">{this.showMessage && <slot name="message" />}</span>
        </div>
        <slot name="actions" onSlotchange={this.handleActionsSlotChange} />
      </div>
    );
  }
}
