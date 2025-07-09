import type {Meta, StoryObj} from '@storybook/react';
import {Badge} from './Badge';

const meta: Meta<typeof Badge> = {
    title: 'Components/Badge',
    component: Badge,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
            description: 'Controls the color scheme of the badge',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Controls the size of the badge',
        },
        pill: {
            control: 'boolean',
            description: 'Makes the badge fully rounded (pill shape)',
        },
        dot: {
            control: 'boolean',
            description: 'Shows a dot indicator instead of content',
        },
    },
} as Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    args: {
        children: 'Badge',
        variant: 'primary',
    },
};

export const Primary: Story = {
    args: {
        children: 'Primary',
        variant: 'primary',
    },
};

export const Secondary: Story = {
    args: {
        children: 'Secondary',
        variant: 'secondary',
    },
};

export const Success: Story = {
    args: {
        children: 'Success',
        variant: 'success',
    },
};

export const Danger: Story = {
    args: {
        children: 'Danger',
        variant: 'danger',
    },
};

export const Warning: Story = {
    args: {
        children: 'Warning',
        variant: 'warning',
    },
};

export const Info: Story = {
    args: {
        children: 'Info',
        variant: 'info',
    },
};

export const Pill: Story = {
    args: {
        children: 'Pill Badge',
        pill: true,
    },
};

export const Counter: Story = {
    args: {
        children: '42',
        variant: 'primary',
        pill: true,
    },
};

export const Dot: Story = {
    args: {
        dot: true,
        variant: 'danger',
    },
};

export const Small: Story = {
    args: {
        children: 'Small',
        size: 'sm',
    },
};

export const Large: Story = {
    args: {
        children: 'Large',
        size: 'lg',
    },
};

export const InlineText: Story = {
    render: () => (
        <p className="text-base text-gray-800">
            This paragraph contains a {' '}
            <Badge variant="primary">badge</Badge>
            {' '} within the text content.
        </p>
    ),
} as Story;

export const StatusWithDot: Story = {
    render: () => (
        <div className="flex items-center space-x-2">
            <Badge dot variant="success"/>
            <span className="text-sm">Online</span>
        </div>
    ),
} as Story;

export const BadgeGroup: Story = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
        </div>
    ),
} as Story;

export const CounterGroup: Story = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            <Badge variant="primary" pill>12</Badge>
            <Badge variant="secondary" pill>34</Badge>
            <Badge variant="success" pill>56</Badge>
            <Badge variant="danger" pill>78</Badge>
            <Badge variant="warning" pill>90</Badge>
            <Badge variant="info" pill>99+</Badge>
        </div>
    ),
} as Story;