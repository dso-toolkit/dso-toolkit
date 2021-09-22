import { ArgsStoryFn } from '@storybook/addons';
import { StorybookParameters } from '../../stories-helpers';

import { treeViewArgTypes } from './tree-view.args';
import { items, subItems } from './tree-view.content';
import { TreeView } from './tree-view.models';

export interface TreeViewParameters<TemplateFnReturnType> {
  treeViewTemplate: (treeViewProperties: TreeView<string>) => TemplateFnReturnType;
}

export function storiesOfTreeView<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    treeViewTemplate,
  }: TreeViewParameters<TemplateFnReturnType>
) {
  const stories = storiesOf('Tree View', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: treeViewArgTypes
    });

  stories.add(
    'Tree View',
    (args: any) => treeViewTemplate(args),
    {
      args: {
        collection: items,
        onFetchItems: (event: any) => subItems,
        onItemOpen: (event: any) => items[0] = { ...items[0], open: true },
        onItemClose: (event: any) => items[0] = { ...items[0], open: false },
      }
    }
  );
}
