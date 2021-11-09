import * as React from 'react';
import { storiesOfTreeView, TreeViewItem } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/react";

import { treeViewTemplate } from "./tree-view.template";
import readme from "./readme.md";

interface TreeViewDemoProps {
  collection: TreeViewItem<string>[];
  onOpenItem: (path: TreeViewItem<string>[], callback: (collection: TreeViewItem<string>[]) => void) => void;
  onCloseItem: (path: TreeViewItem<string>[], callback: (collection: TreeViewItem<string>[]) => void) => void;
  onClickItem: (path: TreeViewItem<string>[]) => void;
}

interface TreeViewDemoState {
  collection: TreeViewItem<string>[];
}

class TreeViewDemo extends React.Component<TreeViewDemoProps, TreeViewDemoState> {
  constructor(props: TreeViewDemoProps) {
    super(props);

    this.state = {
      collection: props.collection
    };
  }

  render() {
    return treeViewTemplate({
      collection: this.state.collection,
      onOpenItem: e => {
        return this.props.onOpenItem(e.detail, collection => this.setState({ ...this.state, collection }));
      },
      onCloseItem: e => this.props.onCloseItem(e.detail, collection => this.setState({ ...this.state, collection })),
      onClickItem: e => this.props.onClickItem(e.detail)
    });
  }
}

storiesOfTreeView(
  {
    module,
    storiesOf,
    readme,
  },
  {
    treeViewDemoTemplate: (collection, onOpenItem, onCloseItem, onClickItem) => (
      <TreeViewDemo collection={collection} onOpenItem={onOpenItem} onCloseItem={onCloseItem} onClickItem={onClickItem} />
    )
  }
);
