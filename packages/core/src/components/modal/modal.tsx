import { Component, ComponentInterface, Element, Event, EventEmitter, h, Prop, State } from "@stencil/core";
import { v4 } from "uuid";

import { getActiveElement } from "../../utils/get-active-element";
import { i18n } from "../../utils/i18n";

import { ModalCloseEvent } from "./modal.interfaces";
import { translations } from "./modal.i18n";

@Component({
  tag: "dso-modal",
  styleUrl: "modal.scss",
  shadow: true,
})
export class Modal implements ComponentInterface {
  private htmlDialogElement?: HTMLDialogElement;

  @Element()
  host!: HTMLDsoModalElement;

  @State()
  ariaId = v4();

  /**
   * when set the modal will be shown in fullscreen.
   */
  @Prop({ reflect: true })
  fullscreen?: boolean;

  /**
   * The title of the Modal.
   */
  @Prop()
  modalTitle?: string;

  /**
   * the role for the modal `dialog` | `alert` | `alertdialog`.
   */
  @Prop()
  // eslint-disable-next-line @stencil-community/reserved-member-names
  role: string | null = "dialog";

  /**
   * The element to return focus to after the modal is closed.
   *
   * * `undefined` will return focus to the previously focused element (default).
   * * `false` will not return focus to any element.
   * * or, provide your own `HTMLElement` that will receive focus upon closing.
   */
  @Prop()
  returnFocus: false | HTMLElement | undefined = undefined;

  /**
   * when `false` the close button in the header will not be rendered. Defaults to `true`.
   *
   * Needs `modalTitle` to be set.
   */
  @Prop()
  showCloseButton = true;

  private returnFocusElement: HTMLElement | undefined;

  /**
   * Emitted when the user wants to close the Modal.
   */
  @Event()
  dsoClose!: EventEmitter<ModalCloseEvent>;

  get hasFooter() {
    return this.host.querySelector("[slot='footer']") !== null;
  }

  private text = i18n(() => this.host, translations);

  componentDidLoad(): void {
    if (this.htmlDialogElement?.isConnected) {
      const activeElement = getActiveElement();
      if (activeElement instanceof HTMLElement) {
        this.returnFocusElement = activeElement;
      }

      this.htmlDialogElement.showModal();
    }
  }

  disconnectedCallback(): void {
    this.htmlDialogElement?.close();

    if (this.returnFocus === false) {
      return;
    }

    (this.returnFocus ?? this.returnFocusElement)?.focus();
  }

  render() {
    return (
      <dialog
        class="dso-modal"
        role={this.role ?? undefined}
        aria-modal="true"
        aria-labelledby={this.ariaId}
        ref={(element) => (this.htmlDialogElement = element)}
        onCancel={(e) => {
          e.preventDefault();

          this.dsoClose.emit({ originalEvent: e });
        }}
      >
        <div class="dso-dialog" role="document">
          {this.modalTitle ? (
            <div class="dso-header">
              <h2 id={this.ariaId}>{this.modalTitle}</h2>
              {this.showCloseButton && (
                <button type="button" class="dso-close" onClick={(e) => this.dsoClose.emit({ originalEvent: e })}>
                  <dso-icon icon="times"></dso-icon>
                  <span class="sr-only">{this.text("close")}</span>
                </button>
              )}
            </div>
          ) : (
            <span class="sr-only" id={this.ariaId}>
              {this.text("dialog")}
            </span>
          )}

          <dso-scrollable>
            <div class="dso-body" tabIndex={0}>
              <slot name="body" />
            </div>
          </dso-scrollable>

          {this.hasFooter && (
            <div class="dso-footer">
              <slot name="footer" />
            </div>
          )}
        </div>
      </dialog>
    );
  }
}
