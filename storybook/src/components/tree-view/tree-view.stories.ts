import readme from "@dso-toolkit/core/src/components/tree-view/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { StoryObj } from "../../shared/story-obj.js";

import { TreeViewArgs, treeViewArgTypes } from "./tree-view.args.js";
import * as TreeViewDemo from "./tree-view.demo";
import { TreeViewItem } from "./tree-view.models.js";
import { treeViewTemplate } from "./tree-view.template.js";

const meta: Meta<TreeViewArgs> = {
  title: "Core/Tree View",
  argTypes: treeViewArgTypes,
  args: {
    dsoClickItem: fn(),
  },
  parameters: {
    options: {
      enableShortcuts: false,
    },
    controls: {
      hideNoControlsWarning: true,
    },
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const TreeView: StoryObj<TreeViewArgs, Renderer> = {
  render: (args) => {
    const treeViewDemoTemplate = (
      collection: TreeViewItem[],
      dsoOpenItem: (path: TreeViewItem[], callback: (collection: TreeViewItem[]) => void) => void,
      dsoCloseItem: (path: TreeViewItem[], callback: (collection: TreeViewItem[]) => void) => void,
      dsoClickItem: (
        path: TreeViewItem[],
        originalEvent: MouseEvent,
        callback: (collection: TreeViewItem[]) => void,
      ) => void,
      onFilterInput: (text: string, callback: (collection: TreeViewItem[], resultText: string) => void) => void,
    ) => html`
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
              onFilterInput(e.target.value, (collection: TreeViewItem[], searchResultCountText: string) => {
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
${JSON.stringify(collection, null, 2)}</pre>
        </div>
      </div>
    `;

    const click = (path: TreeViewItem[], originalEvent: MouseEvent, callback: (collection: TreeViewItem[]) => void) => {
      args.dsoClickItem(path, originalEvent, callback);
      TreeViewDemo.onClickItem(path, originalEvent, callback);
    };

    return treeViewDemoTemplate(
      TreeViewDemo.collection,
      TreeViewDemo.onOpenItem,
      TreeViewDemo.onCloseItem,
      click,
      TreeViewDemo.onFilter,
    );
  },
};
