import { bindTemplate, componentArgs, StorybookParameters } from '../../stories-helpers';

import { TabsArgs, tabsArgsMapper, tabsArgTypes } from './tabs.args';
import { Tabs } from './tabs.models';

export interface TabsParameters<TemplateFnReturnType> {
  tabsTemplate: (tabsProperties: Tabs) => TemplateFnReturnType;
}

export function storiesOfTabs<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    tabsTemplate
  }: TabsParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(tabsArgsMapper, tabsTemplate);

  const stories = storiesOf('Tabs', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: tabsArgTypes
    });

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
