import { h, Component, ComponentInterface, Fragment, Prop } from "@stencil/core";
import { CardContainerMode } from "./card-container.interfaces";

@Component({
  tag: "dso-card-container",
  styleUrl: "card-container.scss",
  shadow: true,
})
export class CardContainer implements ComponentInterface {
  @Prop()
  mode: CardContainerMode = "list";

  render() {
    return (
      <>
        {this.mode === "list" && (
          <ul class="dso-card-list">
            <slot />
          </ul>
        )}
        {this.mode === "grid" && (
          <div class="dso-card-grid">
            <slot />
          </div>
        )}
      </>
    );
  }
}
