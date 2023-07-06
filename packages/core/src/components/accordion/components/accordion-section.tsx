import {
  h,
  Component,
  ComponentInterface,
  Element,
  Event,
  forceUpdate,
  Fragment,
  Host,
  Prop,
  State,
  EventEmitter,
} from "@stencil/core";

import {
  AccordionInternalState,
  AccordionSectionAnimationEndEvent,
  AccordionSectionToggleClickEvent,
} from "../accordion.interfaces";
import { AccordionHeading, AccordionSectionState, stateMap } from "./accordion-section.interfaces";
import { Handle, HandleElement, HandleIcon } from "./handles";
import { ExpandableAnimationEndEvent } from "../../expandable/expandable";

@Component({
  tag: "dso-accordion-section",
  styleUrl: "accordion-section.scss",
  shadow: true,
})
export class AccordionSection implements ComponentInterface {
  private accordionState?: AccordionInternalState;

  private sectionBody?: HTMLDivElement;

  private sectionHeading?: HTMLHeadingElement;

  @Element()
  host!: HTMLDsoAccordionSectionElement;

  /**
   * The title of the handle
   */
  @Prop()
  handleTitle?: string;

  /**
   * Which heading element to use.
   */
  @Prop()
  heading: AccordionHeading = "h2";

  /**
   * When set the handle will render as a `<a>`. When undefined it renders as a `<button>`
   */
  @Prop()
  handleUrl?: string;

  /**
   * `state` takes precedence over `attachmentCount` and `icon`
   */
  @Prop()
  status?: AccordionSectionState;

  /**
   * `attachmentCount` takes precedence over `icon`
   */
  @Prop()
  attachmentCount?: number;

  /**
   * To set an icon in the heading handle.
   */
  @Prop()
  icon?: string;

  /**
   * The status of the section.
   */
  @Prop()
  statusDescription?: string;

  /**
   * Set the Accordion Section open.
   */
  @Prop({ reflect: true })
  open = false;

  @State()
  hasNestedAccordion = false;

  @State()
  hover = false;

  componentWillLoad() {
    this.hasNestedAccordion = this.host.querySelector("dso-accordion") !== null;

    this.accordion?._getState().then((state) => {
      this.accordionState = state;

      forceUpdate(this.host);
    });
  }

  get isNeutral() {
    return this.accordionState?.variant === "neutral";
  }

  private async scrollIntoView(bodyHeight: number | undefined): Promise<void> {
    const bodyClientRect = this.sectionBody?.getBoundingClientRect();
    const headingClientRect = this.sectionHeading?.getBoundingClientRect();

    if (!bodyClientRect || !headingClientRect || !this.accordionState) {
      return;
    }

    // this y is relative to the top of the viewport.
    const sectionBottomY = headingClientRect.top + headingClientRect.height + (this.open ? bodyHeight ?? 0 : 0);
    if (sectionBottomY > window.innerHeight) {
      const expandedAccordionHeight = sectionBottomY - headingClientRect.top;
      const shouldScrollToTopOfSection = expandedAccordionHeight > window.innerHeight;

      window.scrollTo({
        top: shouldScrollToTopOfSection
          ? this.host.offsetTop
          : this.host.offsetTop - (window.innerHeight - expandedAccordionHeight),
        behavior: "smooth",
      });
    } else if (headingClientRect.top < 0) {
      window.scrollTo({
        top: this.host.offsetTop,
        behavior: "smooth",
      });
    }
  }

  private get accordion() {
    return this.host.closest("dso-accordion");
  }

  private handleClick = (event: MouseEvent) => {
    this.dsoToggleClick.emit({
      originalEvent: event,
      open: !this.open,
    });
  };

  private handleExpandableAnimationEnd = (e: CustomEvent<ExpandableAnimationEndEvent>) => {
    this.dsoAnimationEnd.emit({
      open: this.open,
      scrollIntoView: () => this.scrollIntoView(e.detail.bodyHeight),
    });
  };

  /**
   * Emitted when the user activates the toggle button.
   */
  @Event({ bubbles: false })
  dsoToggleClick!: EventEmitter<AccordionSectionToggleClickEvent>;

  /**
   * Event emitted when the Accordion Section completes its toggle animation.
   */
  @Event({ bubbles: false })
  dsoAnimationEnd!: EventEmitter<AccordionSectionAnimationEndEvent>;

  render() {
    const { variant, reverseAlign } = this.accordionState ?? {};
    const hasAddons = !!this.statusDescription || !!this.status || !!this.icon || !!this.attachmentCount;

    return (
      <Host
        class={{
          "dso-accordion-section": true,
          ["dso-accordion-" + variant]: true,
          "dso-nested-accordion": this.hasNestedAccordion,
          "dso-accordion-reverse-align": reverseAlign ?? false,
        }}
        hidden={!variant}
        onMouseenter={() => (this.hover = true)}
        onMouseleave={() => (this.hover = false)}
      >
        <Handle heading={this.heading} ref={(element) => (this.sectionHeading = element)}>
          <HandleElement handleUrl={this.handleUrl} onClick={this.handleClick} open={this.open}>
            {reverseAlign ? (
              <Fragment>
                {hasAddons && (
                  <div class="dso-section-handle-addons">
                    <HandleIcon icon={this.icon} />
                  </div>
                )}

                <span>{this.handleTitle}</span>

                <dso-icon class="dso-section-handle-chevron" icon="chevron-down"></dso-icon>
              </Fragment>
            ) : (
              <Fragment>
                <dso-icon class="dso-section-handle-chevron" icon="chevron-right"></dso-icon>

                {this.status && <span class="sr-only">{stateMap[this.status]}</span>}

                <span>
                  {this.handleTitle}
                  {this.isNeutral && (
                    <dso-icon class="info-icon" icon={this.open || this.hover ? "info-active" : "info"} />
                  )}
                </span>

                {hasAddons && (
                  <div class="dso-section-handle-addons">
                    {this.statusDescription && <span class="dso-status">{this.statusDescription}</span>}
                    <HandleIcon state={this.status} icon={this.icon} attachmentCount={this.attachmentCount} />
                  </div>
                )}
              </Fragment>
            )}
          </HandleElement>
        </Handle>
        <dso-expandable
          class="dso-section-body"
          open={this.open}
          enableAnimation
          minimumHeight={this.isNeutral ? 0 : 4}
          onDsoExpandableAnimationEnd={this.handleExpandableAnimationEnd}
        >
          <div class="dso-section-body-content" ref={(element) => (this.sectionBody = element)}>
            <slot />
          </div>
        </dso-expandable>
      </Host>
    );
  }
}
