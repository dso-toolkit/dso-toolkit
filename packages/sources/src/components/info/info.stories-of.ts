import { storiesOfFactory } from '../../storybook/stories-of-factory';
import { InfoArgs, infoArgsMapper, infoArgTypes } from './info.args';
import { Info } from './info.models';

export interface InfoTemplates<TemplateFnReturnType> {
  infoTemplate: (infoProperties: Info<TemplateFnReturnType>) => TemplateFnReturnType;
  richContent: TemplateFnReturnType;
}

export const storiesOfInfo = storiesOfFactory<InfoTemplates<any>, InfoArgs>('Info', (stories, templateMapper) => {
  stories.addParameters({
    argTypes: infoArgTypes
  });

  const template = templateMapper((args, { infoTemplate, richContent }) => infoTemplate(infoArgsMapper(args, richContent)));

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
