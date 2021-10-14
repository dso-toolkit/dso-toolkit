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
    treeViewDemoTemplate: (collection, onOpenItem, onCloseItem) => html`
      ${treeViewTemplate({
        collection,
        onOpenItem: function (e) {
          onOpenItem(this.collection, e.detail, collection => this.collection = collection);
        },
        onCloseItem: function (e) {
          onCloseItem(this.collection, e.detail, collection => this.collection = collection);
        }
      })}
    `
  }
);
