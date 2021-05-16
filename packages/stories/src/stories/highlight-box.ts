import { StoriesParameters } from '../story-parameters';

export interface HighlightBoxStoriesParameters extends StoriesParameters {
  richContent: any;
}

export function highlightBoxStories({
  module: mainModule,
  storiesOf,
  readme,
  template,
  richContent
}: HighlightBoxStoriesParameters) {
  const stories = storiesOf('Highlight Box', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      args: {
        yellow: false,
        white: false,
        border: false,
        dropShadow: false,
        step: null,
        icon: null,
        richContent
      },
      argTypes: {
        yellow: {
          control: {
            type: 'boolean'
          }
        },
        white: {
          control: {
            type: 'boolean'
          }
        },
        dropShadow: {
          control: {
            type: 'boolean'
          }
        },
        border: {
          control: {
            type: 'boolean'
          }
        },
        step: {
          control: {
            type: 'number',
            min: 0
          }
        },
        icon: {
          control: {
            type: 'select',
            options: [undefined, 'plus', 'table']
          }
        }
      }
    });

  stories.add(
    'default',
    template
  );

  stories.add(
    'yellow',
    template,
    {
      args: {
        yellow: true
      }
    }
  );

  stories.add(
    'white with dropshadow',
    template,
    {
      args: {
        white: true,
        dropShadow: true
      }
    }
  );

  stories.add(
    'with border',
    template,
    {
      args: {
        border: true
      }
    }
  );

  stories.add(
    'with step',
    template,
    {
      args: {
        yellow: true,
        step: 2
      }
    }
  );

  stories.add(
    'with icon',
    template,
    {
      args: {
        yellow: true,
        icon: 'plus'
      }
    }
  );
}
