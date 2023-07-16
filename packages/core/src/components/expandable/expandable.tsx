import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import anime, { AnimeInstance } from "animejs";
import clsx from "clsx";
import debounce from "debounce";

export interface ExpandableAnimationEndEvent {
  bodyHeight: number | undefined;
}

@Component({
  tag: "dso-expandable",
  styleUrl: "expandable.scss",
  shadow: true,
})
export class Expandable implements ComponentInterface {
  private resizeObserver?: ResizeObserver;

  private bodyHeight?: number;

  private animeInstance?: AnimeInstance;

  @Element()
  host!: HTMLDsoExpandableElement;

  /**
   * Set to `true` to expand the content.
   */
  @Prop({ reflect: true })
  open?: boolean;

  /**
   * Set to `true` to show the content animated.
   */
  @Prop()
  enableAnimation = false;

  /**
   * When enableAnimation is set to `true`, this property specifies the height of this element at which the animation will expand from / collapse to
   */
  @Prop()
  minimumHeight?: number;

  @State()
  animationReady = false;

  @Watch("open")
  toggleOpen() {
    if (this.enableAnimation) {
      this.activateAnimation();
    }
  }

  @Watch("enableAnimation")
  toggleEnableAnimation(enableAnimation: boolean) {
    if (enableAnimation) {
      this.prepareAnimationResizeObserver();
      this.activateObserver();
    } else {
      this.resizeObserver?.disconnect();
      delete this.animeInstance;
      this.host.removeAttribute("style");
    }
  }

  /**
   * Fired when the animation ends. Only when `enableAnimation = true`.
   */
  @Event({ bubbles: false })
  dsoExpandableAnimationEnd!: EventEmitter<ExpandableAnimationEndEvent>;

  componentDidLoad(): void {
    if (this.enableAnimation) {
      this.prepareAnimationResizeObserver();
    }

    this.activateObserver();
  }

  private activateObserver() {
    const bodyContentElement = this.host.querySelector(`[slot="expandable-content"]`);

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
          "dso-animate-ready": this.enableAnimation && this.animationReady,
          "dso-hide": !this.enableAnimation && !this.open,
        })}
      >
        <slot name="expandable-content" />
      </Host>
    );
  }

  private prepareAnimationResizeObserver(): void {
    this.resizeObserver = new ResizeObserver(
      debounce(([entry]) => {
        if (!entry) {
          throw new Error("No entry found");
        }

        // entry.contentRect does not include padding, so we use getBoundingClientRect.
        const height = entry.target.getBoundingClientRect().height;

        if (this.bodyHeight !== height) {
          this.bodyHeight = height;
        }
      }, 150)
    );

    this.instantiateAnimation();
  }

  private instantiateAnimation(): void {
    this.animeInstance = anime({
      targets: this.host,
      height: this.minimumHeight ?? 0,
      easing: "cubicBezier(0.4, 0, 0.2, 1)",
      duration: 260,
      autoplay: false,
      direction: "normal",
      begin: () => {
        if (this.open) {
          this.host.style.visibility = "";
          this.host.style.position = "";
          this.host.style.bottom = "";
        }
      },
      complete: () => {
        this.host.style.height = "";

        if (!this.open) {
          this.host.style.visibility = "hidden";
          this.host.style.position = "absolute";
          this.host.style.bottom = "100%";
        }
      },
      changeComplete: () => {
        this.dsoExpandableAnimationEnd.emit({ bodyHeight: this.bodyHeight });
      },
    });

    if (!this.open) {
      this.animeInstance.reverse();
      this.animeInstance.play();
    }

    if (this.host) {
      this.host.style.height = "";
    }

    this.animationReady = !!this.animeInstance;
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
