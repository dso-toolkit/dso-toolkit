import { Component, Element, Event, EventEmitter, Host, Method, Prop, State, forceUpdate, h } from "@stencil/core";

import { positionTooltip } from "../../functional-components/tooltip/position-tooltip.function";
import { Tooltip } from "../../functional-components/tooltip/tooltip.functional-component";
import { TooltipClean, TooltipPlacement } from "../../functional-components/tooltip/tooltip.interfaces";

import { InfoButtonToggleEvent } from "./info-button.interfaces";

@Component({
  tag: "dso-info-button",
  shadow: true,
  styleUrl: "info-button.scss",
})
export class InfoButton {
  private button?: HTMLDsoIconButtonElement;
  private buttonSecondary?: HTMLButtonElement;
  private toggletipElRef?: HTMLDivElement;
  private toggletipArrowElRef?: HTMLSpanElement;
  private cleanUp: TooltipClean | undefined;
  private mutationObserver?: MutationObserver;
  private restrictContentElement?: HTMLElement;

  @Element()
  host!: HTMLDsoInfoButtonElement;

  /**
   * Whether the InfoButton is active.
   */
  @Prop({ reflect: true })
  active = false;

  /**
   * For secondary Info Button.
   */
  @Prop()
  secondary?: boolean;

  /**
   * The label.
   */
  @Prop()
  label = "Toelichting bij optie";

  /**
   * The placement of the Toggletip on click.
   */
  @Prop()
  toggletipPlacement: TooltipPlacement = "top";

  /**
   * Emitted when the user activates the Info Button.
   */
  @Event()
  dsoToggle!: EventEmitter<InfoButtonToggleEvent>;

  @State()
  hover = false;

  @State()
  toggletipActive = false;

  /**
   * To set focus to the toggle button.
   */
  @Method()
  async setFocus() {
    if (this.secondary) {
      this.buttonSecondary?.focus();
    } else {
      this.button?.setFocus?.();
    }
  }

  private get isToggletipMode(): boolean {
    return !!this.host.querySelector("[slot='toggletip']");
  }

  private handleToggle(originalEvent: MouseEvent) {
    if (this.isToggletipMode) {
      this.toggletipActive = !this.toggletipActive;
      this.toggletipElRef?.showPopover();
    } else {
      this.dsoToggle.emit({ originalEvent, active: !this.active });
    }
  }

  private focusOutHandler = (event: FocusEvent) => {
    if (!this.host.contains(event.relatedTarget as Node)) {
      this.toggletipActive = false;
      this.toggletipElRef?.hidePopover();
    }
  };

  private keyDownHandler = (event: KeyboardEvent) => {
    if (!this.toggletipActive) return;

    if (event.key === "Escape") {
      this.toggletipActive = false;
      this.toggletipElRef?.hidePopover();
    }
  };

  private cleanupTooltip() {
    this.cleanUp?.();
    this.cleanUp = undefined;
  }

  componentDidRender() {
    if (!this.isToggletipMode) {
      this.toggletipElRef?.hidePopover();
      this.cleanupTooltip();
      return;
    }

    if (!this.cleanUp && this.toggletipActive && this.button && this.toggletipElRef && this.toggletipArrowElRef) {
      this.toggletipElRef?.showPopover();

      this.cleanUp = positionTooltip({
        referenceElement: this.button,
        tipRef: this.toggletipElRef,
        tipArrowRef: this.toggletipArrowElRef,
        placementTip: this.toggletipPlacement,
        forceVisible: true,
        restrictContentElement: this.restrictContentElement,
      });
    }
  }

  connectedCallback(): void {
    this.mutationObserver = new MutationObserver(() => {
      forceUpdate(this.host);
    });

    this.mutationObserver.observe(this.host, {
      childList: true,
      attributes: true,
    });
  }

  disconnectedCallback() {
    this.cleanupTooltip();
    this.mutationObserver?.disconnect();

    delete this.mutationObserver;
  }

  render() {
    return (
      <Host
        onMouseenter={() => (this.hover = true)}
        onMouseleave={() => (this.hover = false)}
        onKeydown={this.keyDownHandler}
        onFocusout={this.focusOutHandler}
      >
        {!this.secondary ? (
          <dso-icon-button
            variant="tertiary"
            label={this.label}
            onDsoClick={(e) => this.handleToggle(e.detail.originalEvent)}
            icon={this.active || this.hover || this.toggletipActive ? "info-active" : "info"}
            ref={(element) => (this.button = element)}
          />
        ) : (
          // ToDo: remove this part in https://github.com/dso-toolkit/dso-toolkit/issues/3350. Tertiary on color already working
          <button
            type="button"
            class="dso-info-secondary"
            aria-expanded={(this.active || this.toggletipActive).toString()}
            onClick={(e) => this.handleToggle(e)}
            ref={(element) => (this.buttonSecondary = element)}
          >
            <dso-icon icon={this.active || this.hover || this.toggletipActive ? "info-active" : "info"}></dso-icon>
            <span class="sr-only">{this.label}</span>
          </button>
        )}
        {this.isToggletipMode !== null && (
          <Tooltip
            tipElementRef={(element) => (this.toggletipElRef = element)}
            tipArrowElementRef={(element) => (this.toggletipArrowElRef = element)}
            visible={this.toggletipActive}
          >
            <dso-scrollable ref={(element) => (this.restrictContentElement = element)}>
              <slot name="toggletip" />
            </dso-scrollable>
          </Tooltip>
        )}
      </Host>
    );
  }
}
