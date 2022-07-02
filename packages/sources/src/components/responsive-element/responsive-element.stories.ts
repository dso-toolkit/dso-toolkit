import { StorybookParameters } from '../../stories-helpers';

import { responsiveElementArgTypes } from './responsive-element.args';

const demoGrid = [
  ['col-md-6', 'col-md-6'],
  ['col-lg-3 col-md-6 col-xs-12', 'col-lg-9 col-md-6 col-xs-12'],
  ['col-lg-12'],
  ['col-xs-3', 'col-xs-3', 'col-xs-3', 'col-xs-3']
];

export interface ResponsiveElementParameters<TemplateFnReturnType> {
  gridTemplate: (grid: string[][]) => TemplateFnReturnType;
}

export function storiesOfResponsiveElement<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    gridTemplate
  }: ResponsiveElementParameters<TemplateFnReturnType>
) {
  const stories = storiesOf('Responsive Element', mainModule)
    .addParameters({
      docs: {
        page: readme
      }
    });

  stories.add(
    'Responsive Element',
    () => gridTemplate(demoGrid)
  );
}
