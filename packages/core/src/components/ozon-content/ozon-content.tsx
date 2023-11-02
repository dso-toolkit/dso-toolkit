import {
  h,
  Component,
  ComponentInterface,
  Event,
  EventEmitter,
  Prop,
  State,
  Fragment,
  JSX,
  Watch,
} from "@stencil/core";

import { Mapper } from "./ozon-content-mapper";
import { OzonContentContext } from "./ozon-content-context.interface";
import { OzonContentAnchorClickEvent, OzonContentInputType } from "./ozon-content.interfaces";
import { OzonContentNodeState } from "./ozon-content-node-state.interface";

const mapper = new Mapper();

@Component({
  tag: "dso-ozon-content",
  styleUrl: "ozon-content.scss",
  shadow: true,
})
export class OzonContent implements ComponentInterface {
  /**
   * The XML to be rendered.
   */
  @Prop()
  content?: OzonContentInputType;

  /**
   * Setting this property creates dso-ozon-content as inline element instead of a block element.
   */
  @Prop({ reflect: true })
  inline = false;

  /**
   * Emitted when `<a>` is clicked.
   */
  @Event()
  dsoAnchorClick!: EventEmitter<OzonContentAnchorClickEvent>;

  @Watch("content")
  contentWatcher() {
    this.state = {};
  }

  @State()
  state: OzonContentNodeState = {};

  render(): JSX.Element {
    const context: OzonContentContext = {
      state: this.state,
      inline: this.inline,
      setState: (state) => (this.state = state),
      emitAnchorClick: this.dsoAnchorClick.emit,
    };

    const transformed = mapper.transform(this.content, context);

    return <Fragment>{transformed}</Fragment>;
  }
}
