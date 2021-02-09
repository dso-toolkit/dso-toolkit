import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'dso-card',
  styleUrl: 'card.scss'
})

export class Card {
  @Prop()
  label?: string;

  @Prop()
  content?: string;

  render() {
    return (
      <li>
        <div class="dso-card">
          <a href="#">
            <h2>{this.label}</h2>
            <p>{this.content}</p>
          </a>
          <dso-card-interactions />
        </div>
      </li>
    )
  }
}
