import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
    title: 'Components/ProgressBar',
    component: ProgressBar,
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: { type: 'range', min: 0, max: 100 },
            description: 'Current progress value (0-100)',
        },
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
            description: 'Controls the color scheme of the progress bar',
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg'],
            description: 'Controls the height of the progress bar',
        },
        showPercentage: {
            control: 'boolean',
            description: 'Whether to display the percentage text',
        },
        striped: {
            control: 'boolean',
            description: 'Whether to display a striped pattern',
        },
        animated: {
            control: 'boolean',
            description: 'Whether to animate the striped pattern',
        },
    },
} as Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
    args: {
        value: 45,
        variant: 'primary',
        size: 'md',
    },
};

export const WithLabel: Story = {
    args: {
        value: 70,
        variant: 'primary',
        label: 'Upload progress',
        showPercentage: true,
    },
};

export const Striped: Story = {
    args: {
        value: 65,
        variant: 'primary',
        striped: true,
        label: 'Striped progress',
    },
};

export const Animated: Story = {
    args: {
        value: 75,
        variant: 'success',
        striped: true,
        animated: true,
        label: 'Animated striped progress',
    },
};

export const SizeVariants: Story = {
    render: () => (
        <div className="space-y-4">
            <ProgressBar value={55} size="xs" label="Extra Small" />
            <ProgressBar value={65} size="sm" label="Small" />
            <ProgressBar value={75} size="md" label="Medium" />
            <ProgressBar value={85} size="lg" label="Large" showPercentage={true} />
        </div>
    ),
} as Story;

export const WithInnerLabel: Story = {
    args: {
        value: 75,
        size: 'lg',
        showPercentage: true,
        label: 'Download progress',
    },
};

export const VariantsShowcase: Story = {
    render: () => (
        <div className="space-y-4">
            <ProgressBar value={70} variant="primary" label="Primary" />
            <ProgressBar value={70} variant="secondary" label="Secondary" />
            <ProgressBar value={70} variant="success" label="Success" />
            <ProgressBar value={70} variant="danger" label="Danger" />
            <ProgressBar value={70} variant="warning" label="Warning" />
            <ProgressBar value={70} variant="info" label="Info" />
        </div>
    ),
} as Story;

export const CustomMinMax: Story = {
    args: {
        value: 60,
        min: 20,
        max: 120,
        label: 'Custom range (20-120)',
        showPercentage: true,
    },
};

export const StagesExample: Story = {
    render: () => (
        <div className="space-y-5">
            <div className="space-y-1">
                <div className="flex justify-between">
                    <span className="text-sm font-medium">Step 1: Complete profile</span>
                    <span className="text-sm font-medium">Completed</span>
                </div>
                <ProgressBar value={100} variant="success" size="sm" />
            </div>

            <div className="space-y-1">
                <div className="flex justify-between">
                    <span className="text-sm font-medium">Step 2: Verify identity</span>
                    <span className="text-sm font-medium">In progress</span>
                </div>
                <ProgressBar value={65} variant="warning" size="sm" striped animated />
            </div>

            <div className="space-y-1">
                <div className="flex justify-between">
                    <span className="text-sm font-medium">Step 3: Set preferences</span>
                    <span className="text-sm font-medium">Not started</span>
                </div>
                <ProgressBar value={0} variant="secondary" size="sm" />
            </div>

            <div className="mt-4">
                <ProgressBar
                    value={55}
                    variant="primary"
                    label="Overall progress"
                    showPercentage
                    size="md"
                />
            </div>
        </div>
    ),
} as Story;