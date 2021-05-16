import { StoriesParameters } from '../story-parameters';

export function badgeStories({
  module: mainModule,
  storiesOf,
  readme,
  template
}: StoriesParameters) {
  const stories = storiesOf('Badge', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: {
        status: {
          options: [undefined, 'primary', 'success', 'info', 'warning', 'danger'],
          control: {
            type: 'select'
          }
        }
      }
    });

  stories.add(
    'plain',
    template,
    {
      args: {
        message: 'Plain'
      }
    }
  );

  stories.add(
    'primary',
    template,
    {
      args: {
        status: 'primary',
        message: 'Primary'
      }
    }
  );

  stories.add(
    'success',
    template,
    {
      args: {
        status: 'success',
        message: 'Success'
      }
    }
  );

  stories.add(
    'info',
    template,
    {
      args: {
        status: 'info',
        message: 'Info'
      }
    }
  );

  stories.add(
    'warning',
    template,
    {
      args: {
        status: 'warning',
        message: 'Warning'
      }
    }
  );

  stories.add(
    'danger',
    template,
    {
      args: {
        status: 'danger',
        message: 'Danger'
      }
    }
  );
}
