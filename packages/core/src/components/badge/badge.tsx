import { Component, ComponentInterface, Element, Host, Prop, State, h } from "@stencil/core";
import { clsx } from "clsx";

import { ToggletipController } from "../../functional-components/tooltip/toggletip.controller";
import { TooltipController } from "../../functional-components/tooltip/tooltip.controller";
import { Tooltip } from "../../functional-components/tooltip/tooltip.functional-component";
import { TooltipPlacement } from "../../functional-components/tooltip/tooltip.interfaces";

import { BadgeStatus } from "./badge.interfaces";

/**
 * @slot - The message inside the badge.
 * @slot toggletip - An optional slot to place `Rich Content` in. When present the badge will be interactive (a
 * button) and toggles a Tooltip with information.
 */
@Component({
  tag: "dso-badge",
  styleUrl: "badge.scss",
  shadow: true,
})
export class Badge implements ComponentInterface {
  private buttonElRef?: HTMLButtonElement;
  private tooltipElRef?: HTMLDivElement;
  private tooltipArrowElRef?: HTMLSpanElement;
  private toggletipElRef?: HTMLDivElement;
  private toggletipArrowElRef?: HTMLSpanElement;
  private mutationObserver?: MutationObserver;
  private restrictContentElement?: HTMLElement;

  private tooltipController = new TooltipController({
    getReferenceElement: () => this.buttonElRef,
    getTipElement: () => this.tooltipElRef,
    getTipArrowElement: () => this.tooltipArrowElRef,
    getPlacement: () => "top",
    showDelay: 500,
    respectClickDelay: true,
  });

  private toggletipController = new ToggletipController({
    getReferenceElement: () => this.buttonElRef,
    getTipElement: () => this.toggletipElRef,
    getTipArrowElement: () => this.toggletipArrowElRef,
    getRestrictContentElement: () => this.restrictContentElement,
    getPlacement: () => this.toggletipPlacement,
  });

  @Element()
  host!: HTMLDsoBadgeElement;

  /**
   * The status of the Badge.
   */
  @Prop({ reflect: true })
  status?: BadgeStatus;

  /**
   * The accessible name of the interactive Badge with Toggletip.
   */
  @Prop({ reflect: true })
  label?: string;

  /**
   * The placement of the toggletip on click of the interactive Badge with Toggletip.
   */
  @Prop({ reflect: true })
  toggletipPlacement: TooltipPlacement = "top";

  @State()
  toggletipActive = false;

  @State()
  hasToggletip = false;

  private handleToggle() {
    this.tooltipController.notifyClick();
    this.toggletipActive = !this.toggletipActive;
    this.handleHideTooltip();
  }

  private handleShowTooltip = () => {
    this.tooltipController.show();
  };

  private handleHideTooltip = () => {
    this.tooltipController.hide();
  };

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

  componentDidRender() {
    if (!this.hasToggletip) {
      this.tooltipController.hide();
      this.toggletipController.dispose();
      return;
    }

    this.toggletipController.update(this.toggletipActive);
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
    this.toggletipController.dispose();
    this.mutationObserver?.disconnect();

    delete this.mutationObserver;
  }

  render() {
    return (
      (this.hasToggletip && (
        <Host onKeyDown={this.keyDownHandler} onFocusout={this.focusOutHandler}>
          <button
            ref={(el) => (this.buttonElRef = el)}
            type="button"
            aria-label={this.label}
            class="toggletip-button"
            onMouseEnter={this.handleShowTooltip}
            onMouseLeave={this.handleHideTooltip}
            onFocus={this.handleShowTooltip}
            onBlur={this.handleHideTooltip}
            onClick={() => this.handleToggle()}
          >
            <span
              class={clsx(
                "dso-badge",
                "interactive",
                { [`badge-${this.status}`]: this.status },
                { toggled: this.toggletipActive },
              )}
            >
              <slot></slot>
            </span>
          </button>
          <Tooltip
            tipElementRef={(element) => (this.tooltipElRef = element)}
            tipArrowElementRef={(element) => (this.tooltipArrowElRef = element)}
          >
            {this.label}
          </Tooltip>
          <Tooltip
            tipElementRef={(element) => (this.toggletipElRef = element)}
            tipArrowElementRef={(element) => (this.toggletipArrowElRef = element)}
          >
            <dso-scrollable ref={(element) => (this.restrictContentElement = element)}>
              <slot name="toggletip" />
            </dso-scrollable>
          </Tooltip>
        </Host>
      )) ||
      (!this.hasToggletip && (
        <span class={clsx("dso-badge", { [`badge-${this.status}`]: this.status })}>
          <slot></slot>
        </span>
      ))
    );
  }
}
