import { Args } from '@storybook/addons';
import { HandlerFunction } from '@storybook/addon-actions';
import { v4 as uuidv4 } from 'uuid';

import { bindTemplate, ArgsError, StorybookParameters, createStories } from '../../storybook';

import { TooltipArgs, tooltipArgsMapper, tooltipArgTypes } from './tooltip.args';
import { Tooltip } from './tooltip.models';

export interface TooltipParameters<TemplateFnReturnType> {
  tooltipTemplate: (tooltipProperties: Tooltip) => TemplateFnReturnType;
  asChildTemplate?: (tooltip: TemplateFnReturnType, id: string, action: HandlerFunction) => TemplateFnReturnType;
  asSiblingTemplate?: (tooltip: TemplateFnReturnType, id: string, action: HandlerFunction) => TemplateFnReturnType;
}

export function storiesOfTooltip<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    tooltipTemplate,
    asChildTemplate,
    asSiblingTemplate
  }: TooltipParameters<TemplateFnReturnType>
) {
  const stories = createStories('Tooltip', parameters, tooltipArgTypes);

  if (asChildTemplate) {
    stories.add(
      'as child',
      (a: Args | undefined) => {
        if (!a) {
          throw new ArgsError();
        }

        const args = a as TooltipArgs;

        return asChildTemplate(tooltipTemplate(tooltipArgsMapper(a as TooltipArgs)), args.id!, args.action);
      },
      {
        args: {
          id: uuidv4(),
          position: 'right'
        }
      }
    );
  }

  if (asSiblingTemplate) {
    stories.add(
      'as sibling',
      (a: Args | undefined) => {
        if (!a) {
          throw new ArgsError();
        }

        const args = a as TooltipArgs;

        return asSiblingTemplate(tooltipTemplate(tooltipArgsMapper(args)), args.id!, args.action)
      },
      {
        args: {
          id: uuidv4(),
          position: 'bottom'
        }
      }
    );
  }

  stories.add(
    'tooltip',
    bindTemplate(tooltipArgsMapper, tooltipTemplate),
    {
      args: {
        position: 'bottom'
      }
    }
  )
}
