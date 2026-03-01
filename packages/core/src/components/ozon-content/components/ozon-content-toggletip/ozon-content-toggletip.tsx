import { Component, ComponentInterface, Element, Fragment, Listen, Prop, State, h } from "@stencil/core";

import { positionTooltip } from "../../../../functional-components/tooltip/position-tooltip.function";
import { Tooltip } from "../../../../functional-components/tooltip/tooltip.functional-component";
import { TooltipClean } from "../../../../functional-components/tooltip/tooltip.interfaces";

@Component({
  tag: "dso-ozon-content-toggletip",
  styleUrl: "./ozon-content-toggletip.scss",
  shadow: true,
})
export class ozonContentToggletip implements ComponentInterface {
  private cleanUp: TooltipClean | undefined;
  private container: HTMLSpanElement | undefined;
  private tooltip: HTMLElement | undefined;
  private tooltipArrow: HTMLElement | undefined;

  @Element()
  host!: HTMLDsoOzonContentToggletipElement;
  /**
   * The alias of the icon in the button.
   */
  @Prop({ reflect: true })
  icon?: string;

  @State()
  active = false;

  @Listen("click", { target: "window" })
  handleWindowClick(event: MouseEvent) {
    if (!this.active) return;

    const path = event.composedPath();
    const clickedInsideHost = path.includes(this.host);
    const clickedInsideTooltip = this.tooltip && path.includes(this.tooltip);

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
        this.toggle();
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
    if (!this.cleanUp && this.active && this.container && this.tooltip && this.tooltipArrow) {
      this.cleanUp = positionTooltip({
        referenceElement: this.container,
        tipRef: this.tooltip,
        tipArrowRef: this.tooltipArrow,
        placementTip: "top",
      });
    }

    if (this.cleanUp && this.tooltip) {
      if (this.active) {
        this.tooltip?.showPopover();
      } else {
        this.tooltip?.hidePopover();
        this.cleanupTooltip();
      }
    }
  }

  disconnectedCallback() {
    this.cleanupTooltip();
  }

  private cleanupTooltip() {
    this.cleanUp?.();
    this.cleanUp = undefined;
  }

  render() {
    return (
      <Fragment>
        <span
          class="toggletip-button"
          role="button"
          tabindex={0}
          onClick={this.toggle}
          onKeyDown={this.keyDownHandler}
          ref={(element) => (this.container = element)}
        >
          {this.icon && (
            <span class="icon-container">
              <slot name="label" />
              <dso-icon icon={this.icon} />
            </span>
          )}
          {!this.icon && <slot name="label" />}
        </span>
        <Tooltip
          visible
          onAfterHidden={() => {}}
          tipElementRef={(element) => (this.tooltip = element)}
          tipArrowElementRef={(element) => (this.tooltipArrow = element)}
        >
          <slot />
        </Tooltip>
      </Fragment>
    );
  }
}
