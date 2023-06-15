import { h, Component, ComponentInterface, Element, Event, EventEmitter, Prop, State, Host, JSX } from "@stencil/core";
import { isTabbable } from "tabbable";

import { Mapper } from "./ozon-content-mapper";
import { OzonContentContext } from "./ozon-content-context.interface";
import { OzonContentAnchorClick, OzonContentClick } from "./ozon-content.interfaces";
import { OzonContentNodeState } from "./ozon-content-node-state.interface";

@Component({
  tag: "dso-ozon-content",
  styleUrl: "ozon-content.scss",
  scoped: true,
})
export class OzonContent implements ComponentInterface {
  /**
   * The XML to be rendered.
   */
  @Prop()
  content: string | undefined;

  /**
   * Setting this property creates dso-ozon-content as inline element instead of a block element.
   */
  @Prop({ reflect: true })
  inline = false;

  /**
   * Marks content as deleted using visual and accessible clues.
   */
  @Prop({ reflect: true })
  deleted = false;

  /**
   * Visualize the component as interactive. This means that the component will emit `dsoClick` events when the user clicks non-interactive elements.
   *
   * **Do not** use this without an accessible companion element! `interactive` is only
   * meant to ease the use of the companion element for mouse/touch users.
   *
   * * `true`: Interactive anchor-look-alike
   * * `"sub"`: Interactive anchor-look-alike for sub navigation
   * * `false | undefined`: Disabled
   */
  @Prop({ reflect: true })
  interactive: "sub" | "" | boolean = false;

  @State()
  state: OzonContentNodeState = {};

  /**
   * Emitted when `<a>` is clicked.
   */
  @Event()
  dsoAnchorClick!: EventEmitter<OzonContentAnchorClick>;

  /**
   * These events are only emitted when the component is `interactive`.
   */
  @Event()
  dsoClick!: EventEmitter<OzonContentClick>;

  @Element()
  host!: HTMLDsoOzonContentElement;

  private mapper = new Mapper();

  private handleHostOnClick(e: UIEvent) {
    // '' is `true`: <dso-ozon-content interactive>
    if (this.interactive !== "" && !this.interactive) {
      return;
    }

    const doIt =
      e
        .composedPath()
        .find(
          (eventTarget) => eventTarget === this.host || (eventTarget instanceof HTMLElement && isTabbable(eventTarget))
        ) === this.host;

    if (doIt) {
      this.dsoClick.emit({ originalEvent: e });
    }
  }

  render(): JSX.Element {
    const context: OzonContentContext = {
      state: this.state,
      setState: (state) => (this.state = state),
      emitAnchorClick: this.dsoAnchorClick.emit,
    };

    const transformed = this.mapper.transform(this.content ?? "", context);

    if (this.deleted) {
      return (
        <section>
          <slot name="prefix" />
          <span class="deleted-start">Begin verwijderd element</span>
          {transformed}
          <span class="deleted-end">Einde verwijderd element</span>
          <slot name="suffix" />
        </section>
      );
    }

    return (
      <Host onClick={(e: UIEvent) => this.handleHostOnClick(e)}>
        <slot name="prefix" />
        {transformed}
        <slot name="suffix" />
      </Host>
    );
  }
}
