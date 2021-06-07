import { bindTemplate, StorybookParameters } from '../../stories-helpers';
import { conclusionArgsMapper, conclusionArgTypes } from './conclusion.args';
import { Conclusion } from './conclusion.models';

export interface ConclusionParameters<TemplateFnReturnType> {
  conclusionTemplate: (conclusionProperties: Conclusion<TemplateFnReturnType>) => TemplateFnReturnType;
  info: TemplateFnReturnType;
}

export function storiesOfConclusion<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    conclusionTemplate,
    info
  }: ConclusionParameters<TemplateFnReturnType>
) {
  const stories = storiesOf('Conclusion', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: conclusionArgTypes
    });

  stories.add(
    'success',
    bindTemplate(conclusionArgsMapper, conclusionTemplate),
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
    bindTemplate(conclusionArgsMapper, conclusionTemplate),
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
    bindTemplate(conclusionArgsMapper, conclusionTemplate),
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
