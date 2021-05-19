import { v4 as uuidv4 } from 'uuid';

import { bindTemplate, Parameters, TemplateFn } from '@core';

export const tooltipPositions = ['top', 'right', 'bottom', 'left'] as const;

export interface TooltipArgs {
  position: typeof tooltipPositions;
  label: string;
  id?: string;
}

export interface TooltipTemplateFn<TemplateFnReturnType> extends TemplateFn<TooltipArgs, TemplateFnReturnType> {
}

export interface TooltipParameters<TemplateFnReturnType> extends Omit<Parameters<TooltipArgs, TemplateFnReturnType>, 'template'> {
  asChildTemplate: TooltipTemplateFn<TemplateFnReturnType>;
  asSiblingTemplate: TooltipTemplateFn<TemplateFnReturnType>;
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
    bindTemplate(asChildTemplate),
    {
      args: {
        position: 'right'
      }
    }
  );

  stories.add(
    'as sibling',
    bindTemplate(asSiblingTemplate),
    {
      args: {
        id: uuidv4(),
        position: 'bottom'
      }
    }
  );
}
