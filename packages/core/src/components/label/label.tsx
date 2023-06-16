import {
  h,
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Fragment,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import clsx from "clsx";
import { debounce } from "debounce";

const resizeObserver = new ResizeObserver(
  debounce((entries) => {
    entries.forEach(({ target }) => {
      if (isDsoLabelComponent(target)) {
        target._truncateLabel();
      }
    });
  }, 150)
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

  private keydownListenerActive = false;

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
  @Prop()
  removable?: boolean;

  /**
   * The status of this Label.
   */
  @Prop()
  status?: "primary" | "info" | "success" | "warning" | "danger" | "error" | "bright" | "attention";

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
  isTruncated?: boolean;

  @State()
  labelText: string | null = null;

  /**
   * Emitted when the user activates the remove button.
   */
  @Event()
  dsoRemoveClick!: EventEmitter<MouseEvent>;

  @Watch("truncate")
  watchTruncate(truncate: boolean) {
    if (truncate) {
      this.startTruncate();
    } else {
      this.stopTruncate();
    }
  }

  @Watch("textHover")
  @Watch("textFocus")
  watchTooltipActive() {
    if (!this.keydownListenerActive && (this.textHover || this.textFocus)) {
      document.addEventListener("keydown", this.keyDownListener);
      this.keydownListenerActive = true;
    }

    if (!this.textHover && !this.textFocus) {
      document.removeEventListener("keydown", this.keyDownListener);
      this.keydownListenerActive = false;
    }
  }

  /**
   * @internal
   */
  @Method()
  async _truncateLabel() {
    setTimeout(() => {
      this.isTruncated = this.labelContent && hasEllipses(this.labelContent);
    });
  }

  private syncLabelText() {
    this.labelText = this.host.textContent;
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
  }

  /** The mutationObserver fetches the text placed inside the label, this is then used for the remove button and tooltip. */
  private startMutationObserver(): void {
    if (this.mutationObserver) {
      return;
    }

    this.mutationObserver = new MutationObserver((entries) => entries.forEach(() => this.syncLabelText()));

    this.mutationObserver.observe(this.host, {
      characterData: true,
      subtree: true,
      attributes: true,
    });

    this.labelText = this.host.textContent;
  }

  private startTruncate(): void {
    resizeObserver.observe(this.host);
    this.startMutationObserver();
    this._truncateLabel();
  }

  private stopTruncate(): void {
    document.removeEventListener("keydown", this.keyDownListener);

    resizeObserver.unobserve(this.host);
    this.isTruncated = undefined;
    this.keydownListenerActive = false;
  }

  private keyDownListener = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      this.textHover = false;
      this.textFocus = false;
    }
  };

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
