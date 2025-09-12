import { Placement, autoUpdate } from "@floating-ui/dom";
import { Component, ComponentInterface, Event, EventEmitter, Method, Prop, State, h } from "@stencil/core";
import clsx from "clsx";
import { IconButtonVariant } from "dso-toolkit";

import { positionTooltip } from "../../functional-components/tooltip/position-tooltip.function";
import { Tooltip } from "../../functional-components/tooltip/tooltip.functional-component";

import { IconButtonClickEvent } from "./icon-button.interfaces";

@Component({
  tag: "dso-icon-button",
  styleUrl: "icon-button.scss",
  shadow: true,
})
export class IconButton implements ComponentInterface {
  /**
   * The alias of the icon in the button.
   */
  @Prop()
  icon!: string;

  /**
   * The accessible label of the button, also shown on hover in a tooltip.
   */
  @Prop()
  accessibleLabel!: string;

  /**
   * The variant of the icon button.
   */
  @Prop()
  variant: IconButtonVariant = "secondary";

  /**
   * The placement of the tooltip on hover of the icon button.
   */
  @Prop()
  tooltipPlacement: Placement = "top";

  /**
   * Makes the Icon Button button disabled. This prevents users from being able to
   * interact with the component.
   */
  @Prop()
  disabled = false;

  /**
   * Emitted when the user click the IconBtton.
   */
  @Event()
  dsoIconButtonClick!: EventEmitter<IconButtonClickEvent>;

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
  private cleanUp: ReturnType<typeof autoUpdate> | undefined;

  private handleShowTooltip = () => {
    if (this.disabled) {
      return;
    }

    this.tooltipTimeout = window.setTimeout(() => {
      this.showTooltip = true;
      this.tooltipElRef?.showPopover();

      if (!this.cleanUp && this.buttonElRef && this.tooltipElRef && this.tipArrowElRef) {
        const halfMainAxisOffset = this.variant === "tertiary";
        this.cleanUp = positionTooltip(
          this.buttonElRef,
          this.tooltipElRef,
          this.tipArrowElRef,
          this.tooltipPlacement,
          false,
          halfMainAxisOffset,
        );
      }
    }, 500);
  };

  private handleHideTooltip = () => {
    clearTimeout(this.tooltipTimeout);

    this.showTooltip = false;
    this.tooltipElRef?.hidePopover();

    if (!this.showTooltip && this.cleanUp) {
      this.cleanUp();
      this.cleanUp = undefined;
    }
  };

  render() {
    return (
      <button
        ref={(el) => (this.buttonElRef = el)}
        type="button"
        disabled={this.disabled}
        aria-label={this.accessibleLabel}
        class={clsx(`dso-${this.variant}`)}
        onMouseEnter={this.handleShowTooltip}
        onMouseLeave={this.handleHideTooltip}
        onFocus={this.handleShowTooltip}
        onBlur={this.handleHideTooltip}
        onClick={(e) => this.dsoIconButtonClick.emit({ originalEvent: e })}
      >
        <dso-icon icon={this.icon} />
        <Tooltip
          small
          visible={this.showTooltip}
          onAfterHidden={this.handleHideTooltip}
          tipElementRef={(element) => (this.tooltipElRef = element)}
          tipArrowElementRef={(element) => (this.tipArrowElRef = element)}
        >
          {this.accessibleLabel}
        </Tooltip>
      </button>
    );
  }
}
