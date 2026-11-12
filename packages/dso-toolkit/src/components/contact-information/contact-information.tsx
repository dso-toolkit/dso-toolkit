import { Component, ComponentInterface, h } from "@stencil/core";

/**
 * @slot heading - The heading of the contact information component.
 * @slot anchor-items - Interactive anchors-items showed in a list.
 * @slot info-items - Text info-items showed in a list.
 */

@Component({
  tag: "dso-contact-information",
  styleUrl: "contact-information.scss",
  shadow: true,
})
export class ContactInformation implements ComponentInterface {
  render() {
    return (
      <div class="dso-contact-information">
        <slot name="heading" />
        <slot name="anchor-items" />
        <slot name="info-items" />
      </div>
    );
  }
}
