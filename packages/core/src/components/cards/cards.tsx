import { Cards } from '@dso-toolkit/sources/dist/components/cards/cards.models';
import { Component, h } from '@stencil/core';

@Component({
  tag: 'dso-cards',
  styleUrl: 'cards.scss',
  shadow: true
})
export class Card {
  @Prop()
  cards: Cards;

  render() {
    return (
      <ul class="dso-cards">
        {this.cards.map((card: Card) => (
          <li>
            <slot></slot>
          </li>
        ))}
      </ul>
    );
  }
}
