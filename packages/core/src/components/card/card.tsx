import { Component, h } from '@stencil/core';

@Component({
  tag: 'dso-card',
  styleUrl: 'card.scss'
})

export class Card {
  render() {
    return (
      <li>
        <slot></slot>
        <slot name="interactions"></slot>
      </li>
    )
  }
}
