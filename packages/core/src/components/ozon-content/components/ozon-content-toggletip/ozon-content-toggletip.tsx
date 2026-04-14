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
export class ozonContentToggletip implements ComponentInterface {
  private cleanUp: TooltipClean | undefined;
  private container: HTMLButtonElement | undefined;
  private tooltip: HTMLElement | undefined;
  private tooltipArrow: HTMLElement | undefined;
  private contentSlot: HTMLSlotElement | undefined;

  @Element()
  host!: HTMLDsoOzonContentToggletipElement;
  /**
   * The alias of the icon in the button.
   */
  @Prop({ reflect: true })
  icon?: IconAlias;

  @State()
  active = false;

  @State()
  announcement = "";

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
    this.announcement = "";

    if (!this.active) {
      return;
    }

    requestAnimationFrame(() => {
      this.announcement =
        this.contentSlot
          ?.assignedNodes({ flatten: true })
          .map((n) => n.textContent || "")
          .join(" ")
          .replace(/\s+/g, " ")
          .trim() || "Toelichting geopend";
    });
  };

  private keyDownHandler = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Escape":
        if (this.active) {
          this.toggle();
        }
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
        this.tooltip.showPopover();
      } else {
        this.tooltip.hidePopover();
        this.cleanupTooltip();
      }
    }
  }

  disconnectedCallback() {
    this.cleanupTooltip();
  }

  connectedCallback() {
    this.host.setAttribute("role", "none");
  }

  private cleanupTooltip() {
    this.cleanUp?.();
    this.cleanUp = undefined;
  }

  render() {
    return (
      <Fragment>
        <button
          type="button"
          class="toggletip-button"
          aria-expanded={this.active ? "true" : "false"}
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
        </button>
        <span class="sr-only" aria-live="polite" aria-atomic="true">
          {this.announcement}
        </span>
        <Tooltip
          visible={this.active}
          onAfterHidden={() => {}}
          tipElementRef={(element) => (this.tooltip = element)}
          tipArrowElementRef={(element) => (this.tooltipArrow = element)}
        >
          <slot ref={(element) => (this.contentSlot = element)} />
        </Tooltip>
      </Fragment>
    );
  }
}
