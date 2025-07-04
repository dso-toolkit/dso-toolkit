import { Component, Element, Fragment, FunctionalComponent, Prop, State, h } from "@stencil/core";
import { TooltipPosition } from "dso-toolkit";

import { positionTooltip } from "../../functional-components/tooltip/position-tooltip.function";
import { Tooltip } from "../../functional-components/tooltip/tooltip.functional-component";
import { BadgeStatus } from "../badge/badge.interfaces";

interface ToggleTipButtonProps {
  onClick: () => void;
}

const ToggletipButton: FunctionalComponent<ToggleTipButtonProps> = ({ onClick }, children) => (
  <button class="toggletip-button" type="button" aria-describedby="tooltip" onClick={onClick}>
    {children}
  </button>
);

@Component({
  tag: "dso-toggletip",
  styleUrl: "toggletip.scss",
  shadow: true,
})
export class Toggletip {
  @Element()
  host!: HTMLDsoToggletipElement;

  @State()
  active = false;

  @State()
  visible = false;

  /**
   * Toggletip label.
   */
  @Prop()
  label = "Toelichting";

  /**
   * Toggletip position.
   */
  @Prop()
  position: TooltipPosition = "right";

  /**
   * Set to true for small Toggletip.
   */
  @Prop()
  small: boolean = false;

  /**
   * The type of Toggletip.
   */
  @Prop()
  mode: "toggle" | "secondary" | "badge" | "icon" = "toggle";

  /**
   * The badge status when `mode="badge"`
   */
  @Prop()
  badgeStatus?: BadgeStatus;

  /**
   * The icon when `mode="icon"`
   */
  @Prop()
  icon?: string;

  /**
   * The icon when `mode="icon"` and the tip is visible
   */
  @Prop()
  iconActive?: string;

  private containerElement?: HTMLDivElement;
  private tipElementRef: HTMLElement | undefined;
  private tipArrowElementRef: HTMLElement | undefined;
  private cleanUp: ReturnType<typeof positionTooltip> | undefined;

  disconnectedCallback(): void {
    this.cleanUp?.();
    this.cleanUp = undefined;
  }

  private click = (next?: boolean) => {
    this.active = next !== undefined ? next : !this.active;
  };

  render() {
    return (
      <Fragment>
        <dso-info-button
          aria-describedby="toggle"
          onClick={this.click}
          label={this.label}
          active={this.active}
          secondary={this.secondary}
          ref={(element) => (this.infoButton = element)}
        />
        <dso-tooltip
          stateless
          descriptive
          id="toggle"
          strategy="absolute"
          active={this.active}
          position={this.position}
          small={this.small}
        >
          <slot />
        </dso-tooltip>
      </Fragment>
      <>
        <div ref={(element) => (this.containerElement = element)}>
          {["toggle", "secondary"].includes(this.mode) && (
            <dso-info-button
              aria-describedby="tooltip"
              label={this.label}
              active={this.active}
              secondary={this.mode === "secondary"}
              onDsoToggle={({ detail }) => this.click(detail.active)}
            />
          )}
          {this.mode === "badge" && (
            <ToggletipButton onClick={() => this.click(!this.active)}>
              <dso-badge status={this.badgeStatus}>{this.label}</dso-badge>
              <span class="sr-only">{this.label}</span>
            </ToggletipButton>
          )}
          {this.mode === "icon" && (
            <ToggletipButton onClick={() => this.click(!this.active)}>
              <dso-icon icon={this.active && this.iconActive ? this.iconActive : this.icon}></dso-icon>
              <span class="sr-only">{this.label}</span>
            </ToggletipButton>
          )}
        </div>
        <Tooltip
          small={this.small}
          visible={this.visible}
          onAfterHidden={() => this.tipElementRef?.hidePopover()}
          tipElementRef={(element) => (this.tipElementRef = element)}
          tipArrowElementRef={(element) => (this.tipArrowElementRef = element)}
        >
          <slot />
        </Tooltip>
      </>
    );
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
      this.cleanUp = positionTooltip(this.containerElement, this.tipElementRef, this.tipArrowElementRef, this.position);
    } else if (!this.active && this.cleanUp) {
      this.cleanUp();
      this.cleanUp = undefined;
    }
  }
}
