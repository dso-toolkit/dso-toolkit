import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { alertArgsMapper, alertTypeArgs } from './alert.args';
import { alertWithHeadingsContent } from './alert.content';
import { Alert, AlertWithHeadingsContent } from './alert.models';

export interface AlertParameters<TemplateFnReturnType> {
  alertTemplate: (alertProperties: Alert<TemplateFnReturnType>) => TemplateFnReturnType;
  alertWithHeadingsTemplate: (properties: AlertWithHeadingsContent) => TemplateFnReturnType;
}

export function storiesOfAlert<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    alertTemplate,
    alertWithHeadingsTemplate
  }: AlertParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(alertArgsMapper, alertTemplate);

  const stories = storiesOf('Alert', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      args: {
        withRoleAlert: false,
        withButton: true
      },
      argTypes: alertTypeArgs
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
        message: 'Dit is een informatiemelding. Deze wordt gebruikt voor <a href="#" class="extern" target="_blank" rel="noopener noreferrer">aanvullende</a> informatie of tips.'
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

  stories.add(
    'with headings',
    template,
    {
      argTypes: {
        message: {
          control: {
            disable: true
          }
        }
      },
      args: {
        status: 'info',
        message: alertWithHeadingsTemplate(alertWithHeadingsContent)
      }
    }
  );
}
