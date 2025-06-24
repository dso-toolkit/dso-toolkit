import { autoUpdate } from "@floating-ui/dom";
import { Component, Element, Fragment, Prop, State, h } from "@stencil/core";
import { TooltipPosition } from "dso-toolkit";

import { positionTooltip } from "../../functional-components/tooltip/position-tooltip.function";
import { Tooltip } from "../../functional-components/tooltip/tooltip.functional-component";
import { BadgeStatus } from "../badge/badge.interfaces";

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
   * Positioning strategy
   */
  @Prop()
  strategy: "absolute" | "fixed" = "absolute";

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

  private infoButton?: HTMLDsoInfoButtonElement;
  private containerElement?: HTMLDivElement;

  private cleanUp: ReturnType<typeof autoUpdate> | undefined;

  componentDidRender() {
    if (!this.cleanUp && this.containerElement && this.tipElement && this.tipArrowElement) {
      this.cleanUp = positionTooltip(
        this.containerElement,
        this.tipElement,
        this.tipArrowElement,
        this.position,
        this.strategy,
        this.active,
      );
    }
  }

  disconnectedCallback(): void {
    this.cleanUp?.();
    this.cleanUp = undefined;
  }

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
        <div class="toggletip-container" onClick={this.click} ref={(element) => (this.containerElement = element)}>
          {["toggle", "secondary"].includes(this.mode) && (
            <dso-info-button
              aria-describedby="tooltip"
              label={this.label}
              active={this.active}
              secondary={this.mode === "secondary"}
              ref={(element) => (this.infoButton = element)}
            />
          )}
          {this.mode === "badge" && <dso-badge status={this.badgeStatus}>{this.label}</dso-badge>}
          {this.mode === "icon" && <dso-icon icon={this.active ? this.iconActive : this.icon}></dso-icon>}
        </div>
        <Tooltip small={this.small} visible={this.active}>
          <slot />
        </Tooltip>
      </>
    );
  }

  private get tipElement(): HTMLElement | undefined {
    const elementRef = this.host.shadowRoot?.querySelector<HTMLElement>(".tooltip");
    if (!elementRef) {
      console.warn("Unable to find tooltip element");

      return;
    }

    return elementRef;
  }

  private get tipArrowElement(): HTMLElement | undefined {
    const elementRef = this.host.shadowRoot?.querySelector<HTMLElement>(".tooltip-arrow");
    if (!elementRef) {
      console.warn("Unable to find arrow element");

      return;
    }

    return elementRef;
  }
}
