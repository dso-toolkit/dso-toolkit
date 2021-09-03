import { v4 as uuidv4 } from 'uuid';

import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { selectableArgsMapper, selectableArgTypes } from './selectable.args';
import { Selectable } from './selectable.models';

export interface SelectableParameters<TemplateFnReturnType> {
  selectableTemplate: (selectableProperties: Selectable<TemplateFnReturnType>) => TemplateFnReturnType;
  infoRichContent: TemplateFnReturnType;
}

export function storiesOfSelectable<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters, {
    selectableTemplate,
    infoRichContent
  }: SelectableParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(selectableArgsMapper, selectableTemplate);

  const stories = storiesOf('Selectable', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: selectableArgTypes,
      args: {
        type: 'radio',
        checked: false,
        disabled: false,
        id: uuidv4(),
        indeterminate: false,
        infoActive: false,
        infoFixed: false,
        invalid: false,
        label: 'Label',
        required: false,
        value: 'the-value'
      }
    });

  stories.add(
    'radio',
    template,
    {
      args: {
        type: 'radio'
      }
    }
  );

  stories.add(
    'checkbox',
    template,
    {
      args: {
        type: 'checkbox'
      }
    }
  );

  stories.add(
    'with info',
    template,
    {
      args: {
        infoFixed: false,
        infoRichContent
      }
    }
  );
}
