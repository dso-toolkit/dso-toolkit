import { h, Component,  ComponentInterface,  Event,  EventEmitter,  Prop,  State } from '@stencil/core';

import { Mapper } from './ozon-content-mapper';
import { OzonContentContext } from './ozon-content-context.interface';
import { OzonContentAnchorClick } from './ozon-content.interfaces';
import { OzonContentNodeState } from './ozon-content-node-state.interface';

@Component({
  tag: 'dso-ozon-content',
  styleUrl: 'ozon-content.scss',
  scoped: true
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
  inline: boolean = false;

  /**
   * Marks content as deleted using visual and accessible clues.
   */
  @Prop({ reflect: true })
  deleted = false;

  @State()
  state: OzonContentNodeState = {};

  @Event()
  anchorClick!: EventEmitter<OzonContentAnchorClick>;

  private mapper = new Mapper();

  render(): JSX.Element {
    const context: OzonContentContext = {
      state: this.state,
      setState: state => this.state = state,
      emitAnchorClick: this.anchorClick.emit
    };

    const transformed = this.mapper.transform(this.content ?? '', context);

    if (this.deleted) {
      return (
        <section>
          <span class="deleted-start">Begin verwijderd element</span>
          {transformed}
          <span class="deleted-end">Einde verwijderd element</span>
        </section>
      );
    }

    return transformed;
  }
}
