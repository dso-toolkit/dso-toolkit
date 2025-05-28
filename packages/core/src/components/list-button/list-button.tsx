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
import clsx from "clsx";

import { ListButtonChangeEvent, ListButtonSelectedEvent } from "./list-button.interfaces";

@Component({
  tag: "dso-list-button",
  shadow: true,
  styleUrl: "list-button.scss",
})
export class ListButton implements ComponentInterface {
  @Element()
  host!: HTMLDsoListButtonElement;

  private mutationObserver?: MutationObserver;

  private get subcontentSlot() {
    return this.host.querySelector<HTMLElement>("[slot='subcontent']");
  }

  /**
   * The label of the List Button.
   */
  @Prop()
  label?: string;

  /**
   * The sublabel of the List Button.
   */
  @Prop()
  sublabel?: string;

  /**
   * When defined the count can show on the List Button.
   */
  @Prop()
  count?: number;

  /**
   * The minimum value.
   */
  @Prop()
  min?: string | number;

  /**
   * The maximum value.
   */
  @Prop()
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
  @Prop()
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
          <div class="dso-selectable">
            <input
              id="dso-list-button-checkbox"
              type="checkbox"
              value="list-button"
              name="naam"
              aria-describedby={
                [this.sublabel && "sublabel", this.subcontentSlot && "description"].filter((s) => !!s).join(" ") || null
              }
              checked={selected}
              disabled={this.disabled}
            />
            <label htmlFor="dso-list-button-checkbox">{this.label}</label>
            {this.subcontentSlot && (
              <div class="sr-only" id="description">
                {this.subcontentPrefix && this.subcontentPrefix + ":"}
                <div innerHTML={this.subcontentSlot.innerHTML}></div>
              </div>
            )}
          </div>
          {this.sublabel && (
            <span class="dso-sublabel" id="sublabel">
              {this.sublabel}
            </span>
          )}
          {this.subcontentSlot && (
            <div class="subcontent">
              <slot name="subcontent" />
            </div>
          )}
        </div>

        {this.count !== undefined && this.count > 0 && (
          <div class="dso-input-number">
            {this.count > 1 && (
              <>
                <button
                  type="button"
                  class="dso-tertiary"
                  disabled={this.count === Number(this.min) || this.disabled}
                  onClick={(e) => this.stepValue(e, "decrement")}
                >
                  <dso-icon icon="minus-circle"></dso-icon>
                  <span class="sr-only">Aantal verlagen</span>
                </button>
                <span class="dso-input-step-counter" aria-label="Aantal" aria-live="polite">
                  {this.count}
                </span>
              </>
            )}

            <button
              type="button"
              class="dso-tertiary"
              disabled={this.count === Number(this.max) || this.disabled}
              onClick={(e) => this.stepValue(e, "increment")}
            >
              <dso-icon icon="plus-circle"></dso-icon>
              <span class="sr-only">Aantal verhogen</span>
            </button>
          </div>
        )}
      </div>
    );
  }
}
