import { bindTemplate, componentArgs, createStories, StorybookParameters } from '../../storybook';

import { TabsArgs, tabsArgsMapper, tabsArgTypes } from './tabs.args';
import { Tabs } from './tabs.models';

export interface TabsParameters<TemplateFnReturnType> {
  tabsTemplate: (tabsProperties: Tabs) => TemplateFnReturnType;
}

export function storiesOfTabs<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    tabsTemplate
  }: TabsParameters<TemplateFnReturnType>
) {
  const stories = createStories('Tabs', parameters, tabsArgTypes);
  const template = bindTemplate(tabsArgsMapper, tabsTemplate);

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
}
