import { StorybookParameters } from '../../stories-helpers';

import { TreeViewDemo } from './tree-view.demo';
import { TreeViewItem } from './tree-view.models';

export interface TreeViewParameters<TemplateFnReturnType> {
  treeViewDemoTemplate: (
    collection: TreeViewItem<string>[],
    onOpenItem: (tree: TreeViewItem<string>[], path: TreeViewItem<string>[], callback: (collection: TreeViewItem<string>[]) => void) => void,
    onCloseItem: (tree: TreeViewItem<string>[], path: TreeViewItem<string>[], callback: (collection: TreeViewItem<string>[]) => void) => void
  ) => TemplateFnReturnType;
}

export function storiesOfTreeView<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    treeViewDemoTemplate,
  }: TreeViewParameters<TemplateFnReturnType>
) {
  const stories = storiesOf('Tree View', mainModule)
    .addParameters({
      controls: {
        hideNoControlsWarning: true
      },
      docs: {
        page: readme
      }
    });

  stories.add(
    'Tree View',
    () => treeViewDemoTemplate(TreeViewDemo.collection, TreeViewDemo.onOpenItem, TreeViewDemo.onCloseItem)
  );
}
