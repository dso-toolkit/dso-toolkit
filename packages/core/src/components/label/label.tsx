import { Component, ComponentInterface, Element, Event, EventEmitter, Prop, State, Watch, h } from "@stencil/core";
import { clsx } from "clsx";

import { LabelStatus } from "./label.interfaces";

/**
 * @slot - A slot for the label text or content.
 * @slot symbol - An optional slot for an icon or symbol displayed before the label text.
 */
@Component({
  tag: "dso-label",
  styleUrl: "label.scss",
  shadow: true,
})
export class Label implements ComponentInterface {
  private mutationObserver?: MutationObserver;

  @Element()
  private host!: HTMLDsoLabelElement;

  /** For compact Label */
  @Prop({ reflect: true })
  compact?: boolean;

  /** Shows a button that can be used to remove the Label. */
  @Prop({ reflect: true })
  removable?: boolean;

  /** The status of this Label. */
  @Prop({ reflect: true })
  status?: LabelStatus;

  /** Whether the Label is allowed to truncate the contents if it does not fit the container element. */
  @Prop({ reflect: true })
  truncate?: boolean;

  /** Emitted when the user activates the remove button. */
  @Event()
  dsoRemoveClick!: EventEmitter<MouseEvent>;

  @State()
  removeHover = false;

  @State()
  removeFocus = false;

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

  private syncLabelText = () => {
    this.labelText = this.host.textContent?.trim() ?? "";
  };

  componentWillLoad(): void {
    if (this.removable) {
      this.startMutationObserver();
    }
  }

  disconnectedCallback(): void {
    this.stopMutationObserver();
  }

  /** The MutationObserver tracks the label text used for the remove button. */
  private startMutationObserver(): void {
    if (!this.mutationObserver) {
      this.mutationObserver = new MutationObserver(this.syncLabelText);

      this.mutationObserver.observe(this.host, {
        characterData: true,
        childList: true,
        subtree: true,
      });

      this.syncLabelText();
    }
  }

  private stopMutationObserver(): void {
    this.mutationObserver?.disconnect();
    this.mutationObserver = undefined;
  }

  render() {
    return (
      <span
        class={clsx("dso-label", {
          [`dso-label-${this.status}`]: this.status,
          "dso-compact": this.compact && !this.removable,
          "dso-hover": this.removeHover || this.removeFocus,
        })}
      >
        <slot name="symbol"></slot>

        <span class="dso-label-content">
          {this.truncate ? (
            <dso-truncate>
              <slot></slot>
            </dso-truncate>
          ) : (
            <slot></slot>
          )}
        </span>

        {this.removable && (
          <dso-icon-button
            variant="tertiary"
            icon="cross"
            label={`Verwijder: ${this.labelText}`}
            onDsoClick={(e) => this.dsoRemoveClick.emit(e.detail.originalEvent)}
            onMouseEnter={() => (this.removeHover = true)}
            onMouseLeave={() => (this.removeHover = false)}
            onFocus={() => (this.removeFocus = true)}
            onBlur={() => (this.removeFocus = false)}
          />
        )}
      </span>
    );
  }
}
