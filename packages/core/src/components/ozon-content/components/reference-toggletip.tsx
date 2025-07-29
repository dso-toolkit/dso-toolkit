import { Component, ComponentInterface, Element, Fragment, Prop, State, h } from "@stencil/core";

import { positionTooltip } from "../../../functional-components/tooltip/position-tooltip.function";
import { Tooltip } from "../../../functional-components/tooltip/tooltip.functional-component";
import { TooltipClean } from "../../../functional-components/tooltip/tooltip.interfaces";

@Component({
  tag: "dso-reference-toggletip",
  styleUrl: "./reference-toggletip.scss",
  shadow: true,
})
export class ReferenceToggletip implements ComponentInterface {
  @Element()
  host!: HTMLDsoReferenceToggletipElement;

  /**
   * The alias of the icon in the button.
   */
  @Prop({ reflect: true })
  icon!: string | undefined;

  @State()
  active = false;

  @State()
  showToggletip = false;

  private containerElement: HTMLButtonElement | undefined;
  private toggletipTooltipElement: HTMLElement | undefined;
  private toggletipTooltipArrowElement: HTMLElement | undefined;
  private cleanUp: TooltipClean | undefined;

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
    if (this.toggletipTooltipElement) {
      if (this.active && !this.showToggletip) {
        this.toggletipTooltipElement.showPopover();
        this.showToggletip = true;
      } else if (!this.active && this.showToggletip) {
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
        placementTip: "top",
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
        <button class="toggletip-button" ref={(element) => (this.containerElement = element)} onClick={this.click}>
          <slot name="label" />
          <dso-icon icon={this.icon} />
          <Tooltip
            visible
            onAfterHidden={() => {}}
            tipElementRef={(element) => (this.toggletipTooltipElement = element)}
            tipArrowElementRef={(element) => (this.toggletipTooltipArrowElement = element)}
          >
            <slot />
          </Tooltip>
        </button>
      </Fragment>
    );
  }
}
