import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Fragment,
  JSX,
  Method,
  Prop,
  State,
  Watch,
  h,
} from "@stencil/core";

import { MarkTextMarkFunction } from "../../functional-components/mark-text/mark-text.interfaces";

import { OzonContentContext } from "./ozon-content-context.interface";
import { Mapper } from "./ozon-content-mapper";
import { OzonContentNodeState } from "./ozon-content-node-state.interface";
import {
  OzonContentBegripResolver,
  OzonContentClickEvent,
  OzonContentInputType,
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
  @Element()
  host!: HTMLDsoOzonContentElement;

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
  mark?: MarkTextMarkFunction;

  /**
   * A UrlResolver that will be called for all STOP elements that render to HTML5 elements with external references.
   */
  @Prop()
  urlResolver?: OzonContentUrlResolver;

  /**
   * A BegripResolver that will be called for STOP element "IntRef". If the ref-attribute of IntRef points to a Begrip it
   * should return the `<Definitie>` of that Begrip otherwise it should return undefined.
   */
  @Prop()
  begripResolver?: OzonContentBegripResolver;

  /**
   * Boolean indicating that this dso-ozon-content is part of an annotated context. If true the content of the
   * toggletip for "IntIoRef" will show a "Kenmerken en kaart" annotation button.
   */
  @Prop({ reflect: true })
  annotated: boolean = false;

  /**
   * Emitted when an interactive element is clicked.
   */
  @Event({ bubbles: false })
  dsoClick!: EventEmitter<OzonContentClickEvent>;

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

  /**
   * Returns the rendered element of the STOP element with the given `eId`, or `undefined` when it is not rendered.
   *
   * @param eId The `eId` attribute value of the STOP element, e.g. `chp_1__art_1.1__list_o_1__item_1`.
   */
  @Method()
  async getElementByEId(eId: string): Promise<HTMLElement | undefined> {
    return this.host.shadowRoot?.getElementById(eId) ?? undefined;
  }

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
      emitClick: this.dsoClick.emit,
      urlResolver: this.urlResolver,
      begripResolver: this.begripResolver,
      annotated: this.annotated,
    };

    const transformed = mapper.transform(this.content, context);

    return <Fragment>{transformed}</Fragment>;
  }
}

const _dependencies = () => {
  _dependencies();

  return (
    <Fragment>
      <dso-icon />
      <dso-image-overlay />
      <dso-ozon-content-toggletip />
      <dso-table />
    </Fragment>
  );
};
