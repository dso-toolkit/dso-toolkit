import { TreeView } from '@dso-toolkit/sources';
import { html } from 'lit-html';

import { ComponentImplementation } from '../../templates';

export const coreTreeView: ComponentImplementation<TreeView> = {
  component: 'treeView',
  implementation: 'core',
  template: () => function treeViewTemplate(
    {
      collection,
      dsoOpenItem,
      dsoCloseItem,
      dsoClickItem
    }
  ) {
    return html`
      <dso-tree-view
        .collection=${collection}
        @dsoOpenItem=${dsoOpenItem}
        @dsoCloseItem=${dsoCloseItem}
        @dsoClickItem=${dsoClickItem}
      ></dso-tree-view>
    `;
  }
};
