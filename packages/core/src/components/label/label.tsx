import {
  Component,
  h,
  Prop,
  Event,
  EventEmitter,
  State,
  ComponentInterface,
  Element,
  Watch,
  Host,
} from "@stencil/core";
import clsx from "clsx";

function hasEllipses(el: HTMLElement): boolean {
  return el.scrollWidth > el.clientWidth;
}

@Component({
  tag: "dso-label",
  styleUrl: "label.scss",
  shadow: true,
})
export class Label implements ComponentInterface {
  private mutationObserver = new MutationObserver(() => {
    this.labelText = this.host.innerText;

    if (this.truncate) {
      this.truncateLabel();
    }
  });

  private resizeObserver = new ResizeObserver(() => this.truncateLabel());

  private labelContent: HTMLSpanElement | undefined;

  private keydownListenerActive = false;

  @Element()
  private host!: HTMLElement;

  @Prop()
  compact?: boolean;

  @Prop()
  removable?: boolean;

  @Prop()
  status?: "primary" | "info" | "success" | "warning" | "danger" | "error" | "bright";

  @State()
  removeHover?: boolean;

  @State()
  removeFocus?: boolean;

  @Prop()
  truncate?: boolean;

  @State()
  textHover?: boolean;

  @State()
  textFocus?: boolean;

  @State()
  truncatedContent?: string | null;

  @State()
  labelText?: string;

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

  private static statusMap = new Map<string, string>([
    ["info", "Opmerking"],
    ["success", "Gelukt"],
    ["warning", "Waarschuwing"],
    ["danger", "Fout"],
  ]);

  truncateLabel() {
    setTimeout(() => {
      if (this.labelContent) {
        this.truncatedContent = hasEllipses(this.labelContent) ? this.host.innerText : undefined;
      }
    });
  }

  componentDidLoad() {
    this.labelText = this.host.innerText;

    this.mutationObserver.observe(this.host, {
      attributes: true,
      subtree: true,
    });

    if (this.truncate) {
      this.startTruncate();
    }
  }

  disconnectedCallback() {
    this.mutationObserver?.disconnect();
    this.stopTruncate();
  }

  startTruncate(): void {
    this.resizeObserver.observe(this.host);

    this.truncateLabel();
  }

  stopTruncate(): void {
    document.removeEventListener("keydown", this.keyDownListener);

    this.resizeObserver.unobserve(this.host);
    this.truncatedContent = undefined;
    this.keydownListenerActive = false;
  }

  keyDownListener = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      this.textHover = false;
      this.textFocus = false;
    }
  };

  render() {
    const status = this.status && Label.statusMap.get(this.status);

    return (
      <Host
        aria-roledescription={
          this.truncate && this.truncatedContent
            ? "Deze tekst is visueel afgekapt en wordt volledig zichtbaar bij focus."
            : undefined
        }
      >
        <span
          aria-describedby="toggle-anchor"
          class={clsx("dso-label", {
            [`dso-label-${this.status}`]: this.status,
            "dso-compact": this.compact && !this.removable,
            "dso-hover": this.removeHover || this.removeFocus,
          })}
        >
          <slot name="symbol"></slot>
          {status && <span class="sr-only">{status}: </span>}
          <span
            class={clsx("dso-label-content", {
              "dso-truncate": !!this.truncate,
            })}
            ref={(element) => (this.labelContent = element)}
            tabindex={this.truncate && this.truncatedContent ? 0 : -1}
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
        <dso-tooltip
          stateless
          id="toggle-anchor"
          active={!!this.truncatedContent && (this.textHover || this.textFocus)}
          position="top"
          strategy="absolute"
        >
          {this.truncatedContent}
        </dso-tooltip>
      </Host>
    );
  }
}
