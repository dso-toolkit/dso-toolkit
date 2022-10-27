import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { DescriptionArgs, descriptionArgsMapper, descriptionArgTypes, DescriptionExampleArgs, descriptionExampleArgTypes } from './description.args';
import { termContent, descriptionExample } from './description.content';
import { Description } from './description.models';

export interface DescriptionTemplates<TemplateFnReturnType> {
  descriptionTemplate: (descriptionProperties: Description) => TemplateFnReturnType;
  exampleTemplate: (exampleData: ReturnType<typeof descriptionExample>) => TemplateFnReturnType;
}

export const storiesOfDescription = storiesOfFactory<DescriptionTemplates<any>, DescriptionArgs>('description', (stories, templateMapper) => {
  stories
    .addParameters({
      argTypes: descriptionArgTypes
    });

  stories.add(
    'term',
    templateMapper((args, { descriptionTemplate }) => descriptionTemplate(descriptionArgsMapper(args))),
    {
      argTypes: descriptionArgTypes,
      args: termContent
    }
  );

  stories.add(
    'example',
    templateMapper<DescriptionExampleArgs>((args, { exampleTemplate }) => exampleTemplate(descriptionExample(args.openTerm))),
    {
      argTypes: descriptionExampleArgTypes,
      args: {
        openTerm: false
      }
    }
  );
});
