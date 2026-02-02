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

  @Element()
  host!: HTMLDsoInfoButtonElement;

  /**
   * Whether the InfoButton is active.
   */
  @Prop({ mutable: true, reflect: true })
  active?: boolean;

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
   * The placement of the Toggle tip on click.
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

  private setActive(active: boolean, originalEvent?: MouseEvent) {
    this.active = active;

    if (!this.toggletipSlottedElement && originalEvent) {
      this.dsoToggle.emit({ originalEvent, active });
    }
  }

  private handleToggle(originalEvent: MouseEvent) {
    this.setActive(!this.active, originalEvent);
  }

  private focusOutHandler = (event: FocusEvent) => {
    if (this.active && !this.host.contains(event.relatedTarget as Node)) {
      this.setActive(false);
    }
  };

  private keyDownHandler = (event: KeyboardEvent) => {
    if (!this.active) return;

    if (event.key === "Escape") {
      this.setActive(false);
    }
  };

  private cleanupTooltip() {
    this.cleanUp?.();
    this.cleanUp = undefined;
  }

  get toggletipSlottedElement() {
    return this.host.querySelector("[slot='toggletip']");
  }

  componentDidRender() {
    if (this.toggletipSlottedElement) {
      if (this.active && this.button && this.toggletipElRef && this.toggletipArrowElRef) {
        this.toggletipElRef?.showPopover();

        this.cleanUp = positionTooltip({
          referenceElement: this.button!,
          tipRef: this.toggletipElRef!,
          tipArrowRef: this.toggletipArrowElRef!,
          placementTip: this.toggletipPlacement,
          snuckInViewport: true,
        });
      } else {
        this.toggletipElRef?.hidePopover();

        if (!this.active && this.cleanUp) {
          this.cleanupTooltip();
        }
      }
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
            icon={this.active || this.hover ? "info-active" : "info"}
            ref={(element) => (this.button = element)}
          />
        ) : (
          // ToDo: remove this part in https://github.com/dso-toolkit/dso-toolkit/issues/3350. Tertiary on color already working
          <button
            type="button"
            class="dso-info-secondary"
            aria-expanded={typeof this.active === "boolean" ? this.active.toString() : undefined}
            onClick={(e) => this.handleToggle(e)}
            ref={(element) => (this.buttonSecondary = element)}
          >
            <dso-icon icon={this.active || this.hover ? "info-active" : "info"}></dso-icon>
            <span class="sr-only">{this.label}</span>
          </button>
        )}
        {this.toggletipSlottedElement !== null && (
          <Tooltip
            tipElementRef={(element) => (this.toggletipElRef = element)}
            tipArrowElementRef={(element) => (this.toggletipArrowElRef = element)}
            visible={!!this.active}
            onAfterHidden={() => {}}
          >
            <dso-scrollable>
              <slot name="toggletip" />
            </dso-scrollable>
          </Tooltip>
        )}
      </Host>
    );
  }
}
