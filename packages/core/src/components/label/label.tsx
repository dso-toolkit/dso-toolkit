import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Fragment,
  Listen,
  Method,
  Prop,
  State,
  Watch,
  h,
} from "@stencil/core";
import clsx from "clsx";
import debounce from "debounce";

import { LabelStatus } from "./label.interfaces";

const resizeObserver = new ResizeObserver(
  debounce((entries: ResizeObserverEntry[]) => {
    entries.forEach(({ target }) => {
      if (isDsoLabelComponent(target)) {
        target._truncateLabel();
      }
    });
  }, 150),
);

function isDsoLabelComponent(element: Element): element is HTMLDsoLabelElement {
  return element.tagName === "DSO-LABEL";
}

function hasEllipses(el: HTMLElement): boolean {
  return el.scrollWidth > el.clientWidth;
}

@Component({
  tag: "dso-label",
  styleUrl: "label.scss",
  shadow: true,
})
export class Label implements ComponentInterface {
  private labelContent: HTMLSpanElement | undefined;

  private mutationObserver?: MutationObserver;

  @Element()
  private host!: HTMLDsoLabelElement;

  /**
   * For compact Label
   */
  @Prop()
  compact?: boolean;

  /**
   * Shows a button that can be used to remove the Label.
   */
  @Prop({ reflect: true })
  removable?: boolean;

  /**
   * The status of this Label.
   */
  @Prop()
  status?: LabelStatus;

  /**
   * Emitted when the user activates the remove button.
   */
  @Event()
  dsoRemoveClick!: EventEmitter<MouseEvent>;

  @State()
  removeHover?: boolean;

  @State()
  removeFocus?: boolean;

  /**
   * Whether the Label is allowed to truncate the contents if it does not fit the container element.
   */
  @Prop()
  truncate?: boolean;

  @State()
  textHover?: boolean;

  @State()
  textFocus?: boolean;

  @State()
  isTruncated = false;

  @State()
  labelText = "";

  @Watch("removable")
  watchRemovable(removable: boolean) {
    if (removable) {
      this.startMutationObserver();
    } else {
      this.stopMutationObserver();
    }
  }

  @Watch("truncate")
  watchTruncate(truncate: boolean) {
    if (truncate) {
      this.startTruncate();
    } else {
      this.stopTruncate();
    }
  }

  @Listen("keydown", { target: "document" })
  keyDownListener(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.textHover = false;
      this.textFocus = false;
    }
  }

  /**
   * @internal
   */
  @Method()
  async _truncateLabel() {
    setTimeout(() => {
      this.isTruncated = !!this.labelContent && hasEllipses(this.labelContent);
    });
  }

  private syncLabelText() {
    this.labelText = this.host.textContent?.trim() ?? "";
  }

  componentDidLoad() {
    if (this.truncate) {
      this.startTruncate();
    }

    if (this.removable) {
      this.startMutationObserver();
    }
  }

  disconnectedCallback() {
    this.stopTruncate();

    this.stopMutationObserver(true);
  }

  /** The mutationObserver fetches the text placed inside the label, this is then used for the remove button and tooltip. */
  private startMutationObserver(): void {
    this.mutationObserver = new MutationObserver(() => this.syncLabelText());

    this.mutationObserver.observe(this.host, {
      characterData: true,
      childList: true,
      subtree: true,
      attributes: true,
    });

    this.syncLabelText();
  }

  private stopMutationObserver(force = false): void {
    if (force || !(this.truncate && this.removable)) {
      this.mutationObserver?.disconnect();

      delete this.mutationObserver;
    }
  }

  private startTruncate(): void {
    resizeObserver.observe(this.host);
    this.startMutationObserver();
    this._truncateLabel();
  }

  private stopTruncate(): void {
    resizeObserver.unobserve(this.host);
    this.stopMutationObserver();
    this.isTruncated = false;
  }

  render() {
    return (
      <Fragment>
        <span
          aria-describedby="toggle-anchor"
          class={clsx("dso-label", {
            [`dso-label-${this.status}`]: this.status,
            "dso-compact": this.compact && !this.removable,
            "dso-hover": this.removeHover || this.removeFocus,
          })}
        >
          <slot name="symbol"></slot>
          <span
            class={clsx("dso-label-content", {
              "dso-truncate": !!this.truncate,
            })}
            ref={(element) => (this.labelContent = element)}
            tabindex={this.truncate && this.isTruncated ? 0 : undefined}
            onMouseEnter={() => (this.textHover = true)}
            onMouseLeave={() => (this.textHover = false)}
            onFocus={() => (this.textFocus = true)}
            onBlur={() => (this.textFocus = false)}
          >
            <slot></slot>
          </span>
          {this.removable && (
            <button
              type="button"
              onClick={(e) => this.dsoRemoveClick.emit(e)}
              onMouseEnter={() => (this.removeHover = true)}
              onMouseLeave={() => (this.removeHover = false)}
              onFocus={() => (this.removeFocus = true)}
              onBlur={() => (this.removeFocus = false)}
            >
              <span class="sr-only">Verwijder: {this.labelText}</span>
              <dso-icon icon="times"></dso-icon>
            </button>
          )}
        </span>
        {this.isTruncated && (
          <dso-tooltip
            stateless
            id="toggle-anchor"
            active={this.textHover || this.textFocus}
            position="top"
            strategy="absolute"
          >
            {this.labelText}
          </dso-tooltip>
        )}
      </Fragment>
    );
  }
}
