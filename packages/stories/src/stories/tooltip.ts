import { v4 as uuidv4 } from 'uuid';

import { StoryParameters } from '../story-parameters';

export const tooltipPositions = ['top', 'right', 'bottom', 'left'] as const;

export interface TooltipStoryParameters extends Omit<StoryParameters, 'template'> {
  asChildTemplate: any;
  asSiblingTemplate: any;
}

export interface TooltipArgs {
  position: typeof tooltipPositions;
  label: string;
  id?: string;
}

export function tooltipStories({
  module: mainModule,
  storiesOf,
  readme,
  asChildTemplate,
  asSiblingTemplate
}: TooltipStoryParameters) {
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
    asChildTemplate,
    {
      args: {
        position: 'right'
      }
    }
  );

  stories.add(
    'as sibling',
    asSiblingTemplate,
    {
      args: {
        id: uuidv4(),
        position: 'bottom'
      }
    }
  );
}
