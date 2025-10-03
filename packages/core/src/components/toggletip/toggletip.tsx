import { Component, Element, Fragment, Prop, State, h } from "@stencil/core";

import { positionTooltip } from "../../functional-components/tooltip/position-tooltip.function";
import { Tooltip } from "../../functional-components/tooltip/tooltip.functional-component";
import { TooltipClean, TooltipPlacement } from "../../functional-components/tooltip/tooltip.interfaces";
import { BadgeStatus } from "../badge/badge.interfaces";

import { ToggletipVariant } from "./toggletip.interfaces";

@Component({
  tag: "dso-toggletip",
  styleUrl: "toggletip.scss",
  shadow: true,
})
export class Toggletip {
  @Element()
  host!: HTMLDsoToggletipElement;

  /**
   * The variant of the Toggletip: "information" or "badge".
   */
  @Prop({ reflect: true })
  variant: ToggletipVariant = "information";

  /**
   * The placement of the Tooltip when the Toggletip is active.
   */
  @Prop({ reflect: true })
  placement: TooltipPlacement = "right";

  /**
   * The label of the Toggletip which is shown on hover in a tooltip.
   */
  @Prop({ reflect: true })
  label = "Toon toelichting";

  /**
   * The status of the Badge when variant is "badge".
   */
  @Prop({ reflect: true })
  status?: BadgeStatus;

  /**
   * The label of the Badge when the variant is "badge".
   */
  @Prop({ reflect: true })
  message?: string;

  @State()
  active = false;

  @State()
  showToggletip = false;

  @State()
  showBadgeButtonTooltip = false;

  private containerElement?: HTMLDivElement;
  private toggletipTooltipElement: HTMLElement | undefined;
  private toggletipTooltipArrowElement: HTMLElement | undefined;
  private cleanUp: TooltipClean | undefined;

  // variant="information"
  private infoButton?: HTMLDsoInfoButtonElement;

  // variant="badge"
  private badgeButton?: HTMLButtonElement;
  private badgeButtonTooltipElement?: HTMLDivElement;
  private badgeButtonTooltipArrowElement?: HTMLSpanElement;
  private badgeButtonTooltipTimeout?: number;
  private badgeButtonTooltipCleanUp: TooltipClean | undefined;
  private badgeButtonTooltipLastClickTime = 0;
  private badgeButtonTooltipShowDelay = 500;

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
    if (!event.defaultPrevented && event.key === "Escape") {
      this.close();
      this.infoButton?.setFocus();
      event.preventDefault();
    }

    return;
  };

  private handleBadgeButtonShowTooltip = () => {
    // Don't show the tooltip if the button is clicked within 500ms of the last click
    if (Date.now() - this.badgeButtonTooltipLastClickTime < this.badgeButtonTooltipShowDelay) {
      return;
    }

    if (this.badgeButtonTooltipTimeout) {
      clearTimeout(this.badgeButtonTooltipTimeout);
    }

    this.badgeButtonTooltipTimeout = window.setTimeout(() => {
      this.showBadgeButtonTooltip = true;
      this.badgeButtonTooltipElement?.showPopover();

      if (
        !this.badgeButtonTooltipCleanUp &&
        this.badgeButton &&
        this.badgeButtonTooltipElement &&
        this.badgeButtonTooltipArrowElement
      ) {
        this.badgeButtonTooltipCleanUp = positionTooltip({
          referenceElement: this.badgeButton,
          tipRef: this.badgeButtonTooltipElement,
          tipArrowRef: this.badgeButtonTooltipArrowElement,
          placementTip: "top",
          topPositionSmallViewPort: false,
          halfMainAxisOffset: false,
          forceVisible: true,
        });
      }
    }, this.badgeButtonTooltipShowDelay);
  };

  private handleBadgeButtonHideTooltip = () => {
    if (this.badgeButtonTooltipTimeout) {
      clearTimeout(this.badgeButtonTooltipTimeout);
    }

    this.showBadgeButtonTooltip = false;
    this.badgeButtonTooltipElement?.hidePopover();

    if (!this.showBadgeButtonTooltip && this.badgeButtonTooltipCleanUp) {
      this.badgeButtonTooltipCleanUp();
      this.badgeButtonTooltipCleanUp = undefined;
    }
  };

  private handleBadgeButtonClick = () => {
    this.badgeButtonTooltipLastClickTime = Date.now();
    this.handleBadgeButtonHideTooltip();
    this.click();
  };

  componentDidRender() {
    if (this.toggletipTooltipElement) {
      const open = this.toggletipTooltipElement.matches(":popover-open");

      if (this.active && !open) {
        this.toggletipTooltipElement.showPopover();
        this.showToggletip = true;
      } else if (!this.active && open) {
        this.toggletipTooltipElement?.hidePopover();
        this.showToggletip = false;
      }
    }

    if (
      this.active &&
      !this.cleanUp &&
      this.containerElement &&
      this.toggletipTooltipElement &&
      this.toggletipTooltipArrowElement
    ) {
      this.cleanUp = positionTooltip({
        referenceElement: this.containerElement,
        tipRef: this.toggletipTooltipElement,
        tipArrowRef: this.toggletipTooltipArrowElement,
        placementTip: this.placement,
      });
    }

    if (!this.active && this.cleanUp) {
      this.cleanUp();
      this.cleanUp = undefined;
    }
  }

  render() {
    return (
      <Fragment>
        <div ref={(element) => (this.containerElement = element)}>
          {this.variant === "information" && (
            <dso-info-button
              onClick={this.click}
              label={this.label}
              active={this.active}
              ref={(element) => (this.infoButton = element)}
            />
          )}
          {this.variant === "badge" && (
            <button
              ref={(element) => (this.badgeButton = element)}
              type="button"
              aria-label={this.label}
              class="badge-button"
              onMouseEnter={this.handleBadgeButtonShowTooltip}
              onMouseLeave={this.handleBadgeButtonHideTooltip}
              onFocus={this.handleBadgeButtonShowTooltip}
              onBlur={this.handleBadgeButtonHideTooltip}
              onClick={this.handleBadgeButtonClick}
            >
              <dso-badge status={this.status}>{this.message}</dso-badge>
              <Tooltip
                visible={this.showBadgeButtonTooltip}
                tipElementRef={(element) => (this.badgeButtonTooltipElement = element)}
                tipArrowElementRef={(element) => (this.badgeButtonTooltipArrowElement = element)}
              >
                {this.label}
              </Tooltip>
            </button>
          )}
        </div>
        <Tooltip
          visible={this.showToggletip}
          tipElementRef={(element) => (this.toggletipTooltipElement = element)}
          tipArrowElementRef={(element) => (this.toggletipTooltipArrowElement = element)}
        >
          <slot />
        </Tooltip>
      </Fragment>
    );
  }
}
