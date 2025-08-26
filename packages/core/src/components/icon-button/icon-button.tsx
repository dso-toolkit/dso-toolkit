import { Side } from "@floating-ui/utils";
import { Component, ComponentInterface, Fragment, Prop, State, h } from "@stencil/core";
import clsx from "clsx";

import { positionTooltip } from "../../functional-components/tooltip/position-tooltip.function";
import { Tooltip } from "../../functional-components/tooltip/tooltip.functional-component";

@Component({
  tag: "dso-icon-button",
  styleUrl: "icon-button.scss",
  shadow: true,
})
export class IconButton implements ComponentInterface {
  /**
   * The name of the icon displayed in the button.
   */
  @Prop()
  icon?: string;

  /**
   * The accessible label of the button, also shown on hover in a tooltip.
   */
  @Prop()
  accessibleLabel!: string;

  /**
   * The variants of the icon button.
   */
  @Prop()
  variant?: "secondary" | "tertiary" = "secondary";

  /**
   * The placement of the tooltip on hover of the icon button.
   */
  @Prop()
  tooltipPlacement: Side = "top";

  @State()
  showTooltip = false;

  private buttonElRef?: HTMLButtonElement;
  private tooltipElRef?: HTMLDivElement;
  private tipArrowElRef?: HTMLSpanElement;
  private tooltipTimeout?: number;

  private cleanupAutoUpdate?: () => void;

  private handleShow = () => {
    this.tooltipTimeout = window.setTimeout(() => {
      this.showTooltip = true;

      if (this.tooltipElRef?.matches(":popover-open")) {
        this.tooltipElRef.showPopover();
      }

      if (this.buttonElRef && this.tooltipElRef && this.tipArrowElRef) {
        // positionTooltip returned cleanup functie
        this.cleanupAutoUpdate = positionTooltip(
          this.buttonElRef,
          this.tooltipElRef,
          this.tipArrowElRef,
          this.tooltipPlacement,
        );
      }
    }, 500);
  };

  private handleHide = () => {
    clearTimeout(this.tooltipTimeout);
    this.tooltipElRef?.hidePopover();
    this.showTooltip = false;

    if (this.cleanupAutoUpdate) {
      this.cleanupAutoUpdate();
      this.cleanupAutoUpdate = undefined;
    }
  };

  render() {
    return (
      <>
        <button
          ref={(el) => (this.buttonElRef = el)}
          type="button"
          aria-label={this.accessibleLabel}
          class={clsx(`dso-${this.variant}`)}
          onMouseEnter={this.handleShow}
          onMouseLeave={this.handleHide}
          onFocus={this.handleShow}
          onBlur={this.handleHide}
          onTouchStart={this.handleShow}
          onTouchEnd={this.handleHide}
        >
          <dso-icon icon={this.icon} />
        </button>
        <Tooltip
          small
          visible={this.showTooltip}
          onAfterHidden={() => this.handleHide()}
          tipElementRef={(element: HTMLDivElement | undefined) => (this.tooltipElRef = element)}
          tipArrowElementRef={(element: HTMLSpanElement | undefined) => (this.tipArrowElRef = element)}
        >
          {this.accessibleLabel}
        </Tooltip>
      </>
    );
  }
}
