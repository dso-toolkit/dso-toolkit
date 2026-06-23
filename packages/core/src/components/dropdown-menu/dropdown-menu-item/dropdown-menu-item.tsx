import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  forceUpdate,
  h,
} from "@stencil/core";
import { clsx } from "clsx";

import { isModifiedEvent } from "../../../utils/is-modified-event";
import {
  DropdownMenuInternalState,
  DropdownMenuItemClickEvent,
  DropdownMenuItemType,
} from "../dropdown-menu.interfaces";

@Component({
  tag: "dso-dropdown-menu-item",
  styleUrl: "dropdown-menu-item.scss",
  shadow: true,
})
export class DropdownMenuItem implements ComponentInterface {
  @Element()
  host!: HTMLDsoDropdownMenuItemElement;

  /**
   * The type of the dropdown menu item. Can be one of `button` or `link`.
   */
  @Prop({ reflect: true })
  type!: DropdownMenuItemType | undefined;

  /**
   * The href of the link when the type is `Link`.
   */
  @Prop({ reflect: true })
  href?: string;

  /**
   * Whether the Dropdown Menu Item is checked.
   */
  @Prop({ reflect: true })
  checked?: boolean;

  /**
   * Emitted when the user clicks the Dropdown Menu Item.
   */
  @Event()
  dsoClick!: EventEmitter<DropdownMenuItemClickEvent>;

  /**
   * @internal
   */
  @Method()
  async _dsoFocus() {
    this.anchorOrButtonRef?.focus();
  }

  private dropdownMenuState?: DropdownMenuInternalState;

  private anchorOrButtonRef?: HTMLAnchorElement | HTMLButtonElement;

  private get dropdownMenu() {
    return this.host.closest("dso-dropdown-menu");
  }

  private handleClick = (event: MouseEvent) => {
    this.dsoClick.emit({ originalEvent: event, isModifiedEvent: isModifiedEvent(event) });
  };

  componentWillLoad() {
    this.dropdownMenu?._getState().then((state) => {
      this.dropdownMenuState = state;

      forceUpdate(this.host);
    });
  }

  render() {
    const checkable = this.dropdownMenuState?.checkable;
    const checked = checkable ? Boolean(this.checked) : undefined;

    return (
      <Host>
        <div role="none" class={clsx([{ checkable, checked }])}>
          {this.type === "button" && (
            <button
              type="button"
              role={checkable ? "menuitemradio" : "menuitem"}
              aria-checked={checked?.toString()}
              onClick={this.handleClick}
              ref={(element) => (this.anchorOrButtonRef = element)}
            >
              {checkable && checked && <dso-icon icon="check" />}
              <slot></slot>
            </button>
          )}
          {this.type === "link" && this.href && (
            <a
              href={this.href}
              role={checkable ? "menuitemradio" : "menuitem"}
              aria-checked={checked?.toString()}
              onClick={this.handleClick}
              ref={(element) => (this.anchorOrButtonRef = element)}
            >
              {checkable && checked && <dso-icon icon="check" />}
              <slot></slot>
            </a>
          )}
        </div>
      </Host>
    );
  }
}
