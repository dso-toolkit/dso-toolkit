import { Component, Element, Event, EventEmitter, Host, Method, Prop, State, h } from "@stencil/core";

import { positionTooltip } from "../../functional-components/tooltip/position-tooltip.function";
import { Tooltip } from "../../functional-components/tooltip/tooltip.functional-component";
import { TooltipClean, TooltipPlacement } from "../../functional-components/tooltip/tooltip.interfaces";

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
  private cleanUp: TooltipClean | undefined;
  private mutationObserver?: MutationObserver;
  private restrictContentElement?: HTMLElement;

  @Element()
  host!: HTMLDsoInfoButtonElement;

  /**
   * Whether the InfoButton is active.
   */
  @Prop({ reflect: true })
  active = false;

  /**
   * For secondary Info Button.
   */
  @Prop()
  secondary?: boolean;

  /**
   * The label.
   */
  @Prop({ reflect: true })
  label = "Toelichting bij optie";

  /**
   * The placement of the Toggletip on click.
   */
  @Prop({ reflect: true })
  toggletipPlacement: TooltipPlacement = "top";

  /**
   * Emitted when the user activates the Info Button.
   */
  @Event()
  dsoToggle!: EventEmitter<InfoButtonToggleEvent>;

  @State()
  toggletipActive = false;

  @State()
  hasToggletip = false;

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
    if (this.hasToggletip) {
      this.toggletipActive = !this.toggletipActive;
    } else {
      this.dsoToggle.emit({ originalEvent, active: !this.active });
    }
  }

  private keyDownHandler = (event: KeyboardEvent) => {
    if (!this.toggletipActive) return;

    if (event.key === "Escape") {
      this.toggletipActive = false;
    }
  };

  private focusOutHandler = (event: FocusEvent) => {
    if (!this.host.contains(event.relatedTarget as Node)) {
      this.toggletipActive = false;
      this.toggletipElRef?.hidePopover();
    }
  };

  private cleanupTooltip() {
    this.cleanUp?.();
    this.cleanUp = undefined;
  }

  componentDidRender() {
    if (!this.hasToggletip) {
      this.toggletipElRef?.hidePopover();
      this.cleanupTooltip();
      return;
    }

    if (!this.cleanUp && this.toggletipActive && this.button && this.toggletipElRef && this.toggletipArrowElRef) {
      this.cleanUp = positionTooltip({
        referenceElement: this.button,
        tipRef: this.toggletipElRef,
        tipArrowRef: this.toggletipArrowElRef,
        placementTip: this.toggletipPlacement,
        restrictContentElement: this.restrictContentElement,
      });
    }

    if (this.cleanUp) {
      if (this.toggletipActive) {
        this.toggletipElRef?.showPopover();
      } else {
        this.toggletipElRef?.hidePopover();
        this.cleanupTooltip();
      }
    }
  }

  connectedCallback(): void {
    this.mutationObserver = new MutationObserver(() => {
      this.hasToggletip = !!this.host.querySelector("[slot='toggletip']");
    });

    this.mutationObserver.observe(this.host, {
      childList: true,
      attributes: true,
    });
  }

  disconnectedCallback() {
    this.cleanupTooltip();
    this.mutationObserver?.disconnect();

    delete this.mutationObserver;
  }

  render() {
    return (
      <Host onKeydown={this.keyDownHandler} onFocusout={this.focusOutHandler}>
        {!this.secondary ? (
          <dso-icon-button
            variant="tertiary"
            label={this.label}
            onDsoClick={(e) => this.handleToggle(e.detail.originalEvent)}
            icon={this.active || this.toggletipActive ? "info-active" : "info"}
            ref={(element) => (this.button = element)}
          />
        ) : (
          // ToDo: remove this part in https://github.com/dso-toolkit/dso-toolkit/issues/3350. Tertiary on color already working
          <button
            type="button"
            class="dso-info-secondary"
            aria-expanded={(this.active || this.toggletipActive).toString()}
            onClick={(e) => this.handleToggle(e)}
            ref={(element) => (this.buttonSecondary = element)}
          >
            <dso-icon icon={this.active || this.toggletipActive ? "info-active" : "info"}></dso-icon>
            <span class="sr-only">{this.label}</span>
          </button>
        )}
        {this.hasToggletip !== null && (
          <Tooltip
            tipElementRef={(element) => (this.toggletipElRef = element)}
            tipArrowElementRef={(element) => (this.toggletipArrowElRef = element)}
            visible={this.toggletipActive}
          >
            <dso-scrollable ref={(element) => (this.restrictContentElement = element)}>
              <slot name="toggletip" />
            </dso-scrollable>
          </Tooltip>
        )}
      </Host>
    );
  }
}
