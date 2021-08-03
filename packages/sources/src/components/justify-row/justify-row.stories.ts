import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { justifyRowArgsMapper, justifyRowArgTypes } from './justify-row.args';
import { JustifyRow } from './justify-row.models';

export interface JustifyRowParameters<TemplateFnReturnType> {
  justifyRowTemplate: (justifyRowProperties: JustifyRow) => TemplateFnReturnType;
}

export function storiesOfJustifyRow<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    justifyRowTemplate: justifyRowTemplate
  }: JustifyRowParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(justifyRowArgsMapper, justifyRowTemplate);

  const stories = storiesOf('Justify Row', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: justifyRowArgTypes
    });

  stories.add(
    'Justify Row',
    template,
    {
      args: {
        label: 'Resultaten'
      }
    }
  );
}
