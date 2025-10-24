import { Component, Element, Event, EventEmitter, Host, Method, Prop, State, h } from "@stencil/core";

import { toggletip } from "../../functional-components/tooltip/toggletip.function";
import { Tooltip } from "../../functional-components/tooltip/tooltip.functional-component";

import { InfoButtonToggleEvent } from "./info-button.interfaces";

@Component({
  tag: "dso-info-button",
  shadow: true,
  styleUrl: "info-button.scss",
})
export class InfoButton {
  private button: HTMLDsoIconButtonElement | undefined;
  private buttonSecondary?: HTMLButtonElement;
  private toggletip: HTMLElement | undefined;
  private toggletipArrow: HTMLElement | undefined;

  @Element()
  host!: HTMLDsoInfoButtonElement;

  /**
   * Whether the InfoButton is active.
   */
  @Prop({ mutable: true, reflect: true })
  active?: boolean;

  @State()
  hover = false;

  /**
   * For secondary Info Button.
   */
  @Prop()
  secondary?: boolean;

  /**
   * The label.
   */
  @Prop()
  label = "Toelichting bij optie";

  /**
   * Emitted when the user activates the Info Button.
   */
  @Event()
  dsoToggle!: EventEmitter<InfoButtonToggleEvent>;

  /**
   * To set focus to the toggle button.
   */
  @Method()
  async setFocus() {
    this.button?.setFocus();
    this.buttonSecondary?.focus();
  }

  @State()
  showToggletip = false;

  private handleToggle(originalEvent: MouseEvent) {
    if (this.toggletipSlottedElement) {
      this.click();
    } else {
      this.active = !this.active;
      this.dsoToggle.emit({ originalEvent, active: this.active });
    }
  }

  private click = () => {
    if (this.active) {
      this.close();
    } else {
      this.open();
    }
  };

  private open = () => {
    this.active = true;
    this.host.addEventListener("keydown", this.keyDownListener);
    this.host.addEventListener("focusout", this.focusOutListener);
  };

  private close = () => {
    this.host.removeEventListener("focusout", this.focusOutListener);
    this.host.removeEventListener("keydown", this.keyDownListener);
    this.active = false;
  };

  private focusOutListener = (event: FocusEvent) => {
    if (!this.host.contains(event.relatedTarget as Node)) {
      this.close();
    }
  };

  private keyDownListener = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      this.close();
    }

    return;
  };

  get toggletipSlottedElement() {
    return this.host.querySelector("[slot='toggletip']");
  }

  componentDidRender() {
    if (this.toggletipSlottedElement) {
      this.showToggletip = toggletip(
        this.button,
        this.toggletip,
        this.toggletipArrow,
        !!this.active,
        this.showToggletip,
      );
    }
  }

  render() {
    return (
      <Host onMouseenter={() => (this.hover = true)} onMouseleave={() => (this.hover = false)}>
        {!this.secondary ? (
          <dso-icon-button
            variant="tertiary"
            label={this.label}
            onDsoClick={(e) => this.handleToggle(e.detail.originalEvent)}
            icon={this.active || this.hover ? "info-active" : "info"}
            ref={(element) => (this.button = element)}
          />
        ) : (
          // ToDo: remove this part in https://github.com/dso-toolkit/dso-toolkit/issues/3350. Tertiary on color already working
          <button
            type="button"
            class="dso-info-secondary"
            aria-expanded={typeof this.active === "boolean" ? this.active.toString() : undefined}
            onClick={(e) => this.handleToggle(e)}
            ref={(element) => (this.buttonSecondary = element)}
          >
            <dso-icon icon={this.active || this.hover ? "info-active" : "info"}></dso-icon>
            <span class="sr-only">{this.label}</span>
          </button>
        )}
        {this.toggletipSlottedElement !== null && (
          <Tooltip
            tipElementRef={(element) => (this.toggletip = element)}
            tipArrowElementRef={(element) => (this.toggletipArrow = element)}
            visible
            onAfterHidden={() => {}}
          >
            <slot name="toggletip" />
          </Tooltip>
        )}
      </Host>
    );
  }
}
