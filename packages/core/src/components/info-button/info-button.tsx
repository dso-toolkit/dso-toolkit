import { Component, Element, Event, EventEmitter, Host, Method, Prop, State, h } from "@stencil/core";

import { toggletip } from "../../functional-components/tooltip/toggletip.function";
import { Tooltip } from "../../functional-components/tooltip/tooltip.functional-component";
import { TooltipPlacement } from "../../functional-components/tooltip/tooltip.interfaces";

import { InfoButtonToggleEvent } from "./info-button.interfaces";

@Component({
  tag: "dso-info-button",
  shadow: true,
  styleUrl: "info-button.scss",
})
export class InfoButton {
  private button?: HTMLDsoIconButtonElement;
  private buttonSecondary?: HTMLButtonElement;
  private toggletipElRef?: HTMLDivElement;
  private toggletipArrowElRef?: HTMLSpanElement;

  @Element()
  host!: HTMLDsoInfoButtonElement;

  /**
   * Whether the InfoButton is active.
   */
  @Prop({ mutable: true, reflect: true })
  active?: boolean;

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
   * The placement of the Toggle tip on click.
   */
  @Prop()
  toggletipPlacement: TooltipPlacement = "top";

  /**
   * Emitted when the user activates the Info Button.
   */
  @Event()
  dsoToggle!: EventEmitter<InfoButtonToggleEvent>;

  @State()
  hover = false;

  @State()
  showToggletip = false;

  private listenersAttached = false;

  /**
   * To set focus to the toggle button.
   */
  @Method()
  async setFocus() {
    if (this.secondary) {
      this.buttonSecondary?.focus();
    } else {
      this.button?.setFocus?.();
    }
  }

  private handleToggle(originalEvent: MouseEvent) {
    if (this.toggletipSlottedElement) {
      this.active = !this.active;
    } else {
      this.active = !this.active;
      this.dsoToggle.emit({ originalEvent, active: this.active });
    }
  }

  private focusOutListener = (event: FocusEvent) => {
    if (!this.host.contains(event.relatedTarget as Node)) {
      this.active = !this.active;
    }
  };

  private keyDownListener = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      this.active = !this.active;
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
        this.toggletipElRef,
        this.toggletipArrowElRef,
        !!this.active,
        this.showToggletip,
        `${this.toggletipPlacement}-start`,
      );

      // Eventlisteners alleen toevoegen als toggletip actief is
      if (this.active && !this.listenersAttached) {
        this.host.addEventListener("keydown", this.keyDownListener);
        this.host.addEventListener("focusout", this.focusOutListener);
        this.listenersAttached = true;
      }

      // Eventlisteners verwijderen als toggletip niet actief
      if (!this.active && this.listenersAttached) {
        this.host.removeEventListener("keydown", this.keyDownListener);
        this.host.removeEventListener("focusout", this.focusOutListener);
        this.listenersAttached = false;
      }
    } else if (this.listenersAttached) {
      // Als het slot leeg is, verwijder altijd de listeners
      this.host.removeEventListener("keydown", this.keyDownListener);
      this.host.removeEventListener("focusout", this.focusOutListener);
      this.listenersAttached = false;
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
            tipElementRef={(element) => (this.toggletipElRef = element)}
            tipArrowElementRef={(element) => (this.toggletipArrowElRef = element)}
            visible={this.showToggletip}
            onAfterHidden={() => {}}
          >
            <slot name="toggletip" />
          </Tooltip>
        )}
      </Host>
    );
  }
}
