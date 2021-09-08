import { Interaction } from '@dso-toolkit/sources/dist/components/card/card.models';
import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'dso-card',
  styleUrl: 'card.scss',
  shadow: true
})
export class Card {
  @Prop()
  label!: string;

  @Prop()
  content!: string;

  render() {
    return (
      <div class="dso-card">
        <div class="dso-card-heading">
          <a href="#">
            <div class="dso-rich-content">
              <h2>
                <span>{this.label}</span>
                <dso-icon icon="chevron-right"></dso-icon>
              </h2>
            </div>
          </a>
          <slot name="interactions"></slot>
          {/* {this.interactions && (
            <dso-card-interactions label={this.label} interactions={this.interactions}></dso-card-interactions>
          )} */}
        </div>
        <div class="dso-card-content">
          <p>{this.content}</p>
        </div>
      </div>
    );
  }
}
