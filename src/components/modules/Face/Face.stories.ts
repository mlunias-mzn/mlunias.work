import type { Meta, StoryObj } from '@storybook/react-vite';

import Face from './Face';

const meta = {
  title: 'Image/Face',
  component: Face,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    expression: {
      control: 'radio',
      table: {
        defaultValue: { summary: "neutral" },
        type: { summary: '"neutral" | "smile" | "sad"' },
      },
    },
    intensity: {
      control: {
        type: "range",
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
    strokeWidth: {
      control: {
        type: "range",
        min: 0,
        max: 12,
        step: 1
      }
    },
    animate: {
      control: "boolean"
    },
    size: {
      type: "number"
    },
    className: {
      control: false
    },
    outline: {
      control: "boolean"
    }
  },
} satisfies Meta<typeof Face>;

export default meta;
type Story = StoryObj<typeof meta>;

export const General: Story = {
  args: {
    intensity: 0.95,
    expression: "neutral",
    animate: true,
    size: 220,
    outline: true
  },
};
