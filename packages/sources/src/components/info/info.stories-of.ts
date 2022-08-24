import { bindTemplate, createStories, StorybookParameters } from '../../storybook';
import { infoArgsMapper, infoArgTypes } from './info.args';
import { Info } from './info.models';

export interface InfoParameters<TemplateFnReturnType> {
  infoTemplate: (infoProperties: Info<TemplateFnReturnType>) => TemplateFnReturnType;
  richContent: TemplateFnReturnType;
}

export function storiesOfInfo<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    infoTemplate,
    richContent
  }: InfoParameters<TemplateFnReturnType>
) {
  const stories = createStories('Info', parameters, infoArgTypes)
    .addParameters({
      args: {
        richContent
      }
    });

  const template = bindTemplate(infoArgsMapper, infoTemplate);

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
