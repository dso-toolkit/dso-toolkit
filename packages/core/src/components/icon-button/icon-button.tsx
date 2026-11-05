import { Component, ComponentInterface, Event, EventEmitter, Method, Prop, Watch, h } from "@stencil/core";

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
  });

  /**
   * The alias of the icon in the button.
   */
  @Prop({ reflect: true })
  icon!: IconAlias | undefined;

  /**
   * The accessible name of the Icon Button. Also shown as tooltip when `tooltip` is not set.
   */
  @Prop({ reflect: true })
  label!: string | undefined;

  /**
   * Optional shorter text for the tooltip. Must occur as whole words in `label`, preferably at the start.
   */
  @Prop({ reflect: true })
  tooltip?: string;

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
   * The element controlled by the button. Sets `ariaControlsElements` on the native button when supported. Intended
   * for a wrapping component passing an element across a shadow boundary.
   */
  @Prop()
  controlsElement?: HTMLElement;

  /**
   * The element describing the button. Sets `ariaDescribedByElements` on the native button when supported. Intended
   * for a wrapping component passing an element across a shadow boundary.
   */
  @Prop()
  describedByElement?: HTMLElement;

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
  async setFocus(): Promise<void> {
    this.buttonElRef?.focus();
  }

  private handleShowTooltip = (): void => {
    if (this.disabled) {
      return;
    }

    this.tooltipController.show();
  };

  private handleHideTooltip = (): void => {
    this.tooltipController.hide();
  };

  @Watch("label")
  @Watch("tooltip")
  tooltipWatcher(): void {
    this.warnIfTooltipNotInLabel();
  }

  private warnIfTooltipNotInLabel(): void {
    if (this.tooltip && !` ${this.label ?? ""} `.includes(` ${this.tooltip} `)) {
      console.warn(`Icon Button: tooltip "${this.tooltip}" does not appear in label "${this.label ?? ""}"`);
    }
  }

  componentWillLoad(): void {
    this.warnIfTooltipNotInLabel();
  }

  disconnectedCallback(): void {
    this.tooltipController.dispose();
  }

  componentDidRender(): void {
    if (this.buttonElRef) {
      // Stencil's DOM types do not yet include ARIA element reflection properties.
      Object.assign(this.buttonElRef, {
        ariaControlsElements: this.controlsElement ? [this.controlsElement] : null,
        ariaDescribedByElements: this.describedByElement ? [this.describedByElement] : null,
      });
    }
  }

  private handleClick = (event: MouseEvent): void => {
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
          {this.tooltip || this.label}
        </Tooltip>
      </button>
    );
  }
}
