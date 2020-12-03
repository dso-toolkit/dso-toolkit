import { Component, h, Prop } from '@stencil/core';
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

  render() {
    return (
      <ul class={clsx('dso-cards', {[`dso-flat`]: this.flat}, {[`dso-interactions-${this.interactionsLocation}`]: this.interactionsLocation})}>
        <slot></slot>
        {/* <li>Pieter gek</li> */}
      </ul>
    )
  }
}
