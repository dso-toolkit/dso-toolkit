import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  State,
  forceUpdate,
  h,
} from "@stencil/core";
import debounce from "debounce";

import { TooltipController } from "../../../functional-components/tooltip/tooltip.controller";
import { Tooltip } from "../../../functional-components/tooltip/tooltip.functional-component";
import {
  Wijzigactie,
  WrapWijzigactie,
} from "../../../functional-components/wrap-wijzigactie/wrap-wijzigactie.functional-component";

const resizeObserver = new ResizeObserver(
  debounce((entries: ResizeObserverEntry[]) => {
    entries.forEach(({ target }) => {
      if (isDsoPlekinfoCardItemComponent(target)) {
        target._checkTruncation();
      }
    });
  }, 150),
);

const activeInstances = new Set<PlekinfoCardItem>();

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  activeInstances.forEach((instance) => instance._hideTooltips());
});

function isDsoPlekinfoCardItemComponent(element: Element): element is HTMLDsoPlekinfoCardItemElement {
  return element.tagName === "DSO-PLEKINFO-CARD-ITEM";
}

function hasEllipses(el: HTMLElement): boolean {
  return el.scrollWidth > el.clientWidth;
}

/**
 * @slot symbol - An optional slot to place a symbol in, representing the plekinfo item.
 * @slot label - The label of the plekinfo item.
 * @slot sublabel - An optional sublabel of the plekinfo item.
 * @slot meta - An optional label badge displayed after the label and sublabel.
 */
@Component({
  tag: "dso-plekinfo-card-item",
  styleUrl: "plekinfo-card-item.scss",
  shadow: true,
})
export class PlekinfoCardItem implements ComponentInterface {
  private labelElRef?: HTMLDivElement;
  private sublabelElRef?: HTMLDivElement;
  private mutationObserver?: MutationObserver;
  private labelTooltipElRef?: HTMLDivElement;
  private labelTooltipArrowElRef?: HTMLSpanElement;
  private sublabelTooltipElRef?: HTMLDivElement;
  private sublabelTooltipArrowElRef?: HTMLSpanElement;

  private labelTooltipController = new TooltipController({
    getReferenceElement: () => this.labelElRef,
    getTipElement: () => this.labelTooltipElRef,
    getTipArrowElement: () => this.labelTooltipArrowElRef,
    getPlacement: () => "top",
  });

  private sublabelTooltipController = new TooltipController({
    getReferenceElement: () => this.sublabelElRef,
    getTipElement: () => this.sublabelTooltipElRef,
    getTipArrowElement: () => this.sublabelTooltipArrowElRef,
    getPlacement: () => "top",
  });

  @Element()
  private host!: HTMLDsoPlekinfoCardItemElement;

  /**
   * An optional 'wijzigactie' that signals if the plekinfo item is added or removed.
   */
  @Prop({ reflect: true })
  wijzigactie?: Wijzigactie;

  /**
   * Makes the PlekinfoCardItem active, giving it a persistent background color.
   */
  @Prop({ reflect: true })
  active?: boolean;

  @State()
  labelTruncated = false;

  @State()
  sublabelTruncated = false;

  @State()
  labelText = "";

  @State()
  sublabelText = "";

  /**
   * Emitted when the user hovers the item, similar to `dso-map-layer-object`'s mouse events.
   */
  @Event()
  dsoPlekinfoCardItemHover!: EventEmitter<void>;

  /**
   * Emitted when the item, or any of its slotted content, receives focus.
   */
  @Event()
  dsoPlekinfoCardItemFocus!: EventEmitter<void>;

  /** Queries the host's light DOM directly, so it's already correct on the first render. */
  private get metaSlottedElement(): HTMLElement | null {
    return this.host.querySelector('[slot="meta"]');
  }

  private get sublabelSlottedElement(): HTMLElement | null {
    return this.host.querySelector('[slot="sublabel"]');
  }

  private handleHostMouseEnter = () => {
    this.dsoPlekinfoCardItemHover.emit();
  };

  /** `focusin` bubbles (unlike `focus`), so it also fires when the label, sublabel or meta content is focused. */
  private handleHostFocusIn = () => {
    this.dsoPlekinfoCardItemFocus.emit();
  };

  /**
   * @internal
   */
  @Method()
  async _checkTruncation() {
    setTimeout(() => {
      this.labelTruncated = !!this.labelElRef && hasEllipses(this.labelElRef);
      this.sublabelTruncated = !!this.sublabelElRef && hasEllipses(this.sublabelElRef);
    });
  }

  private syncLabelText() {
    this.labelText = this.labelElRef?.textContent?.trim() ?? "";
    this.sublabelText = this.sublabelElRef?.textContent?.trim() ?? "";
  }

  componentDidLoad() {
    resizeObserver.observe(this.host);
    activeInstances.add(this);
    this.startMutationObserver();
    this._checkTruncation();
  }

  disconnectedCallback() {
    resizeObserver.unobserve(this.host);
    activeInstances.delete(this);
    this.mutationObserver?.disconnect();
    this.labelTooltipController.dispose();
    this.sublabelTooltipController.dispose();
  }

  /**
   * @internal Called by the shared document keydown listener when Escape is pressed.
   */
  @Method()
  async _hideTooltips(): Promise<void> {
    this.handleHideLabelTooltip();
    this.handleHideSublabelTooltip();
  }

  private handleShowLabelTooltip = () => {
    this.labelTooltipController.show();
  };

  private handleHideLabelTooltip = () => {
    this.labelTooltipController.hide();
  };

  private handleShowSublabelTooltip = () => {
    this.sublabelTooltipController.show();
  };

  private handleHideSublabelTooltip = () => {
    this.sublabelTooltipController.hide();
  };

  private startMutationObserver(): void {
    this.mutationObserver = new MutationObserver(() => {
      this.syncLabelText();
      forceUpdate(this.host);
    });

    this.mutationObserver.observe(this.host, {
      characterData: true,
      childList: true,
      subtree: true,
      attributes: true,
    });

    this.syncLabelText();
  }

  render() {
    return (
      <Host onMouseEnter={this.handleHostMouseEnter} onFocusin={this.handleHostFocusIn}>
        <WrapWijzigactie wijzigactie={this.wijzigactie} class="dso-plekinfo-card-item-container">
          <div>
            <slot name="symbol" />
          </div>

          <div class={{ content: true, "no-sublabel": this.sublabelSlottedElement === null }}>
            <div
              class="label"
              ref={(element) => (this.labelElRef = element)}
              tabindex={this.labelTruncated ? 0 : undefined}
              onMouseEnter={this.handleShowLabelTooltip}
              onMouseLeave={this.handleHideLabelTooltip}
              onFocus={this.handleShowLabelTooltip}
              onBlur={this.handleHideLabelTooltip}
            >
              <slot name="label" />
            </div>

            <div
              class="sublabel"
              ref={(element) => (this.sublabelElRef = element)}
              tabindex={this.sublabelTruncated ? 0 : undefined}
              onMouseEnter={this.handleShowSublabelTooltip}
              onMouseLeave={this.handleHideSublabelTooltip}
              onFocus={this.handleShowSublabelTooltip}
              onBlur={this.handleHideSublabelTooltip}
            >
              <slot name="sublabel" />
            </div>

            {this.metaSlottedElement && (
              <div class="meta">
                <slot name="meta" />
              </div>
            )}
          </div>
        </WrapWijzigactie>

        {this.labelTruncated && (
          <Tooltip
            tipElementRef={(element) => (this.labelTooltipElRef = element)}
            tipArrowElementRef={(element) => (this.labelTooltipArrowElRef = element)}
          >
            <span>{this.labelText}</span>
          </Tooltip>
        )}

        {this.sublabelTruncated && (
          <Tooltip
            tipElementRef={(element) => (this.sublabelTooltipElRef = element)}
            tipArrowElementRef={(element) => (this.sublabelTooltipArrowElRef = element)}
          >
            <span>{this.sublabelText}</span>
          </Tooltip>
        )}
      </Host>
    );
  }
}
