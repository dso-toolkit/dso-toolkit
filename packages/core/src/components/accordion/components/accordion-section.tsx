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
  FunctionalComponent,
  Method,
} from "@stencil/core";

import { AccordionInternalState } from "../accordion.interfaces";
import {
  AccordionHeading,
  AccordionSectionAnimationEndEvent,
  AccordionSectionState,
  AccordionSectionToggleClickEvent,
  AccordionSectionAnimationStartEvent,
  stateMap,
} from "./accordion-section.interfaces";
import { ExpandableAnimationEndEvent } from "../../expandable/expandable";
import { BadgeStatus } from "../../badge/badge.interfaces";

// eslint-disable-next-line no-console
const log = (window as any)["_dsoLog"] === true ? console.log.bind(console.log) : function () {};

const HandleElement: FunctionalComponent<{
  handleUrl: string | undefined;
  open: boolean;
  handleElementRef: (element: HTMLAnchorElement | HTMLButtonElement | undefined) => void;
  onClick: (e: MouseEvent) => void;
}> = ({ handleUrl, onClick, open, handleElementRef }, children) => {
  if (handleUrl) {
    return (
      <a href={handleUrl} onClick={onClick} aria-expanded={open ? "true" : "false"} ref={handleElementRef}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-expanded={open ? "true" : "false"} ref={handleElementRef}>
      {children}
    </button>
  );
};

const Handle: FunctionalComponent<{
  heading: AccordionHeading;
  ref: (element: HTMLHeadingElement | undefined) => void;
}> = ({ heading, ref }, children) => {
  switch (heading) {
    default:
    case "h2":
      return (
        <h2 ref={ref} class="dso-section-handle">
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 ref={ref} class="dso-section-handle">
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 ref={ref} class="dso-section-handle">
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5 ref={ref} class="dso-section-handle">
          {children}
        </h5>
      );
  }
};

const HandleIcon: FunctionalComponent<{
  state?: AccordionSectionState;
  icon?: string;
  attachmentCount?: number;
}> = ({ state, icon, attachmentCount }) => {
  if (state) {
    return <HandleStateIcon state={state} />;
  }

  if (attachmentCount) {
    return <dso-attachments-counter count={attachmentCount}></dso-attachments-counter>;
  }

  if (icon) {
    return <dso-icon icon={icon}></dso-icon>;
  }
};

const HandleStateIcon: FunctionalComponent<{ state: AccordionSectionState }> = ({ state }) => {
  if (state === "error") {
    return <dso-icon icon="status-error"></dso-icon>;
  }

  if (state === "danger") {
    return <dso-icon icon="status-danger"></dso-icon>;
  }

  if (state === "success") {
    return <dso-icon icon="status-success"></dso-icon>;
  }

  if (state === "info") {
    return <dso-icon icon="status-info"></dso-icon>;
  }

  if (state === "warning") {
    return <dso-icon icon="status-warning"></dso-icon>;
  }
};

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

  /**
   * Set when this Accordion Section contains or will contain an Accordion.
   */
  @Prop({ reflect: true })
  hasNestedAccordion = false;

  /**
   * A message to be displayed in the heading handle inside a Badge (optional)
   */
  @Prop()
  badgeMessage?: string;

  /**
   * The status of the Badge in the heading handle (optional)
   */
  @Prop()
  badgeStatus?: BadgeStatus;

  /**
   * Calling this method will set focus to the handle.
   */
  @Method()
  async focusHandle() {
    this.handleElementRef?.focus();
  }

  @State()
  hover = false;

  get containsNestedAccordion() {
    return this.host.querySelector("dso-accordion") !== null;
  }

  componentWillLoad() {
    this.accordion?._getState().then((state) => {
      this.accordionState = state;

      forceUpdate(this.host);
    });
  }

  get isNeutral() {
    return this.accordionState?.variant === "neutral";
  }

  private async scrollIntoView(bodyHeight: number | undefined, behavior: ScrollBehavior = "auto"): Promise<void> {
    log(
      `DSO Toolkit [Accordion Section] scrollIntoView(bodyHeight: ${JSON.stringify(
        bodyHeight,
      )}, behavior: ${JSON.stringify(behavior)})`,
    );

    const bodyClientRect = this.sectionBody?.getBoundingClientRect();
    const headingClientRect = this.sectionHeading?.getBoundingClientRect();

    log(`DSO Toolkit [Accordion Section] const bodyClientRect = ${JSON.stringify(bodyClientRect)};`);
    log(`DSO Toolkit [Accordion Section] const headingClientRect = ${JSON.stringify(headingClientRect)};`);
    log(`DSO Toolkit [Accordion Section] this.accordionState = ${JSON.stringify(this.accordionState)};`);
    log(`DSO Toolkit [Accordion Section] this.open = ${JSON.stringify(this.open)};`);

    if (!bodyClientRect || !headingClientRect || !this.accordionState) {
      log(`DSO Toolkit [Accordion Section] returning`);

      return;
    }

    // this y is relative to the top of the viewport.
    const sectionBottomY = headingClientRect.top + headingClientRect.height + (this.open ? (bodyHeight ?? 0) : 0);

    log(`DSO Toolkit [Accordion Section] const sectionBottomY = ${JSON.stringify(sectionBottomY)};`);
    log(`DSO Toolkit [Accordion Section] window.innerHeight = ${JSON.stringify(window.innerHeight)};`);

    const box = this.host.getBoundingClientRect();

    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    const clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
    const top = box.top + scrollTop - clientTop;

    log("DSO Toolkit [Accordion Section] scroll", { box, scrollTop, clientTop, top });

    if (sectionBottomY > window.innerHeight) {
      log(
        `DSO Toolkit [Accordion Section] sectionBottomY > window.innerHeight === ${JSON.stringify(
          sectionBottomY > window.innerHeight,
        )};`,
      );

      const expandedAccordionHeight = sectionBottomY - headingClientRect.top;
      const shouldScrollToTopOfSection = expandedAccordionHeight > window.innerHeight;

      log(
        `DSO Toolkit [Accordion Section] const expandedAccordionHeight = ${JSON.stringify(expandedAccordionHeight)};`,
      );
      log(
        `DSO Toolkit [Accordion Section] const shouldScrollToTopOfSection = ${JSON.stringify(
          shouldScrollToTopOfSection,
        )};`,
      );

      window.scrollTo({
        top: shouldScrollToTopOfSection ? top : top - (window.innerHeight - expandedAccordionHeight),
        behavior,
      });
    } else if (headingClientRect.top < 0) {
      log(
        `DSO Toolkit [Accordion Section] headingClientRect.top < 0 === ${JSON.stringify(headingClientRect.top < 0)};`,
      );

      window.scrollTo({
        top,
        behavior,
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

  private handleExpandableAnimationStart = (e: CustomEvent<any>) => {
    this.dsoAnimationStart.emit({
      animation: this.open ? "opening" : "closing",
      scrollIntoView: (behavior: ScrollBehavior = "auto") => this.scrollIntoView(e.detail.bodyHeight, behavior),
    });
  };

  private handleExpandableAnimationEnd = (e: CustomEvent<ExpandableAnimationEndEvent>) => {
    this.dsoAnimationEnd.emit({
      open: this.open,
      scrollIntoView: (behavior: ScrollBehavior = "auto") => this.scrollIntoView(e.detail.bodyHeight, behavior),
    });
  };

  /**
   * Emitted when the user activates the toggle button.
   */
  @Event({ bubbles: false })
  dsoToggleClick!: EventEmitter<AccordionSectionToggleClickEvent>;

  /**
   * Event emitted when the Accordion Section starts its toggle animation.
   */
  @Event({ bubbles: false })
  dsoAnimationStart!: EventEmitter<AccordionSectionAnimationStartEvent>;

  /**
   * Event emitted when the Accordion Section completes its toggle animation.
   */
  @Event({ bubbles: false })
  dsoAnimationEnd!: EventEmitter<AccordionSectionAnimationEndEvent>;

  private handleElementRef?: HTMLAnchorElement | HTMLButtonElement;

  render() {
    const { variant, reverseAlign } = this.accordionState ?? {};
    const hasAddons = !!this.statusDescription || !!this.status || !!this.icon || !!this.attachmentCount;

    return (
      <Host
        class={{
          "dso-accordion-section": true,
          ["dso-accordion-" + variant]: true,
          "dso-nested-accordion": this.hasNestedAccordion || this.containsNestedAccordion,
          "dso-accordion-reverse-align": reverseAlign ?? false,
        }}
        hidden={!variant}
        onMouseenter={() => (this.hover = true)}
        onMouseleave={() => (this.hover = false)}
      >
        <Handle heading={this.heading} ref={(element) => (this.sectionHeading = element)}>
          <HandleElement
            handleUrl={this.handleUrl}
            onClick={this.handleClick}
            open={this.open}
            handleElementRef={(e) => (this.handleElementRef = e)}
          >
            {reverseAlign ? (
              <Fragment>
                {hasAddons && (
                  <div class="dso-section-handle-addons">
                    <HandleIcon icon={this.icon} />
                  </div>
                )}

                <span>{this.handleTitle}</span>

                {this.badgeMessage && <dso-badge status={this.badgeStatus}>{this.badgeMessage}</dso-badge>}

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

                {this.badgeMessage && <dso-badge status={this.badgeStatus}>{this.badgeMessage}</dso-badge>}

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
          onDsoExpandableAnimationStart={this.handleExpandableAnimationStart}
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
