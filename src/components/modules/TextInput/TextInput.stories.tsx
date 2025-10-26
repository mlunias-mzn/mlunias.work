import type { Meta, StoryObj } from '@storybook/react-vite';

import TextInput from './TextInput';

const meta = {
    title: 'Input/TextInput',
    component: TextInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: "text",
        },
        help: {
            control: "text",
        },
        ghost: {
            control: "boolean"
        },
        inputSize: {
            control: "select",
            table: {
                defaultValue: { summary: "md" },
                type: { summary: '"xs" | "sm" | "md" | "lg" | "xl"' },
            },
        },
        color: {
            control: "select",
            table: {
                type: { summary: '"neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"' },
            },
        },
        startAdornment: {
            contorl: false,
        },
        endAdornment: {
            contorl: false,
        }
    },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const General: Story = {
    args: {

    },
};

export const Labeled: Story = {
    args: {
        label: "Title",
        help: "Information"
    },
};