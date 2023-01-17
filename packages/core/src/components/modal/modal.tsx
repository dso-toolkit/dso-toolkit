import { h, Component, ComponentInterface, Element, Event, EventEmitter, Fragment, Prop, State } from "@stencil/core";
import { createFocusTrap, FocusTrap } from "focus-trap";
import { v4 } from "uuid";

import { DsoModalCloseEvent } from "./modal.interfaces";

export type ModalRole = "alert" | "dialog" | "alertdialog";

@Component({
  tag: "dso-modal",
  styleUrl: "modal.scss",
  shadow: true,
})
export class Modal implements ComponentInterface {
  private trap?: FocusTrap;

  private dialogElement?: HTMLDivElement;

  private modalElement?: HTMLDivElement;

  @Element()
  host!: HTMLElement;

  @State()
  ariaId = v4();

  @State()
  hasFooter?: boolean;

  @Prop()
  modalTitle?: string;

  /** the role for the modal `dialog` | `alert` | `alertdialog` defaults to `dialog` */
  @Prop()
  role: ModalRole = "dialog";

  /** when `false` the close button in the header will not be rendered. Defaults to `true` */
  @Prop()
  showCloseButton = true;

  /** selector for the element to be focused initially */
  @Prop()
  initialFocus?: string;

  @Event()
  dsoClose!: EventEmitter<DsoModalCloseEvent>;

  componentWillLoad(): void {
    this.hasFooter = this.host.querySelector("*[slot = 'footer']") !== null;
  }

  componentDidLoad(): void {
    this.setFocusTrap();
  }

  disconnectedCallback(): void {
    this.trap?.deactivate();
  }

  render() {
    return (
      <Fragment>
        <div class="dso-modal-overlay"></div>
        <div
          class="dso-modal"
          role={this.role}
          aria-modal="true"
          aria-labelledby={this.ariaId}
          ref={(element) => (this.modalElement = element)}
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

            <div class="dso-body">
              <slot name="body"></slot>
            </div>

            {this.hasFooter && (
              <div class="dso-footer">
                <slot name="footer"></slot>
              </div>
            )}
          </div>
        </div>
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

          const primaryButton = this.host.querySelector<HTMLButtonElement>("div[slot='footer'] .dso-primary");
          if (primaryButton) {
            return primaryButton;
          }

          const closeButton = this.modalElement?.querySelector<HTMLButtonElement>(".dso-close");
          if (closeButton) {
            return closeButton;
          }

          return false;
        },
        allowOutsideClick: true,
        escapeDeactivates: true,
        tabbableOptions: {
          getShadowRoot: true,
        },
        clickOutsideDeactivates: (e) => {
          if (e instanceof MouseEvent && e.composedPath()[0] === this.modalElement) {
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
