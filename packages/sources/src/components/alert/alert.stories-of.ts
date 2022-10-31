import { StoriesOfArguments, storiesOfFactory } from '../../storybook/stories-of-factory';

import { AlertArgs, alertArgsMapper, alertArgTypes } from './alert.args';
import { alertWithHeadingsContent } from './alert.content';
import { Alert } from './alert.models';

export interface AlertTemplates<TemplateFnReturnType> {
  alertTemplate: (alertProperties: Alert<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function storiesOfAlert<Implementation, Templates, TemplateFnReturnType> (
  storyFunctionArguments: StoriesOfArguments<Implementation, Templates, TemplateFnReturnType, AlertTemplates<TemplateFnReturnType>>
) {
  return storiesOfFactory('Alert', storyFunctionArguments, (stories, templateMapper) => {
    stories
      .addParameters({
        argTypes: alertArgTypes,
        args: {
          withRoleAlert: false,
          withButton: true
        }
      });

    const template = templateMapper<AlertArgs>((args, { alertTemplate }) => alertTemplate(alertArgsMapper(args)));

    stories.add(
      'success',
      template,
      {
        args: {
          status: 'success',
          message: '<p>Dit is een succesmelding. Deze wordt getoond als een proces succesvol is afgerond.</p>'
        }
      }
    );

    stories.add(
      'info',
      template,
      {
        args: {
          status: 'info',
          message: '<p>Dit is een informatiemelding. Deze wordt gebruikt voor <a href="#" class="extern" target="_blank" rel="noopener noreferrer">aanvullende</a> informatie of tips.</p>'
        }
      }
    );

    stories.add(
      'warning',
      template,
      {
        args: {
          status: 'warning',
          message: '<p>Dit is een waarschuwingsmelding. Deze wordt gebruikt voor waarschuwingen.</p>'
        }
      }
    );

    stories.add(
      'danger',
      template,
      {
        args: {
          status: 'danger',
          message: '<p>Dit is een <a href="#">foutmelding</a>. Deze wordt getoond als er iets is misgegaan.</p>'
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
          message: alertWithHeadingsContent
        }
      }
    );
  });
}
