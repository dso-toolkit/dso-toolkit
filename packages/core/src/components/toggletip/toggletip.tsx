import { Component, Element, Fragment, Prop, State, h } from "@stencil/core";

import { positionTooltip } from "../../functional-components/tooltip/position-tooltip.function";
import { Tooltip } from "../../functional-components/tooltip/tooltip.functional-component";
import { TooltipPlacement } from "../../functional-components/tooltip/tooltip.interfaces";
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
  badgeStatus?: BadgeStatus;

  /**
   * The label of the Toggletip which is shown on hover in a tooltip.
   */
  @Prop({ reflect: true })
  badgeMessage?: string;

  @State()
  active = false;

  @State()
  visible = false;

  private infoButton?: HTMLDsoInfoButtonElement;
  private containerElement?: HTMLDivElement;
  private tipElementRef: HTMLElement | undefined;
  private tipArrowElementRef: HTMLElement | undefined;
  private cleanUp: ReturnType<typeof positionTooltip> | undefined;

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

  private handleOnAfterHidden() {
    this.tipElementRef?.hidePopover();

    if (!this.active && this.cleanUp) {
      this.cleanUp();
      this.cleanUp = undefined;
    }
  }

  componentDidRender() {
    if (this.tipElementRef) {
      const open = this.tipElementRef.matches(":popover-open");

      if (this.active && !open) {
        this.tipElementRef.showPopover();
        this.visible = true;
      } else if (!this.active && open) {
        this.visible = false;
      }
    }

    if (this.active && !this.cleanUp && this.containerElement && this.tipElementRef && this.tipArrowElementRef) {
      this.cleanUp = positionTooltip({
        referenceElement: this.containerElement,
        tipRef: this.tipElementRef,
        tipArrowRef: this.tipArrowElementRef,
        placementTip: this.placement,
      });
    }
  }

  render() {
    return (
      <Fragment>
        <div ref={(element) => (this.containerElement = element)}>
          {this.variant === "information" && (
            <dso-info-button
              aria-describedby="toggle"
              onClick={this.click}
              label={this.label}
              active={this.active}
              ref={(element) => (this.infoButton = element)}
            />
          )}
          {this.variant === "badge" && (
            <button class="badge-button" type="button" aria-describedby="tooltip" onClick={this.click}>
              <dso-badge status={this.badgeStatus}>{this.badgeMessage}</dso-badge>
            </button>
            // Todo: Tooltip cf Icon Button maken
          )}
        </div>
        <Tooltip
          visible={this.visible}
          onAfterHidden={() => this.handleOnAfterHidden()}
          tipElementRef={(element) => (this.tipElementRef = element)}
          tipArrowElementRef={(element) => (this.tipArrowElementRef = element)}
        >
          <slot />
        </Tooltip>
      </Fragment>
    );
  }
}
