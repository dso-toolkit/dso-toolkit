import { bindTemplate, Parameters, TemplateFn } from '@core';
import { v4 as uuidv4 } from 'uuid';

export interface DescriptionArgs {
  textBefore: string,
  textAfter: string,
  term: string,
  content: string,
  open?: boolean,
  identifier: string
}

export interface DescriptionTemplateFn<TemplateFnReturnType> extends TemplateFn<DescriptionArgs, TemplateFnReturnType> {
}

export interface DescriptionParameters<TemplateFnReturnType> extends Parameters<DescriptionArgs, TemplateFnReturnType> {
}

export function storiesOfDescription<TemplateFnReturnType>({
  module: mainModule,
  storiesOf,
  readme,
  template
}: DescriptionParameters<TemplateFnReturnType>) {
  const stories = storiesOf('Description', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      args: {
        textBefore: 'Om interpretatieproblemen te voorkomen heeft het',
        textAfter: 'aanbevelingen opgesteld over welke tags geldig zijn en hoe ze moeten worden geïnterpreteerd. De oorspronkelijke aanbeveling is een aantal malen geactualiseerd in verband met verdere ontwikkeling van HTML.',
        term: 'W3C',
        content: 'World Wide Web Consortium',
        identifier: uuidv4(),
        open: false
      },
      argTypes: {
        textBefore: {
          control: {
            type: 'text',
            required: true
          }
        },
        textAfter: {
          control: {
            type: 'text',
            required: true
          }
        },
        term: {
          control: {
            type: 'text',
            required: true
          }
        },
        content: {
          control: {
            type: 'text',
            required: true
          }
        },
        identifier: {
          control: {
            type: 'text',
            required: true
          }
        },
        open: {
          control: {
            type: 'boolean'
          }
        }
      }
    });

  stories.add(
    'description',
    bindTemplate(template)
  );
}
