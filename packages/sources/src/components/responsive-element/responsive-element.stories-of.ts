import { storiesOfFactory } from '../../storybook/stories-of-factory';

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

export interface ResponsiveElementTemplates<TemplateFnReturnType> {
  gridTemplate: ResponsiveElementTemplateFnType<TemplateFnReturnType>;
}

export const storiesOfResponsiveElement = storiesOfFactory<ResponsiveElementTemplates<any>, ResponsiveElementArgs>('Responsive Element', (stories, templateMapper) => {
  stories.addParameters({
    argTypes: responsiveElementArgTypes
  });

  stories.add(
    'Responsive Element',
    templateMapper((args, { gridTemplate }) => gridTemplate(args.dsoSizeChange, demoGrid))
  );
});
