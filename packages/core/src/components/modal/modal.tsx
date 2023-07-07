import {
  h,
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Fragment,
  Prop,
  State,
  Method,
} from "@stencil/core";
import { createFocusTrap, FocusTargetValueOrFalse, FocusTrap } from "focus-trap";
import { v4 } from "uuid";

import { DsoModalCloseEvent } from "./modal.interfaces";
import debounce from "debounce";

const resizeObserver = new ResizeObserver(
  debounce((entries) => {
    entries.forEach(({ target }) => {
      const dsoModalElement = target.closest(".dso-modal");

      if (
        dsoModalElement &&
        dsoModalElement.parentNode instanceof ShadowRoot &&
        isDsoModalComponent(dsoModalElement.parentNode.host)
      ) {
        dsoModalElement.parentNode.host._setCssVariables();
      }
    });
  }, 50)
);

function isDsoModalComponent(element: Element): element is HTMLDsoModalElement {
  return element.tagName === "DSO-MODAL";
}

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
  host!: HTMLDsoModalElement;

  @State()
  ariaId = v4();

  @State()
  hasFooter?: boolean;

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

  /**
   * @internal
   */
  @Method()
  async _setCssVariables() {
    const header = this.dialogElement?.querySelector(".dso-header");
    const headerHeight = header ? header.clientHeight : 0;
    const footer = this.dialogElement?.querySelector(".dso-footer");
    const footerHeight = footer ? footer.clientHeight : 0;

    this.dialogElement?.setAttribute("style", `--header-height: ${headerHeight}px; --footer-height: ${footerHeight}px`);
  }

  componentWillLoad(): void {
    this.hasFooter = this.host.querySelector("*[slot = 'footer']") !== null;
  }

  componentDidLoad(): void {
    this.setFocusTrap();

    if (!(this.dialogElement instanceof HTMLDivElement)) {
      return;
    }

    resizeObserver.observe(this.dialogElement);
  }

  disconnectedCallback(): void {
    this.trap?.deactivate({ onDeactivate: () => undefined }); // override FocusTrap onDeactivate callback to avoid double event emits
    if (!(this.dialogElement instanceof HTMLDivElement)) {
      return;
    }
    resizeObserver.unobserve(this.dialogElement);
  }

  render() {
    return (
      <Fragment>
        <div class="dso-modal-overlay"></div>
        <div
          class="dso-modal"
          role={this.role ?? undefined}
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

          return (
            this.host.querySelector<HTMLButtonElement>("div[slot='footer'] .dso-primary") ??
            this.modalElement?.querySelector<HTMLButtonElement>(".dso-close") ??
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
