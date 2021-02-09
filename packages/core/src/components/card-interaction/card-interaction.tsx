import { Component, Prop, h } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'dso-card-interaction',
  styleUrl: 'card-interaction.scss',
  shadow: true
})
export class CardInteraction {
  @Prop()
  label?: string;

  @Prop()
  modifier?: string;

  @Prop()
  icon?: string;

  render() {
    const classes = clsx(
      'btn',
      'btn-' + this.modifier
    );

    // const icon = this.icon;

    return (
      <div class="dso-card-interaction">
        <button
          type="button"
          class={classes}>
          <span class="sr-only">{this.label}</span>
          <dso-icon icon="info"></dso-icon>
        </button>
      </div>
    )
  }
}
