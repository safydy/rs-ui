import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
    title: 'Components/Spinner',
    component: Spinner,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
            description: 'Controls the color of the spinner',
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Controls the size of the spinner',
        },
        type: {
            control: 'select',
            options: ['border', 'grow', 'dots'],
            description: 'Controls the animation style of the spinner',
        },
        label: {
            control: 'text',
            description: 'Screen reader text for accessibility',
        },
    },
} as Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
    args: {
        variant: 'primary',
        size: 'md',
        type: 'border',
        label: 'Loading...',
    },
};

export const Variants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Spinner variant="primary" />
            <Spinner variant="secondary" />
            <Spinner variant="success" />
            <Spinner variant="danger" />
            <Spinner variant="warning" />
            <Spinner variant="info" />
        </div>
    ),
} as Story;

export const Sizes: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-4">
            <Spinner size="xs" />
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" />
        </div>
    ),
} as Story;

export const Types: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
                <Spinner type="border" />
                <span className="text-sm font-medium">Border spinner (classic)</span>
            </div>
            <div className="flex items-center gap-3">
                <Spinner type="grow" />
                <span className="text-sm font-medium">Grow spinner (pulsating)</span>
            </div>
            <div className="flex items-center gap-3">
                <Spinner type="dots" />
                <span className="text-sm font-medium">Dots spinner (bouncing)</span>
            </div>
        </div>
    ),
}  as Story;

export const DotsVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Spinner type="dots" variant="primary" />
            <Spinner type="dots" variant="secondary" />
            <Spinner type="dots" variant="success" />
            <Spinner type="dots" variant="danger" />
            <Spinner type="dots" variant="warning" />
            <Spinner type="dots" variant="info" />
        </div>
    ),
}  as Story;

export const InlineWithText: Story = {
    render: () => (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Spinner size="sm" />
                <span>Loading content...</span>
            </div>

            <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 disabled:opacity-70"
                disabled
            >
                <Spinner size="xs" variant="secondary" />
                <span>Submitting</span>
            </button>

            <div className="flex items-center justify-center p-8 bg-gray-100 rounded-md">
                <div className="flex flex-col items-center gap-2">
                    <Spinner size="xl" />
                    <span className="text-sm text-gray-600">Loading dashboard data...</span>
                </div>
            </div>
        </div>
    ),
}  as Story;

export const GrowVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Spinner type="grow" variant="primary" />
            <Spinner type="grow" variant="secondary" />
            <Spinner type="grow" variant="success" />
            <Spinner type="grow" variant="danger" />
            <Spinner type="grow" variant="warning" />
            <Spinner type="grow" variant="info" />
        </div>
    ),
} as Story;