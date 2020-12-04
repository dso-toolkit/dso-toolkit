import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'dso-tree-branch',
  styleUrl: 'tree-branch.scss',
  shadow: true
})
export class TreeBranch {
  @Prop()
  label!: string;

  @Prop()
  items!: [];

  render() {
    return(
      <li>
        <h2 class="dso-tree-view-subhead">{this.label}</h2>
        {this.items &&
          <ul>
            apie
            {this.items.map(item => {
              <dso-tree-item item={item}></dso-tree-item>
            })}
          </ul>
        }
      </li>
    );
  }
};
