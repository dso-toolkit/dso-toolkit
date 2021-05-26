import { bindTemplate, Parameters, TemplateFn } from '@core';

export interface Footnote {
  number: number;
  label: string;
}


export interface FootnotesReferenceArgs {
  footnote: Footnote;
}

export interface FootnotesReferenceTemplateFn<TemplateFnReturnType> extends TemplateFn<FootnotesReferenceArgs, TemplateFnReturnType> {
}

export interface FootnotesListArgs {
  footnotes: Footnote[];
}

export interface FootnotesListTemplateFn<TemplateFnReturnType> extends TemplateFn<FootnotesListArgs, TemplateFnReturnType> {
}

export interface FootnotesExampleArgs {
  footnote14: Footnote;
  footnote15: Footnote;
  footnotes: Footnote[];
}

export interface FootnotesExampleTemplateFn<TemplateFnReturnType> extends TemplateFn<FootnotesExampleArgs, TemplateFnReturnType> {
}

const footnotes: Footnote[] = [
  {
    number: 14,
    label: 'Foreest Groen Consult (2018) Quickscan natuuronderzoek Ontwikkeling Herveld-Noord. 26 juli 2018.'
  },
  {
    number: 15,
    label: 'Foreest Groen Consult (2019) Quickscan natuuronderzoek Ontwikkeling Herveld-Noord. Een actualisatie. 18 januari 2019.'
  }
];

export interface FootnotesParameters<TemplateFnReturnType> extends Omit<Parameters<unknown, TemplateFnReturnType>, 'template'> {
  reference: FootnotesReferenceTemplateFn<TemplateFnReturnType>;
  list: FootnotesListTemplateFn<TemplateFnReturnType>,
  example: FootnotesExampleTemplateFn<TemplateFnReturnType>;
}

export function storiesOfFootnotes<TemplateFnReturnType>({
  module: mainModule,
  storiesOf,
  readme,
  reference,
  list,
  example
}: FootnotesParameters<TemplateFnReturnType>) {
  const stories = storiesOf('Footnotes', mainModule)
    .addParameters({
      docs: {
        page: readme
      }
    });

  stories.add(
    'example',
    bindTemplate(example),
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
    bindTemplate(reference),
    {
      args: {
        footnote: footnotes[0]
      }
    }
  );

  stories.add(
    'list',
    bindTemplate(list),
    {
      args: {
        footnotes
      }
    }
  );
}
