import { bindTemplate, Parameters, TemplateFn } from '@core';
import { v4 as uuidv4 } from 'uuid';

export interface Description {
  id: string;
  term: string;
  content: string;
  open: boolean;
}

export interface DescriptionArgs {
  id: string;
  term: string;
  content: string;
  open: boolean;
}

export interface DescriptionTemplateFn<TemplateFnReturnType> extends TemplateFn<DescriptionArgs, TemplateFnReturnType> {
}

export interface DescriptionExampleArgs {
  textBefore: string,
  textAfter: string,
  id: string;
  term: string;
  content: string;
  open: boolean;
}

export interface DescriptionExampleTemplateFn<TemplateFnReturnType> extends TemplateFn<DescriptionExampleArgs, TemplateFnReturnType> {
}

export interface DescriptionParameters<TemplateFnReturnType> extends Omit<Parameters<DescriptionExampleArgs, TemplateFnReturnType>, 'template'> {
  exampleTemplate: DescriptionExampleTemplateFn<TemplateFnReturnType>;
  descriptionTemplate: DescriptionTemplateFn<TemplateFnReturnType>;
}

export function storiesOfDescription<TemplateFnReturnType>({
  module: mainModule,
  storiesOf,
  readme,
  exampleTemplate,
  descriptionTemplate
}: DescriptionParameters<TemplateFnReturnType>) {
  const stories = storiesOf('Description', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: {
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
        id: {
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
    'example',
    bindTemplate(exampleTemplate),
    {
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
        }
      },
      args: {
        textBefore: 'Om interpretatieproblemen te voorkomen heeft het',
        textAfter: 'aanbevelingen opgesteld over welke tags geldig zijn en hoe ze moeten worden geïnterpreteerd. De oorspronkelijke aanbeveling is een aantal malen geactualiseerd in verband met verdere ontwikkeling van HTML.',
        id: uuidv4(),
        term: 'W3C',
        content: 'World Wide Web Consortium',
        open: false
      }
    }
  );

  stories.add(
    'description',
    bindTemplate(descriptionTemplate),
    {
      args: {
        id: uuidv4(),
        term: 'WWW',
        content: 'World Wide Web',
        open: false
      }
    }
  );
}
