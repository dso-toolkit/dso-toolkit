import { StoriesParameters } from '../story-parameters';

export function iconStories({
  module: mainModule,
  storiesOf,
  readme,
  template
}: StoriesParameters) {
  const stories = storiesOf('Icon', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: {
        icon: {
          options: ['user', 'table'],
          control: {
            type: 'select',
          }
        }
      },
      args: {
        icon: 'user'
      }
    });

  stories.add(
    'Icon',
    template,
    {
      args: {
        icon: 'user'
      }
    }
  );
}
