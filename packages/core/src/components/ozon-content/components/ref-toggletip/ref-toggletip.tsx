import { Component, ComponentInterface, Element, Fragment, Prop, State, h } from "@stencil/core";

import { toggletip } from "../../../../functional-components/tooltip/toggletip.function";
import { Tooltip } from "../../../../functional-components/tooltip/tooltip.functional-component";

@Component({
  tag: "dso-ref-toggletip",
  styleUrl: "./ref-toggletip.scss",
  shadow: true,
})
export class RefToggletip implements ComponentInterface {
  @Element()
  host!: HTMLDsoRefToggletipElement;

  /**
   * The alias of the icon in the button.
   */
  @Prop({ reflect: true })
  icon!: string | undefined;

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
    this.showToggletip = toggletip(this.container, this.tooltip, this.tooltipArrow, this.active, this.showToggletip);
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
