import { Component, ComponentInterface, Element, Fragment, Listen, Prop, State, h } from "@stencil/core";

import { positionTooltip } from "../../../../functional-components/tooltip/position-tooltip.function";
import { Tooltip } from "../../../../functional-components/tooltip/tooltip.functional-component";
import { TooltipClean } from "../../../../functional-components/tooltip/tooltip.interfaces";
import { IconAlias } from "../../../icon/icon.interfaces";

@Component({
  tag: "dso-ozon-content-toggletip",
  styleUrl: "./ozon-content-toggletip.scss",
  shadow: true,
})
export class OzonContentToggletip implements ComponentInterface {
  private cleanUpFunction: TooltipClean | undefined;
  private container: HTMLSpanElement | undefined;
  private tooltipElRef: HTMLDivElement | undefined;
  private tooltipArrowElRef: HTMLSpanElement | undefined;
  private restrictContentElement: HTMLElement | undefined;

  @Element()
  host!: HTMLDsoOzonContentToggletipElement;

  /**
   * The alias of the icon in the button.
   */
  @Prop({ reflect: true })
  icon?: IconAlias;

  @State()
  active = false;

  @Listen("click", { target: "window" })
  handleWindowClick(event: MouseEvent) {
    if (!this.active) return;

    const path = event.composedPath();
    const clickedInsideHost = path.includes(this.host);
    const clickedInsideTooltip = this.tooltipElRef && path.includes(this.tooltipElRef);

    if (!clickedInsideHost && !clickedInsideTooltip) {
      this.toggle();
    }

    if (clickedInsideTooltip) {
      const interactive = path.some((el) => el instanceof HTMLElement && el.tagName === "BUTTON");
      if (interactive) {
        this.toggle();
      }
    }
  }

  private toggle = () => {
    this.active = !this.active;
  };

  private keyDownHandler = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Escape":
        this.active = false;
        return;
      case " ":
      case "Enter":
        this.toggle();
        return;
      default:
        return;
    }
  };

  componentDidRender() {
    if (!this.cleanUpFunction && this.active && this.container && this.tooltipElRef && this.tooltipArrowElRef) {
      this.cleanUpFunction = positionTooltip({
        referenceElement: this.container,
        tipRef: this.tooltipElRef,
        tipArrowRef: this.tooltipArrowElRef,
        placementTip: "top",
        restrictContentElement: this.restrictContentElement,
      });
    }

    if (this.cleanUpFunction && this.tooltipElRef) {
      if (this.active) {
        this.tooltipElRef?.showPopover();
      } else {
        this.tooltipElRef?.hidePopover();
        this.cleanUpTooltip();
      }
    }
  }

  disconnectedCallback() {
    this.cleanUpTooltip();
  }

  private cleanUpTooltip() {
    this.cleanUpFunction?.();
    this.cleanUpFunction = undefined;
  }

  render() {
    return (
      <Fragment>
        <span
          aria-describedby={this.active ? "toggletip-tooltip" : undefined}
          aria-expanded={this.active.toString()}
          class="toggletip-button"
          role="button"
          tabIndex={0}
          onClick={this.toggle}
          onKeyDown={this.keyDownHandler}
          ref={(element) => (this.container = element)}
        >
          {this.icon && (
            <Fragment>
              <span class="toggletip-label">
                <slot name="label" />
              </span>
              {/* Word joiner: prevents a line break between label text and icon */}
              {"\u2060"}
              <dso-icon icon={this.icon} />
            </Fragment>
          )}
          {!this.icon && <slot name="label" />}
        </span>
        <Tooltip
          id="toggletip-tooltip"
          tipElementRef={(element) => (this.tooltipElRef = element)}
          tipArrowElementRef={(element) => (this.tooltipArrowElRef = element)}
        >
          <dso-scrollable
            ref={(element) => (this.restrictContentElement = element)}
            id="toggletip-content"
            aria-live="polite"
          >
            <slot />
          </dso-scrollable>
        </Tooltip>
      </Fragment>
    );
  }
}
