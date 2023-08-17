import { h, Component, ComponentInterface, Element, Event, EventEmitter, Method, Prop, State } from "@stencil/core";
import { v4 } from "uuid";

import { DsoModalCloseEvent } from "./modal.interfaces";

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

  @State()
  hasFooter?: boolean;

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
  role: string | null = "dialog";

  /**
   * when `false` the close button in the header will not be rendered. Defaults to `true`.
   *
   * Needs `modalTitle` to be set.
   */
  @Prop()
  showCloseButton = true;

  /**
   * Emitted when the user wants to close the Modal.
   */
  @Event()
  dsoClose!: EventEmitter<DsoModalCloseEvent>;

  /**
   * Shows modal
   */
  @Method()
  async show(): Promise<void> {
    this.htmlDialogElement?.showModal();
  }

  /**
   * Closes modal
   */
  @Method()
  async close(): Promise<void> {
    this.htmlDialogElement?.close();
  }

  componentWillLoad(): void {
    this.hasFooter = this.host.querySelector("[slot='footer']") !== null;
  }

  componentDidLoad(): void {
    this.htmlDialogElement?.showModal();
    document.body.classList.add("dso-modal-open");
  }

  disconnectedCallback(): void {
    document.body.classList.remove("dso-modal-open");
    this.htmlDialogElement?.close();
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
                  <span class="sr-only">Sluiten</span>
                </button>
              )}
            </div>
          ) : (
            <span class="sr-only" id={this.ariaId}>
              Dialoog
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
