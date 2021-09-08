import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'dso-card-interaction',
  styleUrl: 'card-interaction.scss',
  shadow: true
})
export class Card {
  @Prop()
  toggle: any;

  @Prop()
  button: any;

  @Prop()
  label!: string;

  render() {
    return (
      <div class="dso-card-interaction">
        {this.toggle && (
          <label>
            <input type="checkbox" name={this.toggle.id} />
            <span class="sr-only">{this.label}</span>
          </label>
        )}
        <button type="button">
          <dso-icon icon="info"></dso-icon>
        </button>
      </div>
    );
  }
}
