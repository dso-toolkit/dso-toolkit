import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: 'dso-attachments-counter',
  styleUrl: 'attachments-counter.scss',
  shadow: true
})
export class AttachmentsCounter {
  @Prop()
  count!: number;

  render() {
    return(
      <span class="dso-attachments">
        <slot></slot>
        <span class="sr-only">bijlage{this.count !== 1 ? 'n' : ''}</span>
      </span>
    );
  }
}
