import {
  h,
  Component,
  ComponentInterface,
  Element,
  forceUpdate,
  Fragment,
  Host,
  Method,
  Prop,
  State,
} from "@stencil/core";
import { isExpandable } from "../../expandable/expandable.functions";

import { AccordionInterface, AccordionInternalState } from "../accordion.interfaces";
import { AccordionHeading, AccordionSectionState, stateMap } from "./accordion-section.interfaces";
import { Handle, HandleElement, HandleIcon } from "./handles";

@Component({
  tag: "dso-accordion-section",
  styleUrl: "accordion-section.scss",
  shadow: true,
})
export class AccordionSection implements ComponentInterface {
  private static scrollCandidate?: HTMLElement;

  private accordion?: AccordionInterface;

  private accordionState?: AccordionInternalState;

  private sectionBody?: HTMLDivElement;

  private sectionHeading?: HTMLHeadingElement;

  private bodyHeight?: number;

  private expandable?: HTMLDsoExpandableElement;

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

  /** When set the handle will render as a `<a>`. When undefined it renders as a `<button>` */
  @Prop()
  handleUrl?: string;

  /** `state` takes precedence over `attachmentCount` and `icon` */
  @Prop()
  state?: AccordionSectionState;

  /** `attachmentCount` takes precedence over `icon` */
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
  status?: string;

  /**
   * To open the Accordion Section.
   */
  @Prop({ reflect: true })
  open = false;

  @State()
  hasNestedSection = false;

  @State()
  hover = false;

  componentWillLoad() {
    const accordion = this.host.parentElement;

    this.hasNestedSection = this.host.querySelector("dso-accordion") !== null;

    if (accordion && isAccordion(accordion)) {
      this.accordion = accordion;

      accordion._getState().then((state) => {
        this.accordionState = state;
        forceUpdate(this.host);
      });
    }
  }

  /** Toggle this section.
   * @param scrollIntoView boolean - defaults to true
   */
  @Method()
  async toggleSection(scrollIntoView = true): Promise<void> {
    await this.accordion?.toggleSection(this.host).then(async () => {
      if (scrollIntoView) {
        await this.scrollIntoViewWhenNeeded(true);
      }
    });
  }

  /** Scroll this section into view when needed. */
  @Method()
  async scrollSectionIntoView(): Promise<void> {
    await this.scrollIntoViewWhenNeeded(false);
  }

  get isNeutral() {
    return this.accordionState?.variant === "neutral";
  }

  private async scrollIntoViewWhenNeeded(sectionToggled: boolean): Promise<void> {
    AccordionSection.scrollCandidate = undefined;

    const bodyClientRect = this.sectionBody?.getBoundingClientRect();
    const headingClientRect = this.sectionHeading?.getBoundingClientRect();

    if (!bodyClientRect || !headingClientRect || !this.accordionState) {
      return;
    }

    const waitForAnimationBeforeScrolling = async (state: AccordionInternalState) => {
      this.bodyHeight = await this.expandable?._getBodyHeight();

      const sectionBottomOffsetTop =
        this.host.offsetTop + headingClientRect.height + (this.open ? this.bodyHeight ?? 0 : 0);

      return (
        sectionToggled && (sectionBottomOffsetTop > document.documentElement.scrollHeight || state.allowMultipleOpen)
      );
    };

    if (await waitForAnimationBeforeScrolling(this.accordionState)) {
      AccordionSection.scrollCandidate = this.host;
      return;
    }

    // this y is relative to the top of the viewport.
    const sectionBottomY = headingClientRect.top + headingClientRect.height + (this.open ? this.bodyHeight ?? 0 : 0);
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

  private setAnimationBehaviour(event: Event, section?: HTMLElement): void {
    const expandableElement = event.target;

    if (!(expandableElement instanceof HTMLElement)) {
      return;
    }

    if (isExpandable(expandableElement)) {
      this.expandable = expandableElement;
      this.expandable._getAnimeInstance().then((animeInstance) => {
        if (animeInstance) {
          animeInstance.changeComplete = async () => {
            if (!section) {
              return;
            }

            const accordion = section.parentElement;

            if (accordion && isAccordion(accordion)) {
              accordion?.animationEnd(section);
            }

            if (AccordionSection.scrollCandidate === this.host) {
              AccordionSection.scrollCandidate = undefined;
              await this.scrollSectionIntoView();
            }
          };
        }
      });
    }
  }

  private async toggle(e?: MouseEvent): Promise<void> {
    e?.preventDefault();

    this.accordion?.toggleSection(this.host, e).then(async (isOpen) => {
      if (isOpen) {
        await this.scrollIntoViewWhenNeeded(true);
      }
    });
  }

  render() {
    const { variant, reverseAlign } = this.accordionState ?? {};
    const hasAddons = !!this.status || !!this.state || !!this.icon || !!this.attachmentCount;

    return (
      <Host
        class={{
          "dso-accordion-section": true,
          ["dso-accordion-" + variant]: true,
          "dso-nested-accordion": this.hasNestedSection,
          "dso-accordion-reverse-align": reverseAlign ?? false,
        }}
        hidden={!variant}
        onMouseenter={() => (this.hover = true)}
        onMouseleave={() => (this.hover = false)}
      >
        <Handle heading={this.heading} ref={(element) => (this.sectionHeading = element)}>
          <HandleElement
            handleUrl={this.handleUrl}
            onClick={async (event) => await this.toggle(event)}
            open={this.open}
          >
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

                {this.state && <span class="sr-only">{stateMap[this.state]}</span>}

                <span>
                  {this.handleTitle}
                  {this.isNeutral && (
                    <dso-icon class="info-icon" icon={this.open || this.hover ? "info-active" : "info"} />
                  )}
                </span>

                {hasAddons && (
                  <div class="dso-section-handle-addons">
                    {this.status && <span class="dso-status">{this.status}</span>}
                    <HandleIcon state={this.state} icon={this.icon} attachmentCount={this.attachmentCount} />
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
          on_animationInstantiated={(e: Event) => this.setAnimationBehaviour(e, this.host)}
        >
          <div
            slot="expandable-content"
            class="dso-section-body-content"
            ref={(element) => (this.sectionBody = element)}
          >
            <slot />
          </div>
        </dso-expandable>
      </Host>
    );
  }
}

function isAccordion(element: Element): element is HTMLDsoAccordionElement {
  return element.tagName === "DSO-ACCORDION";
}
