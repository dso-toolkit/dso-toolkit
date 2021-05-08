import { action } from '@storybook/addon-actions';

import { StoryParameters } from '../story-parameters';

export function labelStories({
  module: mainModule,
  storiesOf,
  readme,
  template
}: StoryParameters) {
  const stories = storiesOf('Label', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: {
        status: {
          options: [undefined, 'primary', 'success', 'info', 'warning', 'danger'],
          control: {
            type: 'select',
          }
        },
        button: {
          control: {
            disable: true
          }
        }
      },
      args: {
        label: 'Label'
      }
    });

  stories.add(
    'default',
    template
  );

  stories.add(
    'with action',
    template,
    {
      args: {
        button: {
          title: 'Verwijder',
          icon: 'times',
          onClick: action('action activated')
        }
      }
    }
  );
}
