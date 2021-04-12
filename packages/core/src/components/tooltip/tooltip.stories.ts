import { storiesOf } from '@storybook/web-components';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { v4 as uuidv4 } from 'uuid';

// @ts-ignore
import readme from './readme.md';

const positions = ['top', 'right', 'bottom', 'left'] as const;

interface TooltipArgs {
  position: typeof positions;
  label: string;
  id?: string;
}

const Tooltip = ({ position, label, id }: TooltipArgs) => html`
  <dso-tooltip position=${position} for=${ifDefined(id || undefined)}>
    ${label}
  </dso-tooltip>
`;

const stories = storiesOf('Tooltip', module)
  .addParameters({
    docs: {
      page: readme
    },
    argTypes: {
      position: {
        options: positions,
        control: {
          type: 'select'
        }
      }
    }
  });

stories.add(
  'as child',
  ({ position }: any) => html`
    <button type="button">
      <span>Hover or focus me</span>
      ${Tooltip({ position, label: position })}
    </button>
  `,
  {
    args: {
      position: 'right'
    }
  }
);

stories.add(
  'as sibling',
  ({ position, id }: any) => html`
    <button type="button" id=${ifDefined(id || undefined)}>
      <span>Hover or focus me</span>
    </button>
    ${Tooltip({ position, label: position, id })}
  `,
  {
    args: {
      id: uuidv4(),
      position: 'bottom'
    }
  }
);
