import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { HighlightBoxArgs, highlightBoxArgsMapper, highlightBoxArgTypes } from './highlight-box.args';
import { HighlightBox } from './highlight-box.models';

export interface HighlightBoxTemplates<TemplateFnReturnType> {
  highlightBoxTemplate: (highlightBoxProperties: HighlightBox<TemplateFnReturnType>) => TemplateFnReturnType;
  content: TemplateFnReturnType;
}

export const storiesOfHighlightBox = storiesOfFactory<HighlightBoxTemplates<any>, HighlightBoxArgs>('Highlight Box', (stories, templateMapper) => {
  stories.addParameters({
    argTypes: highlightBoxArgTypes,
    args: {
      yellow: false,
      white: false,
      border: false,
      dropShadow: false,
      step: null,
      icon: null
    }
  });

  const template = templateMapper((args, { highlightBoxTemplate }) => highlightBoxTemplate(highlightBoxArgsMapper(args)));

  stories.add(
    'default',
    template
  );

  stories.add(
    'yellow',
    template,
    {
      args: {
        yellow: true
      }
    }
  );

  stories.add(
    'white with dropshadow',
    template,
    {
      args: {
        white: true,
        dropShadow: true
      }
    }
  );

  stories.add(
    'with border',
    template,
    {
      args: {
        border: true
      }
    }
  );

  stories.add(
    'with step',
    template,
    {
      args: {
        yellow: true,
        step: 2
      }
    }
  );

  stories.add(
    'with icon',
    template,
    {
      args: {
        yellow: true,
        icon: 'plus'
      }
    }
  );
})

// export function storiesOfHighlightBox<TemplateFnReturnType>(
//   parameters: StorybookParameters,
//   {
//     highlightBoxTemplate,
//     richContent
//   }: HighlightBoxParameters<TemplateFnReturnType>
// ) {
//   const stories = createStories('Highlight Box', parameters, highlightBoxArgTypes)
//     .addParameters({
//       args: {
//         yellow: false,
//         white: false,
//         border: false,
//         dropShadow: false,
//         step: null,
//         icon: null,
//         richContent
//       }
//     });

//   const template = bindTemplate(highlightBoxArgsMapper, highlightBoxTemplate);


// }
