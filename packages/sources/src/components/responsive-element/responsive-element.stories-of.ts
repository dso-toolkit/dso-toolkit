import { createStories, StorybookParameters } from '../../storybook';

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
  parameters: StorybookParameters,
  {
    gridTemplate
  }: ResponsiveElementParameters<TemplateFnReturnType>
) {
  const stories = createStories('Responsive Element', parameters, responsiveElementArgTypes);

  stories.add(
    'Responsive Element',
    () => gridTemplate(demoGrid)
  );
}
