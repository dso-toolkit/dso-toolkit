import { arrow, autoUpdate, computePosition, flip, hide, offset, shift } from "@floating-ui/dom";
import { Placement } from "@floating-ui/utils";
import { Component, Element, Fragment, h, Prop, State } from "@stencil/core";

import { BadgeStatus } from "../badge/badge.interfaces";
import { Tooltip } from "../tooltip/tooltip.functional";

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
  position: Placement = "right";

  /**
   * Set to true for small Toggletip.
   */
  @Prop()
  small?: boolean;

  /**
   * The type of Toggletip.
   */
  @Prop()
  mode: "toggle" | "secondary" | "badge" | "icon" = "toggle";

  /**
   * The type of badge when `mode`=`badge`
   */
  @Prop()
  badgeStatus?: BadgeStatus;

  /**
   * The icon when `mode`=`icon`
   */
  @Prop()
  icon?: string;

  /**
   * The icon when `mode`=`icon` and the Toggletip is visible
   */
  @Prop()
  iconActive?: string;

  private infoButton?: HTMLDsoInfoButtonElement;
  private containerElement?: HTMLDivElement;

  private cleanUp: ReturnType<typeof autoUpdate> | undefined;

  componentDidRender() {
    if (!this.cleanUp && this.containerElement && this.tipElement && this.tipArrowElement) {
      this.cleanUp = this.positionTip(this.containerElement, this.tipElement, this.tipArrowElement, this.position);
    }
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

  private positionTip(
    referenceElement: HTMLElement,
    tipRef: HTMLElement,
    tipArrowRef: HTMLElement,
    placement: Placement,
  ) {
    return autoUpdate(referenceElement, tipRef, () => {
      const arrowLength = tipArrowRef.offsetWidth;

      // Get half the arrow box's hypotenuse length
      const mainAxisOffset = Math.sqrt(2 * arrowLength ** 2) / 2;

      // 1.5 times the diagonal of the arrow box
      const arrowPadding = arrowLength * Math.sqrt(2) * 1.5;

      computePosition(referenceElement, tipRef, {
        strategy: "fixed",
        middleware: [
          offset({
            mainAxis: mainAxisOffset,
            alignmentAxis: -arrowPadding,
          }),
          flip(),
          shift(),
          arrow({
            padding: arrowPadding,
            element: tipArrowRef,
          }),
          hide({
            padding: arrowPadding + arrowLength,
          }),
        ],
        placement,
      }).then(({ x, y, middlewareData, placement: computedPlacement }) => {
        if (middlewareData.hide) {
          if (this.active) {
            tipRef.classList.toggle("visible", !middlewareData.hide.referenceHidden);
          } else {
            tipRef.classList.remove("visible");
          }
        }
        Object.assign(tipRef.style, {
          left: `${x}px`,
          top: `${y}px`,
        });

        const side = computedPlacement.split("-")[0];

        const staticSide = side
          ? {
              top: "bottom",
              right: "left",
              bottom: "top",
              left: "right",
            }[side]
          : "top";

        let angle;
        switch (staticSide) {
          default:
          case "top":
            angle = 45;
            break;
          case "right":
            angle = 135;
            break;
          case "bottom":
            angle = 225;
            break;
          case "left":
            angle = 315;
            break;
        }

        if (middlewareData.arrow && staticSide) {
          const { x: arrowX, y: arrowY } = middlewareData.arrow;

          Object.assign(tipArrowRef.style, {
            right: "",
            bottom: "",
            left: arrowX ? `${arrowX}px` : "",
            top: arrowY ? `${arrowY}px` : "",
            [staticSide]: `${-arrowLength / 2}px`,
            transform: `rotate(${angle}deg)`,
          });
        }
      });
    });
  }

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
              aria-describedby="toggle"
              label={this.label}
              active={this.active}
              secondary={this.mode === "secondary"}
              ref={(element) => (this.infoButton = element)}
            />
          )}
          {this.mode === "badge" && <dso-badge status={this.badgeStatus}>{this.label}</dso-badge>}
          {this.mode === "icon" && <dso-icon icon={this.active ? this.iconActive : this.icon}></dso-icon>}
        </div>
        <Tooltip small={this.small ?? false} visible={this.active}>
          <slot />
        </Tooltip>
      </>
    );
  }

  private get tipElement(): HTMLElement | undefined {
    const element = this.host.shadowRoot?.querySelector<HTMLElement>(".tooltip");
    if (!element) {
      console.warn("Unable to find tooltip element");

      return;
    }

    return element;
  }

  private get tipArrowElement(): HTMLElement | undefined {
    const element = this.host.shadowRoot?.querySelector<HTMLElement>(".tooltip-arrow");
    if (!element) {
      console.warn("Unable to find arrow element");

      return;
    }

    return element;
  }
}
