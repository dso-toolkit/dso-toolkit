import { Component, ComponentInterface, Host, Prop, State, h } from "@stencil/core";

import {
  Wijzigactie,
  WrapWijzigactie,
} from "../../../functional-components/wrap-wijzigactie/wrap-wijzigactie.functional-component";

/**
 * @slot symbol - A required slot for the symbol representing this plekinfo item.
 * @slot label - The label of the plekinfo item.
 * @slot sublabel - An optional sublabel of the plekinfo item.
 * @slot meta - An optional label badge displayed after the label and sublabel.
 */
@Component({
  tag: "dso-plekinfo-card-item",
  styleUrl: "plekinfo-card-item.scss",
  shadow: true,
})
export class PlekinfoCardItem implements ComponentInterface {
  /**
   * An optional 'wijzigactie' that signals if the plekinfo item is added or removed.
   */
  @Prop({ reflect: true })
  wijzigactie?: Wijzigactie;

  @State()
  private hasSublabel = false;

  @State()
  private hasMeta = false;

  private sublabelSlot?: HTMLSlotElement;
  private metaSlot?: HTMLSlotElement;

  private updateSublabel = () => {
    if (this.sublabelSlot) {
      this.hasSublabel = this.sublabelSlot.assignedNodes({ flatten: true }).length > 0;
    }
  };

  private updateMeta = () => {
    if (this.metaSlot) {
      this.hasMeta = this.metaSlot.assignedNodes({ flatten: true }).length > 0;
    }
  };

  private setSublabelSlot = (element: HTMLSlotElement | undefined) => {
    this.sublabelSlot = element;
    this.updateSublabel();
  };

  private setMetaSlot = (element: HTMLSlotElement | undefined) => {
    this.metaSlot = element;
    this.updateMeta();
  };

  render() {
    return (
      <Host>
        <WrapWijzigactie wijzigactie={this.wijzigactie} class="dso-plekinfo-card-item-container">
          <div>
            <slot name="symbol" />
          </div>

          <div
            class={{
              content: true,
              "no-sublabel": !this.hasSublabel,
            }}
          >
            <div class="label">
              <dso-truncate>
                <slot name="label" />
              </dso-truncate>
            </div>

            <div class="sublabel" hidden={!this.hasSublabel}>
              <dso-truncate>
                <slot name="sublabel" ref={this.setSublabelSlot} onSlotchange={this.updateSublabel} />
              </dso-truncate>
            </div>

            <div class="meta" hidden={!this.hasMeta}>
              <slot name="meta" ref={this.setMetaSlot} onSlotchange={this.updateMeta} />
            </div>
          </div>
        </WrapWijzigactie>
      </Host>
    );
  }
}
