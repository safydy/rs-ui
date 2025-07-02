import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { FiArrowRight, FiSend } from 'react-icons/fi';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        isLoading: { control: 'boolean' },
        disabled: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: 'Primary Button',
        variant: 'primary',
    },
};

export const Secondary: Story = {
    args: {
        children: 'Secondary Button',
        variant: 'secondary',
    },
};

export const Success: Story = {
    args: {
        children: 'Success Button',
        variant: 'success',
    },
};

export const Danger: Story = {
    args: {
        children: 'Danger Button',
        variant: 'danger',
    },
};

export const WithLeftIcon: Story = {
    args: {
        children: 'Send Message',
        leftIcon: <FiSend />,
    },
};

export const WithRightIcon: Story = {
    args: {
        children: 'Next Step',
        rightIcon: <FiArrowRight />,
    },
};

export const Loading: Story = {
    args: {
        children: 'Loading State',
        isLoading: true,
    },
};

export const Disabled: Story = {
    args: {
        children: 'Disabled Button',
        disabled: true,
    },
};

export const FullWidth: Story = {
    args: {
        children: 'Full Width Button',
        fullWidth: true,
    },
};

export const AllSizes: Story = {
    render: () => (
        <div className="flex flex-col space-y-2">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
        </div>
    ),
};