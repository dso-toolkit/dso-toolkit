import { Component, ComponentInterface, Event, EventEmitter, Method, Prop, h } from "@stencil/core";

import { TooltipController } from "../../functional-components/tooltip/tooltip.controller";
import { Tooltip } from "../../functional-components/tooltip/tooltip.functional-component";
import { TooltipPlacement } from "../../functional-components/tooltip/tooltip.interfaces";
import { IconAlias } from "../icon/icon.interfaces";

import { IconButtonClickEvent, IconButtonVariant } from "./icon-button.interfaces";

@Component({
  tag: "dso-icon-button",
  styleUrl: "icon-button.scss",
  shadow: true,
})
export class IconButton implements ComponentInterface {
  private buttonElRef?: HTMLButtonElement;
  private tooltipElRef?: HTMLDivElement;
  private tooltipArrowElRef?: HTMLSpanElement;

  private tooltipController = new TooltipController({
    getReferenceElement: () => this.buttonElRef,
    getTipElement: () => this.tooltipElRef,
    getTipArrowElement: () => this.tooltipArrowElRef,
    getPlacement: () => this.tooltipPlacement,
    showDelay: 500,
    respectClickDelay: true,
  });

  /**
   * The alias of the icon in the button.
   */
  @Prop({ reflect: true })
  icon!: IconAlias | undefined;

  /**
   * The label of the Icon Button which is shown on hover in a tooltip.
   */
  @Prop({ reflect: true })
  label!: string | undefined;

  /**
   * The variant of the Icon Button.
   */
  @Prop({ reflect: true })
  variant?: IconButtonVariant = "secondary";

  /**
   * The placement of the tooltip on hover and focus of the Icon Button.
   */
  @Prop({ reflect: true })
  tooltipPlacement: TooltipPlacement = "top";

  /**
   * To disable the Icon Button
   */
  @Prop({ reflect: true })
  disabled = false;

  /**
   * Indicates whether the controlled element is expanded.
   */
  @Prop({ reflect: true })
  expanded?: boolean;

  /**
   * Whether the button is toggled.
   */
  @Prop({ reflect: true })
  toggled?: boolean;

  /**
   * Emitted when the user clicks the Icon Button.
   */
  @Event({ bubbles: false })
  dsoClick!: EventEmitter<IconButtonClickEvent>;

  /**
   * Focuses the button.
   */
  @Method()
  async setFocus() {
    this.buttonElRef?.focus();
  }

  private handleShowTooltip = () => {
    if (this.disabled) {
      return;
    }

    this.tooltipController.show();
  };

  private handleHideTooltip = () => {
    this.tooltipController.hide();
  };

  disconnectedCallback() {
    this.tooltipController.dispose();
  }

  private handleClick = (event: MouseEvent) => {
    this.tooltipController.notifyClick();
    this.handleHideTooltip();
    this.dsoClick.emit({ originalEvent: event, toggled: !this.toggled });
  };

  render() {
    return (
      <button
        ref={(element) => (this.buttonElRef = element)}
        type="button"
        disabled={this.disabled}
        aria-label={this.label}
        class={`icon-button dso-${this.variant} ${this.toggled ? "toggled" : ""}`}
        aria-pressed={this.toggled?.toString()}
        aria-expanded={this.expanded?.toString()}
        onMouseEnter={this.handleShowTooltip}
        onMouseLeave={this.handleHideTooltip}
        onFocus={this.handleShowTooltip}
        onBlur={this.handleHideTooltip}
        onClick={this.handleClick}
      >
        <dso-icon icon={this.icon} aria-hidden="true" />
        <Tooltip
          tipElementRef={(element) => (this.tooltipElRef = element)}
          tipArrowElementRef={(element) => (this.tooltipArrowElRef = element)}
        >
          {this.label}
        </Tooltip>
      </button>
    );
  }
}
