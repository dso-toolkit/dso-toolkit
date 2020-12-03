import { Component, h } from '@stencil/core';

@Component({
  tag: 'dso-card',
  styleUrl: 'card.scss',
  shadow: true
})
export class Card {
  render() {
    return (
      <li>
        <slot></slot>
      </li>
    )
  }
}
