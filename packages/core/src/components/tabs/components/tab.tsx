import { Component, Element, Prop, h, Host, Watch } from "@stencil/core";
import { v4 as uuidv4 } from "uuid";

// import clsx from "clsx";

@Component({
  tag: "dso-tab",
  styleUrl: "tab.scss",
  shadow: true,
})
export class Tab {
  @Element()
  host!: HTMLDsoTabElement;

  /**
   * The text that is shown on the tab.
   */
  @Prop()
  label!: string;

  /**
   * Adds a unique identifier for the tab. Use this instead of html `id` attribute.
   *
   * Auto generated if not set.
   */
  @Prop()
  identifier = uuidv4();

  /**
   * Is tab active.
   */
  @Prop()
  active?: boolean;

  /**
   * Is tab disabled.
   */
  @Prop()
  disabled?: boolean;

  @Watch("active")
  async onActivate(active: boolean) {
    if (active) {
      this.tabs?.updateActiveTab(this.identifier);
    }
  }

  private get tabs() {
    return this.host.closest("dso-tabs");
  }

  render() {
    return (
      <Host role="tabpanel" id={`${this.identifier}-tab`} aria-labelledby={this.identifier} hidden={!this.active}>
        <slot />
      </Host>
    );
  }
}
