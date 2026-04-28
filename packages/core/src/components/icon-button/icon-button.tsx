import { Component, ComponentInterface, Event, EventEmitter, Method, Prop, h } from "@stencil/core";

import { positionTooltip } from "../../functional-components/tooltip/position-tooltip.function";
import { Tooltip } from "../../functional-components/tooltip/tooltip.functional-component";
import { TooltipClean, TooltipPlacement } from "../../functional-components/tooltip/tooltip.interfaces";
import { IconAlias } from "../icon/icon.interfaces";

import { IconButtonClickEvent, IconButtonVariant } from "./icon-button.interfaces";

@Component({
  tag: "dso-icon-button",
  styleUrl: "icon-button.scss",
  shadow: true,
})
export class IconButton implements ComponentInterface {
  private buttonElRef?: HTMLButtonElement;
  private tooltipElRef?: HTMLDivElement;
  private tooltipArrowElRef?: HTMLSpanElement;
  private tooltipTimeout?: number;
  private cleanUpFunction: TooltipClean | undefined;
  private lastClickTime = 0;
  private tooltipShowDelay = 500;

  /**
   * The alias of the icon in the button.
   */
  @Prop({ reflect: true })
  icon!: IconAlias | undefined;

  /**
   * The label of the Icon Button which is shown on hover in a tooltip.
   */
  @Prop({ reflect: true })
  label!: string | undefined;

  /**
   * The variant of the Icon Button.
   */
  @Prop({ reflect: true })
  variant?: IconButtonVariant = "secondary";

  /**
   * The placement of the tooltip on hover and focus of the Icon Button.
   */
  @Prop({ reflect: true })
  tooltipPlacement: TooltipPlacement = "top";

  /**
   * To disable the Icon Button
   */
  @Prop({ reflect: true })
  disabled = false;

  /**
   * Emitted when the user clicks the Icon Button.
   */
  @Event({ bubbles: false })
  dsoClick!: EventEmitter<IconButtonClickEvent>;

  /**
   * Focuses the button.
   */
  @Method()
  async setFocus() {
    this.buttonElRef?.focus();
  }

  private handleShowTooltip = () => {
    if (this.disabled) {
      return;
    }

    // Don't show the tooltip if the button is clicked within 500ms of the last click
    if (Date.now() - this.lastClickTime < this.tooltipShowDelay) {
      return;
    }

    this.clearToolTipTimeout();

    this.tooltipTimeout = window.setTimeout(() => {
      if (!this.tooltipElRef?.isConnected) {
        return;
      }

      this.tooltipElRef?.showPopover();

      if (!this.cleanUpFunction && this.buttonElRef && this.tooltipElRef && this.tooltipArrowElRef) {
        this.cleanUpFunction = positionTooltip({
          referenceElement: this.buttonElRef,
          tipRef: this.tooltipElRef,
          tipArrowRef: this.tooltipArrowElRef,
          placementTip: this.tooltipPlacement,
          topPositionSmallViewPort: false,
          halfMainAxisOffset: false,
          forceVisible: true,
        });
      }
    }, this.tooltipShowDelay);
  };

  private cleanUpTooltip() {
    this.cleanUpFunction?.();
    this.cleanUpFunction = undefined;
  }

  disconnectedCallback() {
    this.clearToolTipTimeout();

    this.cleanUpTooltip();
  }

  private clearToolTipTimeout = () => {
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
    }
  };

  private handleHideTooltip = () => {
    this.clearToolTipTimeout();

    if (this.tooltipElRef?.isConnected && this.tooltipElRef.matches(":popover-open")) {
      this.tooltipElRef.hidePopover();
    }

    this.cleanUpTooltip();
  };

  private handleClick = (e: MouseEvent) => {
    this.lastClickTime = Date.now();
    this.handleHideTooltip();
    this.dsoClick.emit({ originalEvent: e });
  };

  render() {
    return (
      <button
        ref={(el) => (this.buttonElRef = el)}
        type="button"
        disabled={this.disabled}
        aria-label={this.label}
        class={`icon-button dso-${this.variant}`}
        onMouseEnter={this.handleShowTooltip}
        onMouseLeave={this.handleHideTooltip}
        onFocus={this.handleShowTooltip}
        onBlur={this.handleHideTooltip}
        onClick={this.handleClick}
      >
        <dso-icon icon={this.icon} />
        <Tooltip
          tipElementRef={(element) => (this.tooltipElRef = element)}
          tipArrowElementRef={(element) => (this.tooltipArrowElRef = element)}
        >
          {this.label}
        </Tooltip>
      </button>
    );
  }
}
