import { Args } from '@storybook/addons';

import { bindTemplate, ArgsError, StorybookParameters, createStories } from '../../storybook';

import {
  FootnotesExampleArgs,
  footnotesExampleArgTypes,
  footnotesListArgsMapper,
  footnotesReferenceArgsMapper,
  footnotesListArgTypes,
  footnotesReferenceArgTypes
} from './footnotes.args';
import { footnotes } from './footnotes.content';
import { Footnote } from './footnotes.models';

export interface FootnotesParameters<TemplateFnReturnType> {
  footnotesReferenceTemplate: (footnote: Footnote) => TemplateFnReturnType;
  footnotesListTemplate: (footnotes: Footnote[]) => TemplateFnReturnType;
  footnotesExampleTemplate: (footnote14: TemplateFnReturnType, footnote15: TemplateFnReturnType, list: TemplateFnReturnType) => TemplateFnReturnType;
}

export function storiesOfFootnotes<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    footnotesReferenceTemplate,
    footnotesListTemplate,
    footnotesExampleTemplate
  }: FootnotesParameters<TemplateFnReturnType>
) {
  const stories = createStories('Footnotes', parameters, {});

  stories.add(
    'example',
    (a: Args | undefined) => {
      if (!a) {
        throw new ArgsError();
      }

      const args = a as FootnotesExampleArgs;

      return footnotesExampleTemplate(
        footnotesReferenceTemplate(args.footnote14),
        footnotesReferenceTemplate(args.footnote15),
        footnotesListTemplate(footnotes)
      );
    },
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
    bindTemplate(footnotesReferenceArgsMapper, footnotesReferenceTemplate),
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
    bindTemplate(footnotesListArgsMapper, footnotesListTemplate),
    {
      argTypes: footnotesListArgTypes,
      args: {
        footnote14: footnotes[0],
        footnote15: footnotes[1]
      }
    }
  );
}
