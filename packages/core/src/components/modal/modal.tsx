import { h, Component, ComponentInterface, Element, Event, EventEmitter, Fragment, Prop, State } from "@stencil/core";
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
   */
  @Prop()
  showCloseButton = true;

  /**
   * Selector used to query the element which will be focused when the component instantiated. When undefined the modal focuses the first button.dso-primary in the modal footer. If no button can be found the close button is focused.
   */
  @Prop()
  initialFocus?: string;

  /**
   * Emitted when the user wants to close the Modal.
   */
  @Event()
  dsoClose!: EventEmitter<DsoModalCloseEvent>;

  componentWillLoad(): void {
    this.hasFooter = this.host.querySelector("*[slot = 'footer']") !== null;
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
      <Fragment>
        <dialog
          class="dso-modal"
          role={this.role ?? undefined}
          aria-modal="true"
          aria-labelledby={this.ariaId}
          ref={(element) => (this.htmlDialogElement = element)}
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
      </Fragment>
    );
  }
}
