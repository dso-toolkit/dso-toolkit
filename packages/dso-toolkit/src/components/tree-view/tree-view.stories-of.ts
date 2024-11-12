import { ComponentAnnotations, Renderer } from "@storybook/types";

import { TreeViewArgs, treeViewArgTypes } from "./tree-view.args.js";
import * as TreeViewDemo from "./tree-view.demo.js";
import { TreeViewItem } from "./tree-view.models.js";

import { StoriesParameters, StoryObj } from "../../template-container";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface";

interface TreeViewStories {
  TreeView: StoryObj<TreeViewArgs, Renderer>;
}

interface TreeViewStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, TreeViewTemplates<TemplateFnReturnType>> {}

export interface TreeViewTemplates<TemplateFnReturnType> {
  treeViewDemoTemplate: (
    collection: TreeViewItem[],
    dsoOpenItem: (path: TreeViewItem[], callback: (collection: TreeViewItem[]) => void) => void,
    dsoCloseItem: (path: TreeViewItem[], callback: (collection: TreeViewItem[]) => void) => void,
    dsoClickItem: (
      path: TreeViewItem[],
      originalEvent: MouseEvent,
      callback: (collection: TreeViewItem[]) => void,
    ) => void,
    onFilterInput: (text: string, callback: (collection: TreeViewItem[], resultText: string) => void) => void,
  ) => TemplateFnReturnType;
}

export function treeViewMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  TreeViewArgs
> {
  return {
    argTypes: treeViewArgTypes,
    parameters: {
      options: {
        // https://github.com/storybookjs/storybook/issues/12074#issuecomment-961294555
        enableShortcuts: false,
      },
      controls: {
        hideNoControlsWarning: true,
      },
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function treeViewStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: TreeViewStoriesParameters<Implementation, Templates, TemplateFnReturnType>): TreeViewStories {
  return {
    TreeView: {
      render: templateContainer.render(storyTemplates, (args, { treeViewDemoTemplate }) => {
        const click = (
          path: TreeViewItem[],
          originalEvent: MouseEvent,
          callback: (collection: TreeViewItem[]) => void,
        ) => {
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
      }),
    },
  };
}
