import { Component, ComponentInterface, Element, Event, EventEmitter, Fragment, Prop, State, h } from "@stencil/core";
import { v4 } from "uuid";

import { getActiveElement } from "../../utils/get-active-element";
import { i18n } from "../../utils/i18n";

import { Body } from "./functional-components/body";
import { Footer } from "./functional-components/footer";
import { Header } from "./functional-components/header";
import { translations } from "./modal.i18n";
import { ModalCloseEvent } from "./modal.interfaces";

@Component({
  tag: "dso-modal",
  styleUrl: "modal.scss",
  shadow: true,
})
export class Modal implements ComponentInterface {
  private htmlDialogElement?: HTMLDialogElement;
  private startedMouseDownOutsideDialog = false;
  private endedMouseUpOutsideDialog = false;
  private readonly narrowViewBreakpoint = 768;
  private readonly mediaCondition = `(min-width: ${this.narrowViewBreakpoint}px)`;

  @Element()
  host!: HTMLDsoModalElement;

  @State()
  ariaId = v4();

  @State()
  narrowView = window.innerWidth < this.narrowViewBreakpoint;

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
  dialogRole: string | null = "dialog";

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
   * when `false` the close button in the header will not be rendered.
   *
   * Needs `modalTitle` to be set.
   */
  @Prop()
  closable = false;

  private returnFocusElement: HTMLElement | undefined;

  /**
   * Emitted when the user:
   * - clicks the close button
   * - dismisses the Modal with the Escape button
   * - clicks or taps outside the Modal
   */
  @Event()
  dsoClose!: EventEmitter<ModalCloseEvent>;

  get hasFooter() {
    return this.host.querySelector("[slot='footer']") !== null;
  }

  private text = i18n(() => this.host, translations);

  private readonly changeListener = (largeScreen: MediaQueryListEvent) => (this.narrowView = !largeScreen.matches);

  componentDidLoad(): void {
    if (this.htmlDialogElement?.isConnected) {
      const activeElement = getActiveElement();
      if (activeElement instanceof HTMLElement) {
        this.returnFocusElement = activeElement;
      }

      this.htmlDialogElement.showModal();
    }
  }

  connectedCallback() {
    window.matchMedia(this.mediaCondition).addEventListener("change", this.changeListener);
  }

  disconnectedCallback(): void {
    window.matchMedia(this.mediaCondition).removeEventListener("change", this.changeListener);

    this.htmlDialogElement?.close();

    if (this.returnFocus === false) {
      return;
    }

    (this.returnFocus ?? this.returnFocusElement)?.focus();
  }

  private handleDialogMouseDown(e: MouseEvent) {
    this.startedMouseDownOutsideDialog = e.target === this.htmlDialogElement;
  }

  private handleDialogMouseUp(e: MouseEvent) {
    this.endedMouseUpOutsideDialog = e.target === this.htmlDialogElement;
  }

  private handleDialogClick(e: MouseEvent) {
    if (!this.closable) {
      return;
    }

    if (this.startedMouseDownOutsideDialog && this.endedMouseUpOutsideDialog && e.target === this.htmlDialogElement) {
      this.dsoClose.emit({ originalEvent: e });
    }
  }

  private blockEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();

      if (this.closable) {
        this.dsoClose.emit({ originalEvent: e });
      }
    }
  };

  render() {
    return (
      <dialog
        class="dso-modal"
        role={this.dialogRole ?? undefined}
        aria-modal="true"
        aria-labelledby={this.ariaId}
        ref={(element) => (this.htmlDialogElement = element)}
        onMouseDown={(e) => this.handleDialogMouseDown(e)}
        onMouseUp={(e) => this.handleDialogMouseUp(e)}
        onClick={(e) => this.handleDialogClick(e)}
        onKeyDown={(e) => this.blockEscapeKey(e)}
      >
        <div class="dso-dialog">
          {this.narrowView ? (
            <dso-scrollable>
              <div class="modal-scrollable">
                <Header
                  modalTitle={this.modalTitle}
                  closable={this.closable}
                  ariaId={this.ariaId}
                  text={this.text}
                  dsoClose={this.dsoClose}
                />
                <Body />
                {this.hasFooter && <Footer />}
              </div>
            </dso-scrollable>
          ) : (
            <Fragment>
              <Header
                modalTitle={this.modalTitle}
                closable={this.closable}
                ariaId={this.ariaId}
                text={this.text}
                dsoClose={this.dsoClose}
              />
              <dso-scrollable>
                <Body />
              </dso-scrollable>
              {this.hasFooter && <Footer />}
            </Fragment>
          )}
        </div>
      </dialog>
    );
  }
}
