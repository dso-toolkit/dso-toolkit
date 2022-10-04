import { Args } from '@storybook/addons';
import { createStories, StorybookParameters } from '../../storybook';

import { ResponsiveElementArgs, responsiveElementArgTypes } from './responsive-element.args';

const demoGrid = [
  ['col-md-6', 'col-md-6'],
  ['col-lg-3 col-md-6 col-xs-12', 'col-lg-9 col-md-6 col-xs-12'],
  ['col-lg-12'],
  ['col-xs-3', 'col-xs-3', 'col-xs-3', 'col-xs-3']
];

type ResponsiveElementTemplateFnType<TemplateFnReturnType> = (
  dsoSizeChange: (event: CustomEvent<string>) => void,
  grid: string[][],
) => TemplateFnReturnType;

export interface ResponsiveElementParameters<TemplateFnReturnType> {
  gridTemplate: ResponsiveElementTemplateFnType<TemplateFnReturnType>;
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
    (a: Args) => {
      const args = a as ResponsiveElementArgs;

      return gridTemplate(args.dsoSizeChange, demoGrid);
    }
  );
}
