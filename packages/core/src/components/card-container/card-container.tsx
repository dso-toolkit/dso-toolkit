import { CardContainerMode } from "@dso-toolkit/sources";
import { h, Component, ComponentInterface, Fragment, Prop } from "@stencil/core";

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
          <ul class={`dso-card-${this.mode}`}>
            <slot />
          </ul>
        )}
        {this.mode === "grid" && (
          <div class={`dso-card-${this.mode}`}>
            <slot />
          </div>
        )}
      </>
    );
  }
}
