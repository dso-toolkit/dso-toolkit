import { Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, h } from "@stencil/core";
import { clsx } from "clsx";
import { LegendCloseEvent, LegendNavbarClickEvent, NavbarItem } from "dso-toolkit";

import { isModifiedEvent } from "../../utils/is-modified-event";

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
  dsoPanelSwitch!: EventEmitter<LegendNavbarClickEvent>;

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
                  <a role="tab" aria-current="page" onClick={(e) => this.dsoClose.emit({ originalEvent: e })}>
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
            onClick={(e) => this.dsoPanelSwitch.emit({ originalEvent: e, isModifiedEvent: isModifiedEvent(e) })}
          />
        </div>
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis eget justo sit amet bibendum. Donec et
          sapien porttitor, semper risus in, porttitor nisi. Aenean porttitor dolor ut est ornare, ac mollis lorem
          dapibus. Nullam hendrerit justo non velit egestas, semper egestas arcu luctus. Donec euismod neque tempus
          molestie eleifend. Donec nulla urna, suscipit facilisis maximus vitae, suscipit at libero. Vestibulum nec
          eleifend turpis. Donec tempor elementum lorem, eget vestibulum elit vulputate ut. In turpis ex, aliquam vel
          enim sit amet, commodo fermentum tortor. Curabitur ultrices egestas sapien, et interdum felis dictum eget.
          Donec vulputate venenatis nunc quis placerat. Integer efficitur diam quis enim malesuada, quis cursus quam
          lacinia. Nunc mattis viverra ligula, id porta lacus mattis vehicula. Nam ultricies porta fermentum. Nullam
          consequat eget quam in sagittis. Mauris rutrum finibus dapibus. Sed id tincidunt sapien, ac malesuada purus.
          Pellentesque augue lorem, aliquam ac sapien nec, vestibulum ornare magna. Praesent ornare dolor non justo
          blandit scelerisque. Morbi iaculis sodales ligula viverra rutrum. Suspendisse at tempor velit. Aliquam erat
          volutpat. Cras ac tempus diam. Ut quis venenatis tellus. Suspendisse ultricies quam efficitur sagittis
          dapibus. Morbi facilisis aliquet eros in imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed eu rutrum lacus, aliquam accumsan libero. Praesent tristique leo sit amet lorem consectetur blandit.
          Vivamus bibendum ornare massa eget rhoncus. Nullam euismod tortor non mi ornare, tempor scelerisque felis
          tristique. Etiam blandit lorem nibh, quis fermentum lectus dictum nec. Fusce egestas sagittis elit, id semper
          mi fermentum vel. Sed eget dolor arcu. Mauris cursus dui vitae tincidunt laoreet. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Maecenas
          vitae lorem quis augue gravida auctor. Donec efficitur condimentum blandit. Quisque commodo fermentum posuere.
          Morbi ac lectus vehicula, rutrum mauris at, gravida dui. Curabitur vulputate dapibus nibh eget condimentum.
          Morbi et nulla id felis sodales convallis ut ac nulla. Cras et enim sagittis, finibus sem et, pharetra arcu.
          Pellentesque lorem sem, sagittis in nunc vitae, gravida iaculis ex. Sed viverra consequat tellus quis posuere.
        </div>
        <dso-scrollable>
          <slot></slot>
        </dso-scrollable>
      </Host>
    );
  }
}
