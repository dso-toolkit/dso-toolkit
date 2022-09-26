import { storiesOfTreeView } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import readme from '@dso-toolkit/core/src/components/tree-view/readme.md';
import { html } from 'lit-html';
import { treeViewTemplate } from '@dso-toolkit/core/src/components/tree-view/tree-view.template';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfTreeView(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.Core
  },
  {
    treeViewDemoTemplate: (collection, dsoOpenItem, dsoCloseItem, dsoClickItem, onFilterInput) => html`
      <div style="display: grid; width: 100%; grid-auto-columns: minmax(0, 1fr); grid-auto-flow: column;">
        <div>
          ${treeViewTemplate({
            collection,
            dsoOpenItem: function (e) {
              dsoOpenItem(e.detail, collection => this.collection = collection);
            },
            dsoCloseItem: function (e) {
              dsoCloseItem(e.detail, collection => this.collection = collection);
            },
            dsoClickItem: function (e) {
              dsoClickItem(e.detail.path, e.detail.originalEvent, collection => this.collection = collection);
            }
          })}
        </div>
        <div>
          <label for="treeViewSearchInput">Zoek</label>
          <input
            type="text"
            id="treeViewSearchInput"
            @input=${(e: any) => onFilterInput(e.target.value, (collection, searchResultCountText) => {
              document.querySelector<any>('dso-tree-view')!.collection = collection;
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
