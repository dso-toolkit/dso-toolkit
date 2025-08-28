import { Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, h } from "@stencil/core";

import { isModifiedEvent } from "../../../../utils/is-modified-event";

import { HistoryItemClickEvent, HistoryItemType } from "./history-item.interfaces";

@Component({
  tag: "dso-history-item",
  styleUrl: "history-item.scss",
  shadow: true,
})
export class HistoryItem implements ComponentInterface {
  @Element()
  host!: HTMLDsoHistoryItemElement;

  /**
   * The type of History Item
   */
  @Prop()
  type!: HistoryItemType;

  /**
   * The URL to which the History Item title links.
   */
  @Prop({ reflect: true })
  href!: string | undefined;

  /**
   * Emitted when the History Item title is clicked.
   */
  @Event()
  dsoHistoryItemClick!: EventEmitter<HistoryItemClickEvent>;

  private clickEventHandler(e: MouseEvent) {
    if (!(e.target instanceof HTMLElement) || !this.href) {
      return;
    }

    return this.dsoHistoryItemClick.emit({ originalEvent: e, isModifiedEvent: isModifiedEvent(e) });
  }

  get titleSlottedElement() {
    return this.host.querySelector("[slot='title']");
  }

  get explanationSlottedElement() {
    return this.host.querySelector("[slot='explanation']");
  }

  get warningSlottedElement() {
    return this.host.querySelector("[slot='warning']");
  }

  render() {
    let icon = "hammer";
    switch (this.type) {
      case "Ontwerp":
        icon = "pencil";
        break;
      case "In Werking":
        icon = "document";
        break;
      case "Tijdelijk Regelingdeel":
        icon = "document";
        break;
      case "Waarschuwing":
        icon = "status-warning-inline";
        break;
      default:
      //Besluit
    }

    return (
      <Host class="history-item">
        <div class="history-item-date">
          <slot name="date"></slot>
        </div>
        <div class="history-item-content">
          <div class={{ "history-item-status-message": true, tijdelijk: this.type === "Tijdelijk Regelingdeel" }}>
            <dso-icon icon={icon}></dso-icon>
            <slot name="status"></slot>
          </div>
          {this.titleSlottedElement !== null && (
            <div class="history-item-title">
              <a href={this.href} class="title-anchor" onClick={(e) => this.clickEventHandler(e)}>
                <slot name="title" />
              </a>
            </div>
          )}
          {this.explanationSlottedElement !== null && (
            <div class="history-item-explanation">
              <slot name="explanation" />
            </div>
          )}
          {this.warningSlottedElement !== null && (
            <div class="history-item-warning">
              <dso-icon icon="status-warning-inline"></dso-icon>
              <slot name="warning" />
            </div>
          )}
        </div>
      </Host>
    );
  }
}
