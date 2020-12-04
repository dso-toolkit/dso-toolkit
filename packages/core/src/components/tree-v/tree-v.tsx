import { Component, h } from '@stencil/core';

@Component({
  tag: 'dso-tree',
  styleUrl: 'tree.scss',
  shadow: true
})
export class Tree {
  render() {
    return(
      <nav class="dso-tree-view">
        <ul>
          <slot></slot>
        </ul>
      </nav>
    );
  }
};
