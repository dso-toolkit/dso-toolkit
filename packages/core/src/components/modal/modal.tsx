import { h, Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, State } from "@stencil/core";
import { createFocusTrap, FocusTrap } from "focus-trap";
import { v4 } from "uuid";

export interface DsoModalCloseEvent {
  originalEvent?: MouseEvent;
}

export type ModalRole = "alert" | "dialog" | "alertdialog";

@Component({
  tag: "dso-modal",
  styleUrl: "modal.scss",
  shadow: true,
})
export class Modal implements ComponentInterface {
  private static modalOpenClass = "dso-modal-open";

  private trap?: FocusTrap;

  private dialogElement?: HTMLDivElement;

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

  /** when `false` the close button in the header will not be rendered. Defaults to `true`  */
  @Prop()
  showCloseButton = true;

  @Event()
  dsoClose!: EventEmitter<DsoModalCloseEvent>;

  componentWillLoad(): void {
    this.hasFooter = this.host.querySelector("*[slot = 'footer']") !== null;
  }

  componentDidLoad(): void {
    document.body.classList.add(Modal.modalOpenClass);

    this.setFocusTrap();
  }

  disconnectedCallback(): void {
    document.body.classList.remove(Modal.modalOpenClass);

    this.trap?.deactivate();
  }

  render() {
    return (
      <Host class="dso-modal" role={this.role} aria-modal="true" aria-labelledby={this.ariaId}>
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
      </Host>
    );
  }

  private setFocusTrap() {
    if (this.dialogElement && !this.trap) {
      this.trap = createFocusTrap(this.dialogElement, {
        allowOutsideClick: true,
        escapeDeactivates: true,
        tabbableOptions: {
          getShadowRoot: true,
        },
        clickOutsideDeactivates: (e) => {
          if (e instanceof MouseEvent && e.composedPath()[0] === this.host) {
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
