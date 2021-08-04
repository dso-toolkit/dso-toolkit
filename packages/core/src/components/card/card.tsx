import { Component, h, Prop } from '@stencil/core';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { iconTemplate } from '../icon/icon.template';

@Component({
  tag: 'dso-card',
  styleUrl: 'card.scss',
  shadow: true
})
export class Card {
  @Prop()
  label!: string;

  @Prop()
  interactions!: string;

  @Prop()
  content!: string;

  render() {
    return (
      <div class="dso-card">
        <div class="dso-card-heading">
          <a href="#">
            <div class="dso-rich-content">
              <h2>
                {this.label}
                {iconTemplate({ icon: 'chevron-right' })}
              </h2>
            </div>
          </a>
          {this.interactions && (
            <dso-card-interactions label={this.label}></dso-card-interactions>
          )}
        </div>
        <div class="dso-card-content">
          <p>{unsafeHTML(this.content)}</p>
        </div>
      </div>
    );
  }
}
