import { Args } from '@storybook/addons';
import { ArgsError, StorybookParameters } from '../../stories-helpers';
import { TreeViewArgs, treeViewArgTypes } from './tree-view.args';

import { TreeViewDemo } from './tree-view.demo';
import { TreeViewItem } from './tree-view.models';

export interface TreeViewParameters<TemplateFnReturnType> {
  treeViewDemoTemplate: (
    collection: TreeViewItem<string>[],
    onOpenItem: (path: TreeViewItem<string>[], callback: (collection: TreeViewItem<string>[]) => void) => void,
    onCloseItem: (path: TreeViewItem<string>[], callback: (collection: TreeViewItem<string>[]) => void) => void,
    onClickItem: (path: TreeViewItem<string>[]) => void
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
      options: {
        // https://github.com/storybookjs/storybook/issues/12074#issuecomment-961294555
        enableShortcuts: false
      },
      controls: {
        hideNoControlsWarning: true
      },
      docs: {
        page: readme
      },
      argTypes: treeViewArgTypes
    });

  stories.add(
    'Tree View',
    (a: Args | undefined) => {
      if (!a) {
        throw new ArgsError();
      }

      const args = a as TreeViewArgs;

      return treeViewDemoTemplate(TreeViewDemo.collection, TreeViewDemo.onOpenItem, TreeViewDemo.onCloseItem, args.onClickItem);
    }
  );
}
