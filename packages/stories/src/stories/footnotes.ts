import { bindTemplate, Parameters, TemplateFn } from '@core';

export interface FootnotesArgs {
}

export interface FootnotesTemplateFn<TemplateFnReturnType> extends TemplateFn<FootnotesArgs, TemplateFnReturnType> {
}

export interface FootnotesParameters<TemplateFnReturnType> extends Parameters<FootnotesArgs, TemplateFnReturnType> {
}

export function storiesOfFootnotes<TemplateFnReturnType>({
  module: mainModule,
  storiesOf,
  readme,
  template
}: FootnotesParameters<TemplateFnReturnType>) {
  const stories = storiesOf('Footnotes', mainModule)
    .addParameters({
      docs: {
        page: readme
      }
    });

  stories.add(
    'footnotes',
    bindTemplate(template)
  );
}
