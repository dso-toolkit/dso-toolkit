import { bindTemplate, StorybookParameters } from '../../stories-helpers';
import { infoArgsMapper, infoArgTypes } from './info.args';
import { Info } from './info.models';

export interface InfoParameters<TemplateFnReturnType> {
  infoTemplate: (infoProperties: Info<TemplateFnReturnType>) => TemplateFnReturnType;
  richContent: TemplateFnReturnType;
}

export function storiesOfInfo<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    infoTemplate,
    richContent
  }: InfoParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(infoArgsMapper, infoTemplate);

  const stories = storiesOf('Info', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: infoArgTypes,
      args: {
        richContent
      }
    });

  stories.add(
    'default',
    template
  );

  stories.add(
    'fixed',
    template,
    {
      args: {
        fixed: true
      }
    }
  );
}
