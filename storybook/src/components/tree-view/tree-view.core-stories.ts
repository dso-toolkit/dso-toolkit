import { type Meta } from "@storybook/web-components";
import { TreeViewArgs, treeViewMeta, treeViewStories } from "dso-toolkit";
import { html } from "lit-html";

import readme from "@dso-toolkit/core/src/components/tree-view/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta<TreeViewArgs> = {
  ...treeViewMeta({ readme }),
  title: "Core/Tree View",
};

export default meta;

const { treeView } = treeViewStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { treeViewTemplate } = templates;

    return {
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
    };
  },
});

export { treeView };
