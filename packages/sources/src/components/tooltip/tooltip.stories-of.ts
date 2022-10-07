import { HandlerFunction } from '@storybook/addon-actions';
// import { v4 as uuidv4 } from 'uuid';

import { TooltipArgs, tooltipArgsMapper, tooltipArgTypes } from './tooltip.args';
import { Tooltip } from './tooltip.models';
import { storiesOfFactory } from '../../storybook/stories-of-factory';

export interface TooltipTemplates<TemplateFnReturnType> {
  tooltipTemplate: (tooltipProperties: Tooltip) => TemplateFnReturnType;
  asChildTemplate?: (tooltip: TemplateFnReturnType, action: HandlerFunction) => TemplateFnReturnType;
  asSiblingTemplate?: (tooltip: TemplateFnReturnType, id: string, action: HandlerFunction) => TemplateFnReturnType;
}

export const storiesOfTooltip = storiesOfFactory<TooltipTemplates<any>, TooltipArgs>('Tooltip', (stories, templateMapper) => {
  stories.addParameters({
    argTypes: tooltipArgTypes
  });

  // if (asChildTemplate) {
  //   stories.add(
  //     'as child',
  //     templateMapper((args, { tooltipTemplate, asChildTemplate }) => asChildTemplate(tooltipTemplate(tooltipArgsMapper(a as TooltipArgs)), args.action)),
  //     // (a: Args | undefined) => {
  //     //   if (!a) {
  //     //     throw new ArgsError();
  //     //   }

  //     //   const args = a as TooltipArgs;

  //     //   return asChildTemplate(tooltipTemplate(tooltipArgsMapper(a as TooltipArgs)), args.action)
  //     // },
  //     {
  //       args: {
  //         position: 'right'
  //       }
  //     }
  //   );
  // }

  // if (asSiblingTemplate) {
  //   stories.add(
  //     'as sibling',
  //     templateMapper((args, { tooltipTemplate, asSiblingTemplate }) => asSiblingTemplate(tooltipTemplate(tooltipArgsMapper(args)), args.id!, args.action)),
  //     // (a: Args | undefined) => {
  //     //   if (!a) {
  //     //     throw new ArgsError();
  //     //   }

  //     //   const args = a as TooltipArgs;

  //     //   return asSiblingTemplate(tooltipTemplate(tooltipArgsMapper(args)), args.id!, args.action)
  //     // },
  //     {
  //       args: {
  //         id: uuidv4(),
  //         position: 'bottom'
  //       }
  //     }
  //   );
  // }

  stories.add(
    'tooltip',
    templateMapper((args, { tooltipTemplate }) => tooltipTemplate(tooltipArgsMapper(args))),
    {
      args: {
        position: 'bottom'
      }
    }
  )
})

// export function storiesOfTooltip<TemplateFnReturnType>(
//   parameters: StorybookParameters,
//   {
//     tooltipTemplate,
//     asChildTemplate,
//     asSiblingTemplate
//   }: TooltipParameters<TemplateFnReturnType>
// ) {
//   const stories = createStories('Tooltip', parameters, tooltipArgTypes);


// }
