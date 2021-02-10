import { Component, h, Prop, Element } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'dso-cards',
  styleUrl: 'cards.scss',
  shadow: true
})
export class Cards {
  @Prop()
  flat?: boolean;

  @Prop()
  interactionsLocation?: string;

  @Element()
  host!: HTMLElement;

  children!: Element[];

  componentWillLoad() {
    this.children = Array.from(this.host.children);
  }

  render() {
    return (
      <ul class={clsx('dso-cards', {[`dso-flat`]: this.flat}, {[`dso-interactions-${this.interactionsLocation}`]: this.interactionsLocation})}>
        {this.children.map(c => (
          <li innerHTML={c.outerHTML}></li>
        ))}
      </ul>
    )
  }
}
