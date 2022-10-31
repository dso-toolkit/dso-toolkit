import { StoriesOfArguments, storiesOfFactory } from '../../storybook/stories-of-factory';
import { InfoArgs, infoArgsMapper, infoArgTypes } from './info.args';
import { Info } from './info.models';

export interface InfoTemplates<TemplateFnReturnType> {
  infoTemplate: (infoProperties: Info<TemplateFnReturnType>) => TemplateFnReturnType;
  richContent: TemplateFnReturnType;
}

export function storiesOfInfo<Implementation, Templates, TemplateFnReturnType>(storiesOfArguments: StoriesOfArguments<Implementation, Templates, TemplateFnReturnType, InfoTemplates<TemplateFnReturnType>>) {
  return storiesOfFactory('Info', storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: infoArgTypes
    });

    const template = templateMapper<InfoArgs>((args, { infoTemplate, richContent }) => infoTemplate(infoArgsMapper(args, richContent)));

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
  });
}
