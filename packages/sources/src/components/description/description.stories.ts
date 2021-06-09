import { Args } from '@storybook/addons';
import { v4 as uuidv4 } from 'uuid';

import { bindTemplate, ArgsError, StorybookParameters } from '../../stories-helpers';

import { DescriptionArgs, descriptionArgsMapper, descriptionArgTypes } from './description.args';
import { Description } from './description.models';

export interface DescriptionParameters<TemplateFnReturnType> {
  descriptionTemplate: (descriptionProperties: Description) => TemplateFnReturnType;
  exampleTemplate: (exampleProperties: { textBefore: string, description: TemplateFnReturnType, textAfter: string }) => TemplateFnReturnType;
}

export function storiesOfDescription<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    descriptionTemplate,
    exampleTemplate
  }: DescriptionParameters<TemplateFnReturnType>
) {
  const template = (a: Args | undefined): TemplateFnReturnType => {
    if (!a) {
      throw new ArgsError();
    }

    const args = a as DescriptionArgs;

    return exampleTemplate({
      textAfter: args.textAfter,
      description: descriptionTemplate(descriptionArgsMapper(args)),
      textBefore: args.textBefore
    });
  };

  const stories = storiesOf('Description', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: descriptionArgTypes,
      args: {
        textBefore: 'Om interpretatieproblemen te voorkomen heeft het',
        textAfter: 'aanbevelingen opgesteld over welke tags geldig zijn en hoe ze moeten worden geïnterpreteerd. De oorspronkelijke aanbeveling is een aantal malen geactualiseerd in verband met verdere ontwikkeling van HTML.',
        id: uuidv4(),
        term: 'W3C',
        content: 'World Wide Web Consortium',
        open: false
      }
    });

  stories.add(
    'example',
    template
  );

  stories.add(
    'description',
    bindTemplate(descriptionArgsMapper, descriptionTemplate)
  );
}
