import { Args } from '@storybook/addons';
import { ArgsError, createStories, StorybookParameters } from '../../storybook';
import { TreeViewArgs, treeViewArgTypes } from './tree-view.args';

import * as TreeViewDemo from './tree-view.demo';
import { TreeViewItem } from './tree-view.models';

export interface TreeViewParameters<TemplateFnReturnType> {
  treeViewDemoTemplate: (
    collection: TreeViewItem[],
    onOpenItem: (path: TreeViewItem[], callback: (collection: TreeViewItem[]) => void) => void,
    onCloseItem: (path: TreeViewItem[], callback: (collection: TreeViewItem[]) => void) => void,
    onClickItem: (path: TreeViewItem[], originalEvent: MouseEvent, callback: (collection: TreeViewItem[]) => void) => void,
    onFilterInput: (text: string, callback: (collection: TreeViewItem[], resultText: string) => void) => void,
  ) => TemplateFnReturnType;
}

export function storiesOfTreeView<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    treeViewDemoTemplate,
  }: TreeViewParameters<TemplateFnReturnType>
) {
  const stories = createStories('Tree View', parameters, treeViewArgTypes)
    .addParameters({
      options: {
        // https://github.com/storybookjs/storybook/issues/12074#issuecomment-961294555
        enableShortcuts: false
      },
      controls: {
        hideNoControlsWarning: true
      }
    });

  stories.add(
    'Tree View',
    (a: Args | undefined) => {
      if (!a) {
        throw new ArgsError();
      }

      const args = a as TreeViewArgs;

      const click = (path: TreeViewItem[], originalEvent: MouseEvent, callback: (collection: TreeViewItem[]) => void) => {
        args.dsoClickItem(path, originalEvent, callback);
        TreeViewDemo.onClickItem(path, originalEvent, callback);
      }

      return treeViewDemoTemplate(
        TreeViewDemo.collection,
        TreeViewDemo.onOpenItem,
        TreeViewDemo.onCloseItem,
        click,
        TreeViewDemo.onFilter);
    }
  );
}
