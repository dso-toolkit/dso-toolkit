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

import { isModifiedEvent } from "../../utils/is-modified-event";
import { IconAlias } from "../icon/icon.interfaces";

import { HistoryItemClickEvent, HistoryItemType } from "./history-item.interfaces";

/**
 * @slot date - The slot to place a string that holds a date in.
 * @slot status - The slot to place the status message in.
 * @slot title - An optional slot to place the title in. When used, the property `href` must be set.
 * @slot explanation - An optional slot to place explanation in.
 * @slot warning - An optional slot to place a warning in.
 */
@Component({
  tag: "dso-history-item",
  styleUrl: "history-item.scss",
  shadow: true,
})
export class HistoryItem implements ComponentInterface {
  private typeIcons: Record<HistoryItemType, IconAlias> = {
    ontwerp: "pencil",
    "in-werking": "document",
    "tijdelijk-regelingdeel": "document",
    "tijdelijk-regelingdeel-besluit": "hammer",
    waarschuwing: "status-warning-red-solid",
    besluit: "hammer",
  };

  @Element()
  host!: HTMLDsoHistoryItemElement;

  /**
   * The type of History Item
   */
  @Prop({ reflect: true })
  type!: HistoryItemType;

  /**
   * The optional URL to which the History Item title links. Needs to be provided when slot `title` is used.
   */
  @Prop({ reflect: true })
  href?: string;

  /**
   * Emitted when the History Item title is clicked.
   */
  @Event({ bubbles: false })
  dsoClick!: EventEmitter<HistoryItemClickEvent>;

  private mutationObserver?: MutationObserver;

  connectedCallback(): void {
    this.mutationObserver = new MutationObserver(() => forceUpdate(this.host));

    this.mutationObserver.observe(this.host, { attributes: true, childList: true });
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();

    delete this.mutationObserver;
  }
  private clickEventHandler(e: MouseEvent) {
    if (!(e.target instanceof HTMLElement) || !this.href) {
      return;
    }

    return this.dsoClick.emit({ originalEvent: e, isModifiedEvent: isModifiedEvent(e) });
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
    return (
      <Fragment>
        <div class="history-item-date">
          <slot name="date"></slot>
        </div>
        <div class="history-item-content">
          <div class="history-item-status-message">
            <dso-icon icon={this.typeIcons[this.type]} aria-hidden="true"></dso-icon>
            <slot name="status"></slot>
          </div>
          {this.titleSlottedElement !== null && this.href && (
            <div class="history-item-title">
              <a href={this.href} class="title-anchor" onClick={(e) => this.clickEventHandler(e)}>
                <slot name="title"></slot>
              </a>
            </div>
          )}
          {this.explanationSlottedElement !== null && (
            <div class="history-item-explanation">
              <slot name="explanation"></slot>
            </div>
          )}
          {this.warningSlottedElement !== null && (
            <div class="history-item-warning">
              <dso-icon icon="status-warning-red-solid" role="img" aria-label="Waarschuwing"></dso-icon>
              <slot name="warning"></slot>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}
