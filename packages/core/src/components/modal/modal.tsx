import { ModalRole } from "@dso-toolkit/sources";
import { h, Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, State } from "@stencil/core";
import { createFocusTrap, FocusTrap } from "focus-trap";
import { v4 } from "uuid";

export interface DsoModalCloseEvent {
  originalEvent?: MouseEvent;
}

@Component({
  tag: "dso-modal",
  styleUrl: "modal.scss",
  shadow: true,
})
export class Modal implements ComponentInterface {
  private trap?: FocusTrap;

  private classModalOpen = "dso-modal-open";

  private dialogElement?: HTMLDivElement;

  @Element()
  host!: HTMLElement;

  @State()
  ariaId = v4();

  @Prop()
  modalTitle?: string;

  @Prop()
  role?: ModalRole;

  @Prop()
  hasFooter?: boolean;

  @Event()
  dsoClose!: EventEmitter<DsoModalCloseEvent>;

  componentDidLoad(): void {
    document.body.classList.add(this.classModalOpen);

    this.setFocusTrap();
  }

  disconnectedCallback(): void {
    document.body.classList.remove(this.classModalOpen);

    this.trap?.deactivate();
  }

  render() {
    return (
      <Host class="dso-modal" role={this.role ?? "dialog"} aria-modal="true" aria-labelledby={this.ariaId}>
        <div class="dso-dialog" role="document" ref={(element) => (this.dialogElement = element)}>
          {this.modalTitle && (
            <div class="dso-header">
              <h2 id={this.ariaId}>{this.modalTitle}</h2>
              <button type="button" class="dso-close" onClick={(e) => this.dsoClose.emit({ originalEvent: e })}>
                <dso-icon icon="times"></dso-icon>
                <span class="sr-only">Sluiten</span>
              </button>
            </div>
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
