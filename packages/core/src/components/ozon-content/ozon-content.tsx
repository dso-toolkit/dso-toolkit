import { h, Event, Component, ComponentInterface, Prop, Listen, EventEmitter } from '@stencil/core';

import { ContentAnchor } from './ozon-content.interfaces';
import { OzonContentTransformer } from './ozon-content.transformer';

@Component({
  tag: 'dso-ozon-content',
  styleUrl: 'ozon-content.scss'
})
export class OzonContent implements ComponentInterface {
  @Prop()
  content!: string;

  @Event()
  anchorClick!: EventEmitter<ContentAnchor>;

  @Listen('click')
  handleClick(event: PointerEvent) {
    this.transformer.handleClickEvent(event);
  }

  private container?: HTMLDivElement;

  private transformer!: OzonContentTransformer;

  componentWillLoad() {
    this.transformer = new OzonContentTransformer(this.anchorClick)
  }

  componentWillRender() {
    this.transformer.setContent(this.content);
  }

  render() {
    return <div class="dso-rich-content" ref={el => this.container = el} />;
  }

  componentDidRender() {
    const content = this.transformer.content;

    if (this.container && content) {
      this.container.replaceChildren(...Array.from(content));
    }
    else {
      this.container?.replaceChildren();
    }
  }
}
