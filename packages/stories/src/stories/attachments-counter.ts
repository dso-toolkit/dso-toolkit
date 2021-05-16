import { StoriesParameters } from '../story-parameters';

export function attachmentsCounterStories({
  module: mainModule,
  storiesOf,
  readme,
  template
}: StoriesParameters) {
  const stories = storiesOf('Attachments Counter', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: {
        count: {
          control: {
            type: 'number'
          }
        }
      }
    });

  stories.add(
    'Attachments Counter',
    template,
    {
      args: {
        count: 3
      }
    }
  );
}
