import { Args } from '@storybook/addons';

import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { FootnotesExampleArgs, footnotesListArgsMapper, footnotesReferenceArgsMapper } from './footnotes.args';
import { footnotes } from './footnotes.content';
import { Footnote } from './footnotes.models';

export interface FootnotesParameters<TemplateFnReturnType> {
  footnotesReferenceTemplate: (footnote: Footnote) => TemplateFnReturnType;
  footnotesListTemplate: (footnotes: Footnote[]) => TemplateFnReturnType;
  footnotesExampleTemplate: (footnote14: TemplateFnReturnType, footnote15: TemplateFnReturnType, list: TemplateFnReturnType) => TemplateFnReturnType;
}

export function storiesOfFootnotes<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    footnotesReferenceTemplate,
    footnotesListTemplate,
    footnotesExampleTemplate
  }: FootnotesParameters<TemplateFnReturnType>
) {
  const stories = storiesOf('Footnotes', mainModule)
    .addParameters({
      docs: {
        page: readme
      }
    });

  stories.add(
    'example',
    (a: Args | undefined) => {
      if (!a) {
        throw new Error();
      }

      const args = a as FootnotesExampleArgs;

      return footnotesExampleTemplate(
        footnotesReferenceTemplate(args.footnote14),
        footnotesReferenceTemplate(args.footnote15),
        footnotesListTemplate(footnotes)
      );
    },
    {
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
      args: {
        footnote14: footnotes[0],
        footnote15: footnotes[1]
      }
    }
  );
}
