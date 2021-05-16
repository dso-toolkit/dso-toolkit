import { v1 as uuidv4 } from 'uuid';

import { StoriesParameters } from '../story-parameters';

export function datePickerStories({
  module: mainModule,
  storiesOf,
  readme,
  template
}: StoriesParameters) {
  const stories = storiesOf('Date Picker', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      args: {
        label: 'Datum',
        disabled: false,
        showExternalButton: false
      },
      argTypes: {
        value: {
          control: {
            type: 'text'
          }
        },
        min: {
          control: {
            type: 'text'
          }
        },
        max: {
          control: {
            type: 'text'
          }
        },
        onDateChange: {
          action: 'date changed'
        }
      }
    });

  stories.add(
    'default',
    template,
    {
      args: {
        id: uuidv4()
      }
    }
  );

  stories.add(
    'disabled',
    template,
    {
      args: {
        id: uuidv4(),
        disabled: true
      }
    }
  );

  stories.add(
    'with value',
    template,
    {
      args: {
        id: uuidv4(),
        value: '15-11-2020'
      }
    }
  );

  stories.add(
    'with min and max',
    template,
    {
      args: {
        id: uuidv4(),
        min: '3-1-2020',
        max: '28-1-2020'
      }
    }
  );
}
