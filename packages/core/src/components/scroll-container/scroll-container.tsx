import { Component, Event, EventEmitter, h, State } from "@stencil/core";
import clsx from "clsx";
import { DsoEvent } from "./scroll-container-interfaces";

@Component({
  tag: "dso-scroll-container",
  styleUrl: "scroll-container.scss",
  shadow: true,
})
export class ScrollContainer {
  @Event() dsoEvent!: EventEmitter<DsoEvent>;

  @State()
  scrollState: "top" | "middle" | "bottom" = "top";

  // @Listen("scroll")
  handleScroll = ({ target }: Event) => {
    if (target instanceof HTMLDivElement) {
      if (target.scrollTop === 0) {
        this.scrollState = "top";

        return;
      }

      if (target.scrollHeight - target.scrollTop - target.clientHeight < 1) {
        console.log("hier");
        this.scrollState = "bottom";

        return;
      }

      if (target.scrollTop > 0) {
        this.scrollState = "middle";

        return;
      }
    }
    console.log("the element was scrolled");
  };

  render() {
    return (
      <div class={clsx("scroll-container", `scroll-${this.scrollState}`)} onScroll={this.handleScroll}>
        <slot></slot>
      </div>
    );
  }
}
