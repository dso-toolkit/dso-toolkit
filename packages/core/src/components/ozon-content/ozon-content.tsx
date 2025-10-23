import {
  Component,
  ComponentInterface,
  Event,
  EventEmitter,
  Fragment,
  JSX,
  Prop,
  State,
  Watch,
  h,
} from "@stencil/core";

import { OzonContentContext } from "./ozon-content-context.interface";
import { Mapper } from "./ozon-content-mapper";
import { OzonContentNodeState } from "./ozon-content-node-state.interface";
import {
  OzonContentAnchorClickEvent,
  OzonContentClickEvent,
  OzonContentInputType,
  OzonContentMarkFunction,
  OzonContentMarkItemHighlightEvent,
  OzonContentUrlResolver,
} from "./ozon-content.interfaces";

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
   * A UrlResolver that will be called for all STOP elements that render to HTML5 elements with external references.
   */
  @Prop()
  urlResolver?: OzonContentUrlResolver;

  /**
   * Emitted when an interactive element is clicked, except for <IntIoRef> and <IntRef>.
   */
  @Event({ bubbles: false })
  dsoClick!: EventEmitter<OzonContentClickEvent>;

  /**
   * Emitted when `<a>` that is created through <IntIoRef> or <IntRef> is clicked.
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
      emitClick: this.dsoClick.emit,
      urlResolver: this.urlResolver,
    };

    const transformed = mapper.transform(this.content, context);

    return <Fragment>{transformed}</Fragment>;
  }
}

const dependencies = () => {
  dependencies();

  return (
    <Fragment>
      <dso-icon />
      <dso-image-overlay />
      <dso-tooltip />
      <dso-table />
    </Fragment>
  );
};
