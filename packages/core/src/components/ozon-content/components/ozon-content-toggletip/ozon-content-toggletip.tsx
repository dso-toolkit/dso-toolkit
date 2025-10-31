import { Component, ComponentInterface, Element, Fragment, Prop, State, h } from "@stencil/core";

import { positionTooltip } from "../../../../functional-components/tooltip/position-tooltip.function";
import { Tooltip } from "../../../../functional-components/tooltip/tooltip.functional-component";
import { TooltipClean } from "../../../../functional-components/tooltip/tooltip.interfaces";

@Component({
  tag: "dso-ozon-content-toggletip",
  styleUrl: "./ozon-content-toggletip.scss",
  shadow: true,
})
export class ozonContentToggletip implements ComponentInterface {
  @Element()
  host!: HTMLDsoOzonContentToggletipElement;

  /**
   * The alias of the icon in the button.
   */
  @Prop({ reflect: true })
  icon?: string;

  @State()
  active = false;

  @State()
  showToggletip = false;

  private container: HTMLButtonElement | undefined;
  private tooltip: HTMLElement | undefined;
  private tooltipArrow: HTMLElement | undefined;

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
    if (event.key === "Escape") {
      this.close();
    }

    return;
  };

  componentDidRender() {
    if (this.tooltip) {
      if (this.active && !this.showToggletip) {
        this.tooltip.showPopover();
        this.showToggletip = true;
      } else if (!this.active && this.showToggletip) {
        this.tooltip?.hidePopover();
        this.showToggletip = false;
      }
    }

    let cleanUp: TooltipClean | undefined;

    if (this.active && !cleanUp && this.container && this.tooltip && this.tooltipArrow) {
      cleanUp = positionTooltip({
        referenceElement: this.container,
        tipRef: this.tooltip,
        tipArrowRef: this.tooltipArrow,
        placementTip: "top",
      });
    }

    if (!this.active && cleanUp) {
      cleanUp();
    }
  }

  render() {
    return (
      <Fragment>
        <button class="toggletip-button" ref={(element) => (this.container = element)} onClick={this.click}>
          <slot name="label" />
          <dso-icon icon={this.icon} />
          <Tooltip
            visible
            onAfterHidden={() => {}}
            tipElementRef={(element) => (this.tooltip = element)}
            tipArrowElementRef={(element) => (this.tooltipArrow = element)}
          >
            <slot />
          </Tooltip>
        </button>
      </Fragment>
    );
  }
}
