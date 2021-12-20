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
    treeViewDemoTemplate: (collection, onOpenItem, onCloseItem, onClickItem, onFilterInput) => html`
      <div class="container" style="display: flex; width: 100%;">
        <div style="flex: 1">
          ${treeViewTemplate({
            collection,
            onOpenItem: function (e) {
              onOpenItem(e.detail, collection => this.collection = collection);
            },
            onCloseItem: function (e) {
              onCloseItem(e.detail, collection => this.collection = collection);
            },
            onClickItem: function (e) {
              onClickItem(e.detail.path, e.detail.originalEvent, collection => this.collection = collection);
            }
          })}
        </div>
        <div style="flex: 1">
          <label for="treeViewSearchInput">Zoek</label>
          <input
            type="text"
            id="treeViewSearchInput"
            @input=${(e: any) => onFilterInput(e.target.value, (collection, searchResultCountText) => {
              document.querySelector('dso-tree-view')!.collection = collection;
              const target = document.getElementById('treeViewSearchResultCount');
              if (target) {
                target.innerText = searchResultCountText;
              }
            })}
          />
          <span id="treeViewSearchResultCount" aria-live="polite"></span>
          <pre id="treeViewState" style="background-color: #eee; font-size: smaller; margin: 0; overflow: auto; padding: 0.5rem">${ JSON.stringify(collection, null, 2) }</pre>
        </div>
      </div>
    `
  }
);
