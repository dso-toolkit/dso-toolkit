import { StoriesParameters } from '../story-parameters';

export function progressBarStories({
  module: mainModule,
  storiesOf,
  readme,
  template
}: StoriesParameters) {
  const stories = storiesOf('Progress Bar', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: {
        min: {
          control: {
            type: 'number'
          }
        },
        max: {
          control: {
            type: 'number'
          }
        }
      }
    });

  stories.add(
    'default',
    template,
    {
      args: {
        progress: 30
      }
    }
  );

  stories.add(
    'with label',
    template,
    {
      args: {
        progress: 60,
        label: 'Nog ongeveer 4 minuten'
      }
    }
  );

  stories.add(
    'arbitrary values',
    template,
    {
      args: {
        progress: 3,
        max: 4,
        label: '3/4'
      }
    }
  );
}
