import {
  Component,
  ComponentInterface,
  Element,
  Fragment,
  FunctionalComponent,
  Host,
  Prop,
  State,
  Watch,
  h,
} from "@stencil/core";
import debounce from "debounce";
import { v4 } from "uuid";

interface TableDialogProps {
  caption: string | undefined;
  dsoCloseDialog: () => void;
  ref: ((element: HTMLDialogElement | undefined) => void) | undefined;
}

const TableDialog: FunctionalComponent<TableDialogProps> = ({ caption, dsoCloseDialog, ref }) => {
  const labelledbyId = v4();

  return (
    <dialog
      class="dso-dialog dso-table-dialog"
      ref={ref}
      aria-labelledby={labelledbyId}
      onCancel={(e) => {
        e.preventDefault();

        dsoCloseDialog();
      }}
    >
      <div class="dso-header">
        <h2 id={labelledbyId} class={{ "sr-only": !caption }}>
          {caption || "Uitvergrote tabel dialoog"}
        </h2>
        <dso-icon-button
          class="dialog-close-button"
          icon="times"
          variant="tertiary"
          label="Sluiten"
          onDsoClick={dsoCloseDialog}
        />
      </div>
      <div class="dso-body dso-table-body"></div>
    </dialog>
  );
};

@Component({
  tag: "dso-table",
  styleUrl: "table.scss",
  shadow: true,
})
export class Table implements ComponentInterface {
  private resizeObserver?: ResizeObserver;

  private dialogElement?: HTMLDialogElement;

  @Element()
  host!: HTMLDsoTableElement;

  /**
   * Prevents the table being opened in a modal.
   */
  @Prop({ reflect: true })
  noModal = false;

  @State()
  isResponsive?: boolean;

  @State()
  modalActive = false;

  @State()
  placeholderHeight?: number;

  @Watch("modalActive")
  modalActiveWatcher(active: boolean) {
    if (active) {
      this.dialogElement?.showModal();
    } else {
      this.dialogElement?.close();
    }
  }

  private startResponsiveBehavior(): void {
    this.resizeObserver?.observe(this.host);
  }

  componentWillLoad(): void {
    this.resizeObserver = new ResizeObserver(debounce((entries) => this.setResponsiveTable(entries), 200));
  }

  componentDidLoad(): void {
    this.startResponsiveBehavior();

    if (this.modalActive) {
      this.dialogElement?.showModal();
    }
  }

  componentDidRender() {}

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }

  render() {
    const caption = this.host.querySelector(":scope > table > caption")?.textContent?.trim();
    const table: HTMLTableElement | null = this.host.querySelector(":scope > table");

    if (table && this.modalActive) {
      this.dialogElement?.querySelector(".dso-table-body")?.appendChild(table);
    }

    return (
      <Host is-responsive={this.isResponsive?.toString()}>
        {this.modalActive && this.placeholderHeight && (
          <div class="dso-table-placeholder" style={{ height: `${this.placeholderHeight}px` }} />
        )}

        <TableDialog
          caption={caption}
          dsoCloseDialog={() => this.closeModal()}
          ref={(element) => (this.dialogElement = element)}
        />

        {!this.modalActive && (
          <Fragment>
            {(this.isResponsive || !this.noModal) && (
              <div class="dso-table-utilities">
                {this.isResponsive && (
                  <div class="dso-responsive-message">
                    <span>beweeg de tabel van links naar rechts</span>
                  </div>
                )}

                {!this.noModal && (
                  <button type="button" class="dso-tertiary open-modal-button" onClick={() => this.openModal()}>
                    <span class="sr-only">tabel {caption ?? ""} </span>
                    <span>vergroten</span>
                    <dso-icon icon="external-link"></dso-icon>
                  </button>
                )}
              </div>
            )}

            <div class="dso-table-body">
              <slot></slot>
            </div>
          </Fragment>
        )}
      </Host>
    );
  }

  private openModal() {
    this.placeholderHeight = this.host.clientHeight;
    this.modalActive = true;
  }

  private closeModal() {
    this.placeholderHeight = undefined;
    this.modalActive = false;
  }

  private setResponsiveTable([dsoTable]: ResizeObserverEntry[]): void {
    if (!dsoTable) {
      throw new Error("No dsoTable found");
    }

    const tableElement = dsoTable.target.querySelector("table");

    if (dsoTable && tableElement instanceof HTMLTableElement) {
      this.isResponsive =
        Math.floor(tableElement.getBoundingClientRect().width) > Math.floor(dsoTable.contentRect.width);
    }
  }
}
