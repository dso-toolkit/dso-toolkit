import { storiesOfTreeView } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import readme from './readme.md';
import { html } from 'lit-html';
import { treeViewTemplate } from './tree-view.template';

storiesOfTreeView(
  {
    module,
    storiesOf,
    readme
  },
  {
    treeViewDemoTemplate: (collection, onOpenItem, onCloseItem, onClickItem) => html`
      ${treeViewTemplate({
        collection,
        onOpenItem: function (e) {
          onOpenItem(e.detail, collection => this.collection = collection);
        },
        onCloseItem: function (e) {
          onCloseItem(e.detail, collection => this.collection = collection);
        },
        onClickItem: function (e) {
          onClickItem(e.detail);
        }
      })}
    `
  }
);
