import { componentArgs } from '../../storybook';
import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { TabsArgs, tabsArgsMapper, tabsArgTypes } from './tabs.args';
import { Tabs } from './tabs.models';

export interface TabsTemplates<TemplateFnReturnType> {
  tabsTemplate: (tabsProperties: Tabs) => TemplateFnReturnType;
}

export const storiesOfTabs = storiesOfFactory<TabsTemplates<any>, TabsArgs>('Tabs', (stories, templateMapper) => {
  stories.addParameters({
    argTypes: tabsArgTypes
  });

  const template = templateMapper((args, { tabsTemplate }) => tabsTemplate(tabsArgsMapper(args)));

  stories.add(
    'default',
    template,
    {
      args: componentArgs<TabsArgs>({
        items: [
          {
            label: 'Zoek op adres',
            id: 'tabitem-1',
            modifiers: 'active'
          },
          {
            label: 'Postcode en huisnummer',
            id: 'tabitem-2'
          },
          {
            label: 'Kadastraal nummer',
            id: 'tabitem-3'
          },
          {
            label: 'Coordinaten',
            id: 'tabitem-4'
          }
        ]
      })
    }
  );

  stories.add(
    'inactief',
    template,
    {
      args: componentArgs<TabsArgs>({
        items: [
          {
            label: 'Zoek op adres',
            id: 'tabitem-1'
          },
          {
            label: 'Postcode en huisnummer',
            id: 'tabitem-2',
            modifiers: 'active'
          },
          {
            label: 'Kadastraal nummer',
            id: 'tabitem-3'
          },
          {
            label: 'Coordinaten',
            id: 'tabitem-4',
            modifiers: 'disabled'
          }
        ]
      })
    }
  );
});
