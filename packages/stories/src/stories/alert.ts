import { StoryParameters } from '../story-parameters';

export function alertStories({
  module: mainModule,
  storiesOf,
  readme,
  template
}: StoryParameters) {
  const stories = storiesOf('Alert', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      args: {
        withRoleAlert: false,
        withButton: true
      },
      argTypes: {
        status: {
          options: ['success', 'info', 'warning', 'danger'],
          control: {
            type: 'select',
          }
        },
        message: {
          control: {
            type: 'text',
            required: true
          }
        },
        withRoleAlert: {
          control: {
            type: 'boolean'
          }
        },
        withButton: {
          control: {
            type: 'boolean'
          }
        },
        onClick: {
          action: 'closed'
        }
      }
    });

  stories.add(
    'success',
    template,
    {
      args: {
        status: 'success',
        message: 'Dit is een succesmelding. Deze wordt getoond als een proces succesvol is afgerond.'
      }
    }
  );

  stories.add(
    'info',
    template,
    {
      args: {
        status: 'info',
        message: 'Dit is een informatiemelding. Deze wordt gebruikt voor <a href="#">aanvullende</a> informatie of tips.'
      }
    }
  );

  stories.add(
    'warning',
    template,
    {
      args: {
        status: 'warning',
        message: 'Dit is een waarschuwingsmelding. Deze wordt gebruikt voor waarschuwingen.'
      }
    }
  );

  stories.add(
    'danger',
    template,
    {
      args: {
        status: 'danger',
        message: 'Dit is een <a href="#">foutmelding</a>. Deze wordt getoond als er iets is misgegaan.'
      }
    }
  );
}
