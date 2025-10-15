import type { Meta, StoryObj } from '@storybook/react-vite';

import Logo from './Logo';

const meta = {
  title: 'Image/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    color: "#000000",
    width: 100,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 100, height: "auto", color: "#000000" }}>
        <Story />
      </div>
    )
  ],
};
