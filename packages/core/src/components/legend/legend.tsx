import { Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, h } from "@stencil/core";
import { clsx } from "clsx";
import { LegendCloseEvent, LegendNavbarItemClickEvent, NavbarItem } from "dso-toolkit";

@Component({
  tag: "dso-legend",
  styleUrl: "legend.scss",
  shadow: true,
})
export class Legend implements ComponentInterface {
  @Element()
  host!: HTMLDsoLegendElement;

  /**
   * Navbar items in the legend
   */
  @Prop()
  navbarItems: NavbarItem[] = [];

  /**
   * Emitted when a navbar item is pressed.
   * The `detail` property of the `CustomEvent` will contain the text of the anchor.
   */
  @Event()
  dsoLegendNavbarItemClick!: EventEmitter<LegendNavbarItemClickEvent>;

  /**
   * Emitted when the user closes the Legend.
   */
  @Event()
  dsoClose!: EventEmitter<LegendCloseEvent>;

  render() {
    return (
      <Host>
        <div class="topbar">
          <dso-icon icon="layers" />
          <nav class="dso-navbar">
            <ul class="dso-nav dso-nav-sub">
              {this.navbarItems.map((navbarItem) => (
                <li class={clsx({ "dso-active": navbarItem.active })}>
                  <a
                    role="tab"
                    aria-current="page"
                    onClick={() =>
                      this.dsoLegendNavbarItemClick.emit({
                        navbarItem,
                      })
                    }
                  >
                    {navbarItem.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <dso-icon-button
            icon="times"
            variant="tertiary"
            label="Sluit legenda"
            class="dso-close-button"
            onClick={(e) => this.dsoClose.emit({ originalEvent: e })}
          />
        </div>
        <dso-scrollable class="content">
          <slot></slot>
        </dso-scrollable>
      </Host>
    );
  }
}
