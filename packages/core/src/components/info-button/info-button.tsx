import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Host,
  Listen,
  Method,
  Prop,
  State,
  h,
} from "@stencil/core";

import { positionTooltip } from "../../functional-components/tooltip/position-tooltip.function";
import { Tooltip } from "../../functional-components/tooltip/tooltip.functional-component";
import { TooltipClean, TooltipPlacement } from "../../functional-components/tooltip/tooltip.interfaces";

import { InfoButtonToggleEvent } from "./info-button.interfaces";

@Component({
  tag: "dso-info-button",
  shadow: true,
  styleUrl: "info-button.scss",
})
export class InfoButton implements ComponentInterface {
  private button?: HTMLDsoIconButtonElement;
  private toggletipElRef?: HTMLDivElement;
  private toggletipArrowElRef?: HTMLSpanElement;
  private cleanUpFunction: TooltipClean | undefined;
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
   * The label.
   */
  @Prop({ reflect: true })
  label = "Toelichting bij optie";

  /**
   * The placement of the Toggletip on click.
   */
  @Prop({ reflect: true })
  toggletipPlacement: TooltipPlacement = "top";

  /**
   * Emitted when the user activates the Info Button.
   */
  @Event()
  dsoToggle!: EventEmitter<InfoButtonToggleEvent>;

  @State()
  toggletipActive = false;

  @State()
  hasToggletip = false;

  /**
   * Listen early to `focusin` at document level and only closes when `composedPath()` shows focus moved outside this component; this is more reliable in Safari.
   */
  @Listen("focusin", { target: "document", capture: true })
  onDocumentFocusIn(event: FocusEvent) {
    this.handleOutsideEvent(event);
  }

  /**
   * Also catches clicks without focus via `pointerdown` and closes when `composedPath()` shows interaction outside the component, including Safari.
   */
  @Listen("pointerdown", { target: "document", capture: true })
  onDocumentPointerDown(event: PointerEvent) {
    this.handleOutsideEvent(event);
  }

  /**
   * To set focus to the toggle button.
   */
  @Method()
  async setFocus() {
    this.button?.setFocus?.();
  }

  private handleOutsideEvent = (event: Event) => {
    if (!this.toggletipActive) {
      return;
    }

    if (!event.composedPath().includes(this.host)) {
      this.closeToggletip();
    }
  };

  private handleToggle(originalEvent: MouseEvent) {
    if (this.hasToggletip) {
      this.toggletipActive = !this.toggletipActive;
    } else {
      this.dsoToggle.emit({ originalEvent, active: !this.active });
    }
  }

  private keyDownHandler = (event: KeyboardEvent) => {
    if (!this.toggletipActive) {
      return;
    }

    if (event.key === "Escape") {
      this.closeToggletip();
    }
  };

  private closeToggletip() {
    this.toggletipActive = false;

    if (this.toggletipElRef?.isConnected && this.toggletipElRef.matches(":popover-open")) {
      this.toggletipElRef.hidePopover();
    }

    this.cleanUpTooltip();
  }

  private cleanUpTooltip() {
    this.cleanUpFunction?.();
    this.cleanUpFunction = undefined;
  }

  componentDidRender() {
    if (!this.hasToggletip) {
      this.toggletipElRef?.hidePopover();
      this.cleanUpTooltip();
      return;
    }

    if (
      !this.cleanUpFunction &&
      this.toggletipActive &&
      this.button &&
      this.toggletipElRef &&
      this.toggletipArrowElRef
    ) {
      this.cleanUpFunction = positionTooltip({
        referenceElement: this.button,
        tipRef: this.toggletipElRef,
        tipArrowRef: this.toggletipArrowElRef,
        placementTip: this.toggletipPlacement,
        restrictContentElement: this.restrictContentElement,
      });
    }

    if (this.cleanUpFunction) {
      if (this.toggletipActive) {
        this.toggletipElRef?.showPopover();
      } else {
        this.closeToggletip();
      }
    }
  }

  connectedCallback(): void {
    this.mutationObserver = new MutationObserver(() => {
      this.hasToggletip = !!this.host.querySelector("[slot='toggletip']");
    });

    this.mutationObserver.observe(this.host, {
      childList: true,
      attributes: true,
    });
  }

  disconnectedCallback() {
    this.closeToggletip();
    this.mutationObserver?.disconnect();

    delete this.mutationObserver;
  }

  render() {
    return (
      <Host onKeyDown={this.keyDownHandler}>
        <dso-icon-button
          variant="tertiary"
          label={this.label}
          onDsoClick={(e) => this.handleToggle(e.detail.originalEvent)}
          icon={this.active || this.toggletipActive ? "info-solid" : "info-outline"}
          ref={(element) => (this.button = element)}
          expanded={this.hasToggletip ? this.toggletipActive : undefined}
        />
        {this.hasToggletip && (
          <Tooltip
            tipElementRef={(element) => (this.toggletipElRef = element)}
            tipArrowElementRef={(element) => (this.toggletipArrowElRef = element)}
          >
            <dso-scrollable ref={(element) => (this.restrictContentElement = element)} aria-live="polite">
              <slot name="toggletip" />
            </dso-scrollable>
          </Tooltip>
        )}
      </Host>
    );
  }
}
