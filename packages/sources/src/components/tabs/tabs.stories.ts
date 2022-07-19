import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { tabsArgsMapper, tabsArgTypes } from './tabs.args';
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
      'tab default',
      template,
      {
        args: {
          tabs: [
            {
              label: 'Zoek op adres',
              modifiers: 'active'
            },
            {
              label: 'Postcode en huisnummer'
            },
            {
              label: 'Kadastraal nummer'
            },
            {
              label: 'Coordinaten'
            }
          ]
        }
      }
    );

  stories.add(
    'tab deactief',
    template,
    {
      args: {
        tabs: [
          {
            label: 'Zoek op adres'
          },
          {
            label: 'Postcode en huisnummer',
            modifiers: 'active'
          },
          {
            label: 'Kadastraal nummer'
          },
          {
            label: 'Coordinaten',
            modifiers: 'disabled'
          }
        ]
      }
    }
  );
}
