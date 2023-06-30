import {
  h,
  Component,
  Prop,
  Event,
  EventEmitter,
  Fragment,
  Element,
  State,
  forceUpdate,
  Watch,
  Method,
} from "@stencil/core";
import clsx from "clsx";
import { createIdentifier } from "../../utils/create-identifier";
import { SelectableChangeEvent } from "./selectable.interfaces";

@Component({
  tag: "dso-selectable",
  styleUrl: "selectable.scss",
  scoped: true,
})
export class Selectable {
  /**
   * Type of Selectable.
   *
   * `checkbox`: Multiple options
   * `radio`: Single option.
   */
  @Prop()
  type!: "checkbox" | "radio";

  /**
   * To set `<input id>` attribute for external references.
   */
  @Prop()
  identifier?: string;

  /**
   * Name of the Selectable. Can be used to group Selectables.
   */
  @Prop()
  name?: string;

  /**
   * The value of the Selectable.
   */
  @Prop()
  value!: string;

  /**
   * Set to true of the current value is not valid.
   */
  @Prop()
  invalid?: boolean;

  /**
   * To link this control to an element that describes it.
   */
  @Prop()
  describedById?: string;

  /**
   * To link this control to an element that labels it.
   */
  @Prop()
  labelledById?: string;

  /**
   * To disable the Selectable.
   */
  @Prop()
  disabled?: boolean;

  /**
   * To mark the Selectable as required.
   */
  @Prop()
  required?: boolean;

  /**
   * Mark the Selectable as checked
   */
  @Prop()
  checked?: boolean;

  /**
   * An indeterminate state is neither true or false. It means the answer is somewhere in between.
   *
   * Can be used to indicate child Selectables that are a mix of checked and unchecked.
   */
  @Prop()
  indeterminate?: boolean;

  /**
   * Set to true if the Info should not be toggled and always visible.
   */
  @Prop()
  infoFixed?: boolean;

  /**
   * Emitted when the user checks or unchecks the Selectable.
   */
  @Event()
  dsoChange!: EventEmitter<SelectableChangeEvent>;

  @Element()
  host!: HTMLDsoSelectableElement;

  @State()
  infoActive = false;

  @State()
  isFocused = false;

  /**
   * Method to toggle the Info. Is set to `active` when passed.
   *
   * If `active` is not passed, Info is toggled to opposite value.
   * @param active
   */
  @Method()
  async toggleInfo(active?: boolean) {
    this.infoActive = active ?? !this.infoActive;
  }

  private mutationObserver?: MutationObserver;

  private fallbackIdentifier = createIdentifier("DsoSelectable");

  private input: HTMLInputElement | undefined;

  componentDidLoad() {
    this.mutationObserver?.disconnect();

    this.mutationObserver = new MutationObserver(() => forceUpdate(this.host));
    this.mutationObserver.observe(this.host, {
      childList: true,
    });

    this.setIndeterminate();
  }

  disconnectedCallback() {
    this.mutationObserver?.disconnect();
  }

  @Watch("indeterminate")
  setIndeterminate() {
    if (!(this.input instanceof HTMLInputElement) || this.type !== "checkbox") {
      return;
    }

    this.input.indeterminate = !!this.indeterminate;
  }

  render() {
    const hasInfo = !!this.host.querySelector('[slot="info"]');

    return (
      <Fragment>
        <div class={clsx("dso-selectable-container", { "has-info-button": hasInfo })}>
          <div class={clsx("dso-selectable-input-wrapper", { "dso-is-focused": this.isFocused })}>
            <input
              type={this.type}
              id={this.getIdentifier()}
              value={this.value}
              name={this.name}
              aria-invalid={this.invalid?.toString()}
              aria-describedby={hasInfo && this.infoFixed ? this.describedById : undefined}
              aria-labelledBy={this.labelledById}
              disabled={this.disabled}
              required={this.required}
              checked={this.checked}
              onFocus={() => (this.isFocused = true)}
              onBlur={() => (this.isFocused = false)}
              onChange={(e) => this.dsoChange.emit(e)}
              ref={(el) => (this.input = el)}
            />
            {!this.labelledById ? (
              <label htmlFor={this.getIdentifier()}>
                <slot></slot>
              </label>
            ) : (
              <label></label>
            )}
          </div>
          {hasInfo && (
            <Fragment>
              {!this.infoFixed && (
                <dso-info-button
                  active={this.infoActive}
                  onDsoToggle={(e) => (this.infoActive = e.detail.active)}
                ></dso-info-button>
              )}
            </Fragment>
          )}
        </div>
        {hasInfo && (
          <dso-info
            id={hasInfo && this.infoFixed ? this.describedById : undefined}
            fixed={this.infoFixed}
            active={this.infoActive}
            onDsoClose={() => (this.infoActive = false)}
          >
            <div>
              <slot name="info"></slot>
            </div>
          </dso-info>
        )}
      </Fragment>
    );
  }

  private getIdentifier(): string {
    return this.identifier ?? this.fallbackIdentifier;
  }
}
