import * as React from "react";
import { type Meta } from "@storybook/react";

import { TreeViewArgs, TreeViewItem, treeViewMeta, treeViewStories } from "dso-toolkit";

import readme from "./readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta<TreeViewArgs> = {
  ...treeViewMeta({ readme }),
  title: "TreeView",
};

export default meta;

const { treeView } = treeViewStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { treeViewTemplate } = templates;

    interface TreeViewDemoProps {
      collection: TreeViewItem[];
      dsoOpenItem: (path: TreeViewItem[], callback: (collection: TreeViewItem[]) => void) => void;
      dsoCloseItem: (path: TreeViewItem[], callback: (collection: TreeViewItem[]) => void) => void;
      dsoClickItem: (
        path: TreeViewItem[],
        originalEvent: MouseEvent,
        callback: (collection: TreeViewItem[]) => void,
      ) => void;
      onFilter: (value: string, callback: (collection: TreeViewItem[], resultText: string) => void) => void;
    }

    interface TreeViewDemoState {
      collection: TreeViewItem[];
      searchResultCountText?: string;
    }

    class TreeViewDemo extends React.Component<TreeViewDemoProps, TreeViewDemoState> {
      constructor(props: TreeViewDemoProps) {
        super(props);

        this.state = {
          collection: props.collection,
        };
      }

      render() {
        return (
          <div className="container" style={{ display: "flex", width: "100%" }}>
            <div style={{ flex: 1 }}>
              {treeViewTemplate({
                collection: this.state.collection,
                dsoOpenItem: (e) => {
                  return this.props.dsoOpenItem(e.detail, (collection) => this.setState({ ...this.state, collection }));
                },
                dsoCloseItem: (e) =>
                  this.props.dsoCloseItem(e.detail, (collection) => this.setState({ ...this.state, collection })),
                dsoClickItem: (e) =>
                  this.props.dsoClickItem(e.detail.path, e.detail.originalEvent, (collection) =>
                    this.setState({ ...this.state, collection }),
                  ),
              })}
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="treeViewSearchInput">Zoek</label>
              <input
                type="text"
                id="treeViewSearchInput"
                onChange={(e) =>
                  this.props.onFilter(e.target.value, (collection, searchResultCountText) =>
                    this.setState({ ...this.state, collection, searchResultCountText }),
                  )
                }
              />
              <span id="treeViewSearchResultCount" aria-live="polite">
                {this.state.searchResultCountText}
              </span>
              <pre
                id="treeViewState"
                style={{ backgroundColor: "#eee", fontSize: "smaller", margin: 0, overflow: "auto", padding: "0.5rem" }}
              >
                {JSON.stringify(this.state.collection, null, 2)}
              </pre>
            </div>
          </div>
        );
      }
    }

    return {
      treeViewDemoTemplate: (collection, dsoOpenItem, dsoCloseItem, dsoClickItem, onFilter) => (
        <TreeViewDemo
          collection={collection}
          dsoOpenItem={dsoOpenItem}
          dsoCloseItem={dsoCloseItem}
          dsoClickItem={dsoClickItem}
          onFilter={onFilter}
        />
      ),
    };
  },
});

export { treeView };
