import { Component, h, Prop } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'dso-tree-item',
  styleUrl: 'tree-item.scss',
  shadow: true
})
export class TreeItem {
  @Prop()
  item!: {
    active: boolean;
    collapsed: boolean;
    items: [];
  };

  render() {
    return(
      // <li {{ className('dso-collection' if item.items else 'dso-entity', [item.active, 'dso-is-current'], [item.collapsed, 'is-closed']) }} >
      <li class={clsx({ [`dso-collection`]: this.item.items }, { [`dso-is-current`]: this.item.active }, { [`is-closed`]: this.item.collapsed })} >
        {/* {% if not item.items %}
          <a href="#">{{- item.label -}}</a>
        {% else %}
          <button type="button" aria-expanded="{{ not item.collapsed }}"><h3>{{- item.label -}}</h3></button>
          {{ branches(item.items) }}
        {% endif %} */}
      </li>
    );
  }
};
