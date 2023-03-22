import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  Watch,
} from "@stencil/core";
import anime from "animejs";
import clsx from "clsx";
import debounce from "debounce";

import { ExpandableInterface, ExpandableToggleEvent } from "./expandable.interfaces";

@Component({
  tag: "dso-expandable",
  styleUrl: "expandable.scss",
  shadow: true,
})
export class Expandable implements ComponentInterface, ExpandableInterface {
  private resizeObserver?: ResizeObserver;

  private bodyHeight?: number;

  private animeInstance?: anime.AnimeInstance;

  @Element()
  host!: HTMLElement;

  @Prop({ reflect: true })
  open?: boolean;

  @Prop()
  enableAnimation = false;

  @Prop()
  animationOffset?: number;

  @Event()
  dsoToggle!: EventEmitter<ExpandableToggleEvent>;

  @Watch("open")
  toggleOpen() {
    if (this.enableAnimation) {
      this.activateAnimation();
    }
  }

  @Method()
  async getAnimeInstance(): Promise<anime.AnimeInstance | undefined> {
    return this.animeInstance;
  }

  componentWillLoad(): void {
    if (this.enableAnimation) {
      this.prepareAnimationResizeObserver();
    }
  }

  componentDidLoad(): void {
    const bodyContentElement = this.host.shadowRoot?.querySelector("slot");

    if (bodyContentElement) {
      this.resizeObserver?.observe(bodyContentElement);
    }
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }

  render() {
    return (
      <Host
        aria-hidden={this.open ? "false" : "true"}
        class={clsx({
          "dso-animate-ready": this.enableAnimation && this.animeInstance !== undefined,
          "dso-hide": !this.enableAnimation && !this.open,
        })}
      >
        <slot />
      </Host>
    );
  }

  private prepareAnimationResizeObserver(): void {
    this.resizeObserver = new ResizeObserver(
      debounce(([entry]) => {
        // entry.contentRect does not include padding, so we use getBoundingClientRect.
        const height = entry.target.getBoundingClientRect().height;
        if (this.bodyHeight !== height) {
          this.bodyHeight = height;

          this.instantiateAnimation();
        }
      }, 150)
    );
  }

  private instantiateAnimation(): void {
    this.animeInstance = anime({
      targets: this.host,
      height: this.animationOffset ?? 0,
      easing: "cubicBezier(0.4, 0, 0.2, 1)",
      duration: 260,
      autoplay: false,
      direction: "normal",
      begin: () => {
        if (this.host) {
          if (this.open) {
            this.host.style.visibility = "";
            this.host.style.position = "";
            this.host.style.bottom = "";
          }
        }
      },
      complete: () => {
        if (this.host) {
          this.host.style.height = "";

          if (!this.open) {
            this.host.style.visibility = "hidden";
            this.host.style.position = "absolute";
            this.host.style.bottom = "100%";
          }
        }
      },
    });

    if (!this.open) {
      this.animeInstance.reverse();
      this.animeInstance.play();
    }

    if (this.host) {
      this.host.style.height = "";
    }
  }

  private activateAnimation(): void {
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
