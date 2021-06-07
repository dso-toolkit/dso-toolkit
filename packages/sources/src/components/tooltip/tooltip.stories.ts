import { Args } from '@storybook/addons';
import { v4 as uuidv4 } from 'uuid';

import { bindTemplate, ArgsError, StorybookParameters } from '../../stories-helpers';

import { TooltipArgs, tooltipArgsMapper, tooltipArgTypes } from './tooltip.args';
import { Tooltip } from './tooltip.models';

export interface TooltipParameters<TemplateFnReturnType> {
  tooltipTemplate: (tooltipProperties: Tooltip) => TemplateFnReturnType;
  asChildTemplate?: (tooltip: TemplateFnReturnType) => TemplateFnReturnType;
  asSiblingTemplate?: (tooltip: TemplateFnReturnType, id: string) => TemplateFnReturnType;
}

export function storiesOfTooltip<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme,
  }: StorybookParameters,
  {
    tooltipTemplate,
    asChildTemplate,
    asSiblingTemplate
  }: TooltipParameters<TemplateFnReturnType>
) {
  const stories = storiesOf('Tooltip', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: tooltipArgTypes
    });

  if (asChildTemplate) {
    stories.add(
      'as child',
      (a: Args | undefined) => {
        if (!a) {
          throw new ArgsError();
        }

        return asChildTemplate(tooltipTemplate(tooltipArgsMapper(a as TooltipArgs)))
      },
      {
        args: {
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

        const args = a as Required<TooltipArgs>;

        return asSiblingTemplate(tooltipTemplate(tooltipArgsMapper(args)), args.id)
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
