import { Component, ComponentInterface, Event, EventEmitter, Method, Prop, State, h } from "@stencil/core";

import { positionTooltip } from "../../functional-components/tooltip/position-tooltip.function";
import { Tooltip } from "../../functional-components/tooltip/tooltip.functional-component";
import { TooltipClean, TooltipPlacement } from "../../functional-components/tooltip/tooltip.interfaces";

import { IconButtonClickEvent, IconButtonVariant } from "./icon-button.interfaces";

@Component({
  tag: "dso-icon-button",
  styleUrl: "icon-button.scss",
  shadow: true,
})
export class IconButton implements ComponentInterface {
  /**
   * The alias of the icon in the button.
   */
  @Prop({ reflect: true })
  icon!: string | undefined;

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

  @State()
  showTooltip = false;

  /**
   * Focuses the button.
   */
  @Method()
  async setFocus() {
    this.buttonElRef?.focus();
  }

  private buttonElRef?: HTMLButtonElement;
  private tooltipElRef?: HTMLDivElement;
  private tipArrowElRef?: HTMLSpanElement;
  private tooltipTimeout?: number;
  private cleanUp: TooltipClean | undefined;
  private lastClickTime = 0;
  private tooltipShowDelay = 500;

  private handleShowTooltip = () => {
    if (this.disabled) {
      return;
    }

    // Don't show the tooltip if the button is clicked within 500ms of the last click
    if (Date.now() - this.lastClickTime < this.tooltipShowDelay) {
      return;
    }

    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
    }

    this.tooltipTimeout = window.setTimeout(() => {
      this.showTooltip = true;
      this.tooltipElRef?.showPopover();

      if (!this.cleanUp && this.buttonElRef && this.tooltipElRef && this.tipArrowElRef) {
        this.cleanUp = positionTooltip({
          referenceElement: this.buttonElRef,
          tipRef: this.tooltipElRef,
          tipArrowRef: this.tipArrowElRef,
          placementTip: this.tooltipPlacement,
          topPositionSmallViewPort: false,
          halfMainAxisOffset: false,
          forceVisible: true,
        });
      }
    }, this.tooltipShowDelay);
  };

  private handleHideTooltip = () => {
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
    }

    this.showTooltip = false;
    this.tooltipElRef?.hidePopover();

    if (!this.showTooltip && this.cleanUp) {
      this.cleanUp();
      this.cleanUp = undefined;
    }
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
          visible={this.showTooltip}
          tipElementRef={(element) => (this.tooltipElRef = element)}
          tipArrowElementRef={(element) => (this.tipArrowElRef = element)}
        >
          {this.label}
        </Tooltip>
      </button>
    );
  }
}
