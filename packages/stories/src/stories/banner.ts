import { StoryParameters } from '../story-parameters';

interface BannerStoriesParameters extends StoryParameters {
  warningRichContent: any;
  richWarningRichContent: any;
  dangerRichContent: any;
  dangerWithHeadingsRichContent: any;
}

export function bannerStories({
  storiesOf,
  module: mainModule,
  readme,
  template,
  warningRichContent,
  richWarningRichContent,
  dangerRichContent,
  dangerWithHeadingsRichContent
}: BannerStoriesParameters) {
  const stories = storiesOf('Banner', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: {
        richContent: {
          control: {
            disable: true
          }
        },
        status: {
          options: ['warning', 'danger'],
          control: {
            type: 'select'
          }
        },
        onClick: {
          action: 'closed'
        }
      }
    });

  stories.add(
    'warning',
    template,
    {
      args: {
        status: 'warning',
        richContent: warningRichContent
      }
    }
  );

  stories.add(
    'danger',
    template,
    {
      args: {
        status: 'danger',
        richContent: dangerRichContent
      }
    }
  );

  stories.add(
    'rich warning',
    template,
    {
      args: {
        status: 'warning',
        richContent: richWarningRichContent
      }
    }
  );

  stories.add(
    'danger with headings',
    template,
    {
      args: {
        status: 'danger',
        richContent: dangerWithHeadingsRichContent
      }
    }
  );
}
