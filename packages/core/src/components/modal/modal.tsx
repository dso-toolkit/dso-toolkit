import { h, Component, ComponentInterface, Element, Event, EventEmitter, Fragment, Prop, State } from "@stencil/core";
import { createFocusTrap, FocusTargetValueOrFalse, FocusTrap } from "focus-trap";
import { v4 } from "uuid";

import { DsoModalCloseEvent } from "./modal.interfaces";

@Component({
  tag: "dso-modal",
  styleUrl: "modal.scss",
  shadow: true,
})
export class Modal implements ComponentInterface {
  private trap?: FocusTrap;

  private dialogElement?: HTMLDivElement;

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
   * Function that returns the element to focus on Modal close. Return `false` for no focus restore.
   */
  @Prop()
  returnFocus?: (nodeFocusedBeforeActivation: HTMLElement | SVGElement) => FocusTargetValueOrFalse;

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
    document.body.style.overflow = "hidden";
    this.setFocusTrap();
  }

  disconnectedCallback(): void {
    this.trap?.deactivate({ onDeactivate: () => undefined }); // override FocusTrap onDeactivate callback to avoid double event emits
    document.body.style.removeProperty("overflow");
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
          <div class="dso-dialog" role="document" ref={(element) => (this.dialogElement = element)}>
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

  private setFocusTrap() {
    if (this.dialogElement && !this.trap) {
      this.trap = createFocusTrap(this.dialogElement, {
        initialFocus: () => {
          if (this.initialFocus) {
            const initialFocusElement = this.host.querySelector<HTMLElement>(this.initialFocus);
            if (!initialFocusElement) {
              console.warn(`element '${this.initialFocus}' could not be found`);
            } else {
              return initialFocusElement;
            }
          }

          return (
            this.host.querySelector<HTMLButtonElement>("div[slot='footer'] .dso-primary") ??
            this.htmlDialogElement?.querySelector<HTMLButtonElement>(".dso-close") ??
            false
          );
        },
        allowOutsideClick: true,
        setReturnFocus: (e) => this.returnFocus?.(e) ?? e,
        escapeDeactivates: true,
        tabbableOptions: {
          getShadowRoot: true,
        },
        clickOutsideDeactivates: (e) => {
          if (e instanceof MouseEvent && e.composedPath()[0] === this.htmlDialogElement) {
            return true;
          }

          return false;
        },
        onDeactivate: () => {
          delete this.trap;

          this.dsoClose.emit({ originalEvent: undefined });
        },
      }).activate();
    }
  }
}
