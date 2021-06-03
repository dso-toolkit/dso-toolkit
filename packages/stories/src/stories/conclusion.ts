import { HandlerFunction } from '@storybook/addon-actions';

import { bindTemplate, Parameters, TemplateFn } from '@core';

import { Alert } from './alert';
import { Info } from './info';

export interface ConclusionSubitem<TemplateFnReturnType> {
  richContent: TemplateFnReturnType;
}

export interface ConclusionItem<TemplateFnReturnType> {
  modifier: string;
  label: string;
  subitems: ConclusionSubitem<TemplateFnReturnType>[];
}

export interface Conclusion<TemplateFnReturnType> {
  items: ConclusionItem<TemplateFnReturnType>[];
  alert?: Alert;
  info?: Info<TemplateFnReturnType>;
}

export interface ConclusionArgs<TemplateFnReturnType> {
  items: ConclusionItem<TemplateFnReturnType>[];
  alertMessage: string;
  alertStatus: string;
  info?: TemplateFnReturnType;
  infoFixed?: boolean;
  infoActive?: boolean;
  infoClosed: HandlerFunction;
  infoToggled: HandlerFunction;
}

export interface ConclusionTemplateFn<TemplateFnReturnType> extends TemplateFn<ConclusionArgs<TemplateFnReturnType>, TemplateFnReturnType> {
}

export interface ConclusionParameters<TemplateFnReturnType> extends Parameters<ConclusionArgs<TemplateFnReturnType>, TemplateFnReturnType> {
}

export interface ConclusionExtraParameters<TemplateFnReturnType> {
  info: TemplateFnReturnType;
}

export function storiesOfConclusion<TemplateFnReturnType>({
  module: mainModule,
  storiesOf,
  readme,
  template
}: ConclusionParameters<TemplateFnReturnType>, {
  info
}: ConclusionExtraParameters<TemplateFnReturnType>) {
  const stories = storiesOf('Conclusion', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: {
        items: {
          control: {
            disable: true
          }
        },
        alertMessage: {
          control: {
            type: 'string'
          }
        },
        alertStatus: {
          options: ['success', 'info', 'warning', 'danger'],
          control: {
            type: 'select'
          }
        },
        infoFixed: {
          control: {
            type: 'boolean'
          }
        },
        info: {
          control: {
            disable: true
          }
        },
        infoActive: {
          control: {
            type: 'boolean'
          }
        },
        infoClosed: {
          action: 'infoClosed'
        },
        infoToggled: {
          action: 'infoToggled'
        }
      }
    });

  stories.add(
    'success',
    bindTemplate(template),
    {
      args: {
        items: [
          {
            modifier: 'success',
            label: '<strong>Geen vergunning of melding nodig</strong> voor bouwactiviteit',
            subitems: [
              '<strong>Let op:</strong> Soms is er wel een omgevingsvergunning omgevingsplanactiviteit bouwen nodig.',
              '<strong>Let op:</strong> Misschien mag u nog niet gelijk gaan bouwen!'
            ]
          }
        ],
        alertStatus: 'success',
        alertMessage: 'Succes melding'
      }
    }
  );

  stories.add(
    'warning',
    bindTemplate(template),
    {
      args: {
        items: [
          {
            modifier: 'warning',
            label: '<strong>Neem contact op</strong> met uw gemeente voor omgevingsplanactiviteit op- en uitritten'
          },
          {
            modifier: 'danger',
            label: '<strong>Informatie geven</strong> voor milieubelastende activiteit'
          }
        ],
        alertStatus: 'warning',
        alertMessage: 'Waarschuwing'
      }
    }
  );

  stories.add(
    'forbidden',
    bindTemplate(template),
    {
      args: {
        items: [
          {
            modifier: 'forbidden',
            label: '<strong>Verboden</strong> voor omgevingsplanactiviteit lichthinder',
          }
        ],
        info,
        infoFixed: false
      }
    }
  );
}
