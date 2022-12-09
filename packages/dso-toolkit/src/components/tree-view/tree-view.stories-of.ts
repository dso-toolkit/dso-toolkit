import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";
import { TreeViewArgs, treeViewArgTypes } from "./tree-view.args.js";

import * as TreeViewDemo from "./tree-view.demo.js";
import { TreeViewItem } from "./tree-view.models.js";

export interface TreeViewTemplates<TemplateFnReturnType> {
  treeViewDemoTemplate: (
    collection: TreeViewItem[],
    dsoOpenItem: (path: TreeViewItem[], callback: (collection: TreeViewItem[]) => void) => void,
    dsoCloseItem: (path: TreeViewItem[], callback: (collection: TreeViewItem[]) => void) => void,
    dsoClickItem: (
      path: TreeViewItem[],
      originalEvent: MouseEvent,
      callback: (collection: TreeViewItem[]) => void
    ) => void,
    onFilterInput: (text: string, callback: (collection: TreeViewItem[], resultText: string) => void) => void
  ) => TemplateFnReturnType;
}

export function storiesOfTreeView<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    TreeViewTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Tree View", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: treeViewArgTypes,
      options: {
        // https://github.com/storybookjs/storybook/issues/12074#issuecomment-961294555
        enableShortcuts: false,
      },
      controls: {
        hideNoControlsWarning: true,
      },
    });

    stories.add(
      "Tree View",
      templateMapper<TreeViewArgs>((args, { treeViewDemoTemplate }) => {
        const click = (
          path: TreeViewItem[],
          originalEvent: MouseEvent,
          callback: (collection: TreeViewItem[]) => void
        ) => {
          args.dsoClickItem(path, originalEvent, callback);
          TreeViewDemo.onClickItem(path, originalEvent, callback);
        };

        return treeViewDemoTemplate(
          TreeViewDemo.collection,
          TreeViewDemo.onOpenItem,
          TreeViewDemo.onCloseItem,
          click,
          TreeViewDemo.onFilter
        );
      })
    );

    return stories;
  });
}
