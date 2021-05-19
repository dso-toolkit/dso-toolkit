import { v4 as uuidv4 } from 'uuid';

import { Parameters, TemplateFn } from '@core';

export const tooltipPositions = ['top', 'right', 'bottom', 'left'] as const;

export interface TooltipArgs {
  position: typeof tooltipPositions;
  label: string;
  id?: string;
}

export interface AsChildTooltipTemplateFn<TemplateFnReturnType> extends TemplateFn<TooltipArgs, TemplateFnReturnType> {
}

export interface AsSiblingTooltipTemplateFn<TemplateFnReturnType> extends TemplateFn<TooltipArgs, TemplateFnReturnType> {
}

export interface TooltipParameters<TemplateFnReturnType> extends Omit<Parameters<TooltipArgs, TemplateFnReturnType>, 'template'> {
  asChildTemplate: AsSiblingTooltipTemplateFn<TemplateFnReturnType>;
  asSiblingTemplate: AsSiblingTooltipTemplateFn<TemplateFnReturnType>;
}

export function storiesOfTooltip<TemplateFnReturnType>({
  module: mainModule,
  storiesOf,
  readme,
  asChildTemplate,
  asSiblingTemplate
}: TooltipParameters<TemplateFnReturnType>) {
  const stories = storiesOf('Tooltip', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: {
        position: {
          options: tooltipPositions,
          control: {
            type: 'select'
          }
        }
      }
    });

  stories.add(
    'as child',
    asChildTemplate as any,
    {
      args: {
        position: 'right'
      }
    }
  );

  stories.add(
    'as sibling',
    asSiblingTemplate as any,
    {
      args: {
        id: uuidv4(),
        position: 'bottom'
      }
    }
  );
}
