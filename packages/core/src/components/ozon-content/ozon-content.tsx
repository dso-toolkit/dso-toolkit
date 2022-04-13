import { Component,  ComponentInterface,  Event,  EventEmitter,  Prop,  State,} from '@stencil/core';

import { Mapper } from './ozon-content-mapper';
import { OzonContentContext } from './ozon-content-context.interface';
import { OzonContentAnchorClick } from './ozon-content.interfaces';

@Component({
  tag: 'dso-ozon-content',
  styleUrl: 'ozon-content.scss',
  // shadow: true,
  scoped: true
})
export class OzonContent implements ComponentInterface {
  @Prop()
  content: string | undefined;

  @State()
  state: { [nodeId: string]: unknown } = {};

  @Event()
  anchorClick!: EventEmitter<OzonContentAnchorClick>;

  private mapper = new Mapper();

  render(): JSX.Element {
    const context: OzonContentContext = {
      state: this.state,
      setState: state => this.state = state,
      emitAnchorClick: this.anchorClick.emit
    };

    return this.mapper.transform(this.content ?? '', context);
  }
}
