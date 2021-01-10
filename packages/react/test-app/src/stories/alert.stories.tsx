import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { DsoAlert } from '@dso-toolkit/react';

export default {
  title: 'Alert',
  component: DsoAlert,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story = (args) => (
  <DsoAlert status={args.status}>
    Test
  </DsoAlert>
);

export const Primary = Template.bind({});
Primary.args = {
  status: 'success'
};
