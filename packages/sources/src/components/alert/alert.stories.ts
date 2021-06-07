import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { alertArgsMapper, alertTypeArgs } from './alert.args';
import { Alert } from './alert.models';

export interface AlertParameters<TemplateFnReturnType> {
  alertTemplate: (alertProperties: Alert) => TemplateFnReturnType;
}

export function storiesOfAlert<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    alertTemplate
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
