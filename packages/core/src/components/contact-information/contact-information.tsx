import { Component, ComponentInterface, h } from "@stencil/core";

/**
 * @slot heading - A slot to place the title of the contact information in.
 * @slot buttons - A slot to place the interactive buttons of the contact information in.
 * @slot info-items - A slot to place the info-items of the contact information in.
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
        <slot name="anchors" />
        <slot name="info" />
      </div>
    );
  }
}
