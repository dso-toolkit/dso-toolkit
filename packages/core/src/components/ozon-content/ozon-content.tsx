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
import {
  OzonContentAnchorClickEvent,
  OzonContentInputType,
  OzonContentMarkFunction,
  OzonContentMarkItemHighlightEvent,
} from "./ozon-content.interfaces";
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
   * To mark text.
   */
  @Prop()
  mark?: OzonContentMarkFunction;

  /**
   * Emitted when `<a>` is clicked.
   */
  @Event({ bubbles: false })
  dsoAnchorClick!: EventEmitter<OzonContentAnchorClickEvent>;

  /**
   * Emitted when a marked item is highlighted.
   */
  @Event({ bubbles: false })
  dsoOzonContentMarkItemHighlight!: EventEmitter<OzonContentMarkItemHighlightEvent>;

  @Watch("content")
  contentWatcher() {
    this.state = {};
  }

  @State()
  state: OzonContentNodeState = {};

  private handleMarkItemHighlight = (text: string, elementRef: HTMLElement) => {
    this.dsoOzonContentMarkItemHighlight.emit({ text, elementRef });
  };

  render(): JSX.Element {
    const context: OzonContentContext = {
      state: this.state,
      inline: this.inline,
      mark: this.mark,
      setState: (state) => (this.state = state),
      emitMarkItemHighlight: this.handleMarkItemHighlight,
      emitAnchorClick: this.dsoAnchorClick.emit,
    };

    const transformed = mapper.transform(this.content, context);

    return <Fragment>{transformed}</Fragment>;
  }
}

const dependencies = () => {
  dependencies();

  return (
    <>
      <dso-icon />
      <dso-image-overlay />
      <dso-tooltip />
      <dso-table />
    </>
  );
};
