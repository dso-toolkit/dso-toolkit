import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Fragment,
  Prop,
  forceUpdate,
  h,
} from "@stencil/core";
import { clsx } from "clsx";

import { ListButtonChangeEvent, ListButtonSelectedEvent } from "./list-button.interfaces";

@Component({
  tag: "dso-list-button",
  shadow: true,
  styleUrl: "list-button.scss",
})
export class ListButton implements ComponentInterface {
  @Element()
  host!: HTMLDsoListButtonElement;

  private incrementButton?: HTMLDsoIconButtonElement;
  private focusIncrementButtonAfterRender = false;
  private mutationObserver?: MutationObserver;

  private get subcontentSlot() {
    return this.host.querySelector<HTMLElement>("[slot='subcontent']");
  }

  /**
   * The label of the List Button.
   */
  @Prop({ reflect: true })
  label?: string;

  /**
   * The sublabel of the List Button.
   */
  @Prop({ reflect: true })
  sublabel?: string;

  /**
   * When defined the count can show on the List Button.
   */
  @Prop({ reflect: true })
  count?: number;

  /**
   * The minimum value.
   */
  @Prop({ reflect: true })
  min?: string | number;

  /**
   * The maximum value.
   */
  @Prop({ reflect: true })
  max?: string | number;

  /**
   * Whether the List Button is checked.
   */
  @Prop({ reflect: true })
  checked = false;

  /**
   * Whether the List Button is disabled.
   */
  @Prop({ reflect: true })
  disabled = false;

  /**
   * Prefix to subcontent for the purpose of screenreading.
   */
  @Prop({ reflect: true })
  subcontentPrefix?: string;

  /**
   * Emitted when the user changes the count.
   */
  @Event()
  dsoCountChange!: EventEmitter<ListButtonChangeEvent>;

  /**
   * Emitted when the user activates the List Button itself.
   *
   * Does not fire when the user activates the count controls.
   */
  @Event()
  dsoSelectedChange!: EventEmitter<ListButtonSelectedEvent>;

  connectedCallback() {
    this.mutationObserver = new MutationObserver(() => forceUpdate(this.host));

    this.mutationObserver.observe(this.host, {
      characterData: true,
      childList: true,
      subtree: true,
      attributes: true,
    });
  }

  componentDidRender(): void {
    if (!this.subcontentSlot?.hasAttribute("aria-hidden")) {
      this.subcontentSlot?.setAttribute("aria-hidden", "true");
    }

    if (this.focusIncrementButtonAfterRender) {
      this.focusIncrementButtonAfterRender = false;

      void this.incrementButton?.setFocus();
    }
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    delete this.mutationObserver;
  }

  private stepValue(e: Event, direction: "increment" | "decrement"): void {
    if (typeof this.count === "number") {
      const newValue = direction === "increment" ? this.count + 1 : this.count - 1;

      if (!this.isNewCountValid(newValue)) {
        return;
      }

      if (direction === "decrement" && newValue === 1) {
        this.focusIncrementButtonAfterRender = true;
      }

      this.dsoCountChange.emit({
        originalEvent: e,
        count: newValue,
      });
    }
  }

  private handleSelectClick(e: Event): void {
    e.preventDefault();

    if (this.count !== undefined) {
      this.dsoCountChange.emit({
        originalEvent: e,
        count: this.count > 0 ? 0 : 1,
      });

      return;
    }

    this.dsoSelectedChange.emit({
      originalEvent: e,
      checked: !this.checked,
    });
  }

  private isNewCountValid(newValue: number): boolean {
    return !(
      this.min !== undefined &&
      this.max !== undefined &&
      (newValue < Number(this.min) || newValue > Number(this.max))
    );
  }

  render() {
    const selected = this.checked || (this.count !== undefined && this.count > 0);

    return (
      <div class={clsx(["dso-button-group", { "dso-disabled": this.disabled }])}>
        <div
          class={clsx(["dso-list-button", { "dso-selected": selected, "dso-single-count": this.count === 1 }])}
          onClick={(e) => this.handleSelectClick(e)}
        >
          <dso-selectable type="checkbox" value="list-button" name="naam" checked={selected} disabled={this.disabled}>
            <span>
              {this.label}
              {this.sublabel && <span class="sr-only"> {this.sublabel}</span>}
              {this.subcontentSlot && (
                <span class="sr-only">
                  {this.subcontentPrefix && this.subcontentPrefix + ":"}{" "}
                  <span innerHTML={this.subcontentSlot.innerHTML}></span>
                </span>
              )}
            </span>
          </dso-selectable>
          {this.sublabel && <span class="dso-sublabel">{this.sublabel}</span>}
          {this.subcontentSlot && (
            <div class="subcontent">
              <slot name="subcontent" />
            </div>
          )}
        </div>

        {this.count !== undefined && this.count > 0 && (
          <div class="dso-input-number">
            {this.count > 1 && (
              <Fragment>
                <dso-icon-button
                  label="Aantal verlagen"
                  variant="tertiary"
                  icon="minus-circle-outline"
                  disabled={this.count === Number(this.min) || this.disabled}
                  onDsoClick={(e) => this.stepValue(e, "decrement")}
                />
                <span class="dso-input-step-counter" aria-hidden="true">
                  {this.count}
                </span>
              </Fragment>
            )}
            <span class="sr-only" aria-live="polite" aria-atomic="true">
              {this.count}
            </span>

            <dso-icon-button
              ref={(element) => (this.incrementButton = element)}
              label="Aantal verhogen"
              variant="tertiary"
              icon="plus-circle-outline"
              disabled={this.count === Number(this.max) || this.disabled}
              onDsoClick={(e) => this.stepValue(e, "increment")}
            />
          </div>
        )}
      </div>
    );
  }
}
