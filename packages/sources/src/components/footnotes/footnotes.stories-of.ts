import { storiesOfFactory } from '../../storybook/stories-of-factory';

import {
  FootnotesExampleArgs,
  FootnotesReferenceArgs,
  FootnotesListArgs,
  footnotesExampleArgTypes,
  footnotesListArgsMapper,
  footnotesReferenceArgsMapper,
  footnotesListArgTypes,
  footnotesReferenceArgTypes
} from './footnotes.args';
import { footnotes } from './footnotes.content';
import { Footnote } from './footnotes.models';

export interface FootnotesTemplates<TemplateFnReturnType> {
  footnoteTemplate: (footnote: Footnote) => TemplateFnReturnType;
  footnotesTemplate: (footnotes: Footnote[]) => TemplateFnReturnType;
  footnotesExampleTemplate: (footnote14: TemplateFnReturnType, footnote15: TemplateFnReturnType, list: TemplateFnReturnType) => TemplateFnReturnType;
}

export const storiesOfFootnotes = storiesOfFactory<FootnotesTemplates<any>, unknown>('Footnotes', (stories, templateMapper) => {
  stories.add(
    'example',
    templateMapper<FootnotesExampleArgs>((args, { footnotesExampleTemplate, footnotesTemplate: footnotesListTemplate, footnoteTemplate: footnotesReferenceTemplate }) => footnotesExampleTemplate(
      footnotesReferenceTemplate(args.footnote14),
      footnotesReferenceTemplate(args.footnote15),
      footnotesListTemplate(footnotes)
    )),
    {
      argTypes: footnotesExampleArgTypes,
      args: {
        footnote14: footnotes[0],
        footnote15: footnotes[1],
        footnotes
      }
    }
  );

  stories.add(
    'reference',
    templateMapper<FootnotesReferenceArgs>((args, { footnoteTemplate: footnotesReferenceTemplate }) => footnotesReferenceTemplate(footnotesReferenceArgsMapper(args))),
    {
      argTypes: footnotesReferenceArgTypes,
      args: {
        label: footnotes[0].label,
        number: footnotes[0].number
      }
    }
  );

  stories.add(
    'list',
    templateMapper<FootnotesListArgs>((args, { footnotesTemplate: footnotesListTemplate }) => footnotesListTemplate(footnotesListArgsMapper(args))),
    {
      argTypes: footnotesListArgTypes,
      args: {
        footnote14: footnotes[0],
        footnote15: footnotes[1]
      }
    }
  );
});
