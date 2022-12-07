import {
  h,
  Component,
  ComponentInterface,
  Host,
  Element,
  State,
  Prop,
  Fragment,
  Method,
  forceUpdate,
  Watch,
} from "@stencil/core";

import anime from "animejs";
import debounce from "debounce";

import { AccordionInterface, AccordionInternalState } from "../accordion.interfaces";
import { AccordionHeading, AccordionSectionState, stateMap } from "./accordion-section.interfaces";
import { Handle, HandleElement, HandleIcon } from "./handles";

@Component({
  tag: "dso-accordion-section",
  styleUrl: "accordion-section.scss",
  shadow: true,
})
export class AccordionSection implements ComponentInterface {
  private accordion?: AccordionInterface;

  private accordionState?: AccordionInternalState;

  private animeInstance?: anime.AnimeInstance;

  private sectionBody?: HTMLDivElement;

  private resizeObserver?: ResizeObserver;

  private bodyHeight?: number;

  @Element()
  host!: HTMLElement;

  @Prop()
  handleTitle?: string;

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

  @Prop()
  icon?: string;

  @Prop()
  status?: string;

  @Prop({ reflect: true, mutable: true })
  open = false;

  @State()
  hasNestedSection = false;

  @Watch("open")
  toggleOpen() {
    this.activateAnimation();
  }

  componentWillLoad() {
    const accordion = this.host.parentElement;

    this.hasNestedSection = this.host.querySelector("dso-accordion") !== null;

    if (isAccordion(accordion)) {
      this.accordion = accordion;
      accordion.getState().then((state) => {
        this.accordionState = state;
        forceUpdate(this.host);
      });
    }

    this.startAnimationResizeObserver();
  }

  componentDidLoad(): void {
    const bodyContentElement = this.host.shadowRoot?.querySelector(".dso-section-body-content");

    if (bodyContentElement) {
      this.resizeObserver?.observe(bodyContentElement);
    }
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }

  /** Toggle this section */
  @Method()
  async toggleSection(): Promise<void> {
    return this.accordion?.toggleSection(this.host);
  }

  private async toggle(e?: MouseEvent): Promise<void> {
    e?.preventDefault();

    return this.accordion?.toggleSection(this.host, e);
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
      >
        <Handle heading={this.heading}>
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

                <span>{this.handleTitle}</span>

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
        <div
          class={{ "dso-section-body": true, "dso-animate-ready": !!this.animeInstance }}
          ref={(element) => (this.sectionBody = element)}
          aria-hidden={this.open ? "false" : "true"}
        >
          <div class="dso-section-body-content">
            <slot />
          </div>
        </div>
      </Host>
    );
  }

  private startAnimationResizeObserver() {
    this.resizeObserver = new ResizeObserver(
      debounce(([entry]) => {
        if (this.bodyHeight !== entry.contentRect.height) {
          this.bodyHeight = entry.contentRect.height;

          this.instantiateAnimation();
        }
      }, 150)
    );
  }

  private instantiateAnimation() {
    this.animeInstance = anime({
      targets: this.sectionBody,
      height: 4,
      easing: "cubicBezier(0.4, 0, 0.2, 1)",
      duration: 260,
      autoplay: false,
      direction: "normal",
      begin: () => {
        if (this.sectionBody) {
          if (this.open) {
            this.sectionBody.style.visibility = "";
            this.sectionBody.style.position = "";
            this.sectionBody.style.bottom = "";
          }
        }
      },
      complete: () => {
        if (this.sectionBody) {
          this.sectionBody.style.height = "";

          if (!this.open) {
            this.sectionBody.style.visibility = "hidden";
            this.sectionBody.style.position = "absolute";
            this.sectionBody.style.bottom = "100%";
          }
        }
      },
    });

    if (!this.open) {
      this.animeInstance.reverse();
      this.animeInstance.play();
    }

    if (this.sectionBody) {
      this.sectionBody.style.height = "";
    }
  }

  private activateAnimation() {
    if (this.animeInstance) {
      if (this.animeInstance.progress > 0 && this.animeInstance.progress < 100) {
        this.animeInstance.reverse();
      } else {
        if (this.open) {
          this.animeInstance.direction = "reverse";
          this.animeInstance.play();
        } else {
          this.animeInstance.direction = "normal";
          this.animeInstance.play();
        }
      }
    }
  }
}

function isAccordion(element: HTMLElement | AccordionInterface | null): element is AccordionInterface {
  return element instanceof HTMLElement && "getState" in element;
}
