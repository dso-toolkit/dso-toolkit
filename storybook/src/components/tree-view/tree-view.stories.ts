import { storiesOfTreeView, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import readme from "@dso-toolkit/core/src/components/tree-view/readme.md?raw";
import { html } from "lit-html";

import { templateContainer } from "../../templates";

storiesOfTreeView({
  parameters: {
    module,
    storiesOf,
    readme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ treeViewTemplate }) => ({
    treeViewDemoTemplate: (collection, dsoOpenItem, dsoCloseItem, dsoClickItem, onFilterInput) => html`
      <div style="display: grid; width: 100%; grid-auto-columns: minmax(0, 1fr); grid-auto-flow: column;">
        <div>
          ${treeViewTemplate({
            collection,
            dsoOpenItem(e) {
              dsoOpenItem(e.detail, (collection) => (this.collection = collection));
            },
            dsoCloseItem(e) {
              dsoCloseItem(e.detail, (collection) => (this.collection = collection));
            },
            dsoClickItem(e) {
              dsoClickItem(e.detail.path, e.detail.originalEvent, (collection) => (this.collection = collection));
            },
          })}
        </div>
        <div>
          <label for="treeViewSearchInput">Zoek</label>
          <input
            type="text"
            id="treeViewSearchInput"
            @input=${(e: Event) =>
              e.target instanceof HTMLInputElement &&
              onFilterInput(e.target.value, (collection, searchResultCountText) => {
                const treeView = document.querySelector<HTMLDsoTreeViewElement>("dso-tree-view");
                if (treeView) {
                  treeView.collection = collection;

                  const target = document.getElementById("treeViewSearchResultCount");
                  if (target) {
                    target.innerText = searchResultCountText;
                  }
                }
              })}
          />
          <span id="treeViewSearchResultCount" aria-live="polite"></span>
          <pre
            id="treeViewState"
            style="background-color: #eee; font-size: smaller; margin: 0; overflow: auto; padding: 0.5rem"
          >
${JSON.stringify(collection, null, 2)}</pre
          >
        </div>
      </div>
    `,
  }),
});
