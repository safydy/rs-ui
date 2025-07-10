import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
    title: 'Components/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Controls the size of the avatar',
        },
        shape: {
            control: 'radio',
            options: ['circle', 'square'],
            description: 'Controls the shape of the avatar',
        },
        borderVariant: {
            control: 'select',
            options: [undefined, 'primary', 'secondary', 'success', 'danger', 'warning', 'info'],
            description: 'Border color variant',
        },
        status: {
            control: 'select',
            options: [null, 'primary', 'secondary', 'success', 'danger', 'warning', 'info'],
            description: 'Status indicator variant',
        },
    },
} as Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
    args: {
        src: 'https://randomuser.me/api/portraits/women/79.jpg',
        alt: 'Jane Doe',
        name: 'Jane Doe',
        size: 'md',
    },
};

export const WithInitials: Story = {
    args: {
        name: 'John Smith',
        size: 'md',
    },
};

export const WithStatus: Story = {
    args: {
        src: 'https://randomuser.me/api/portraits/men/32.jpg',
        alt: 'David Miller',
        name: 'David Miller',
        size: 'md',
        status: 'success',
    },
};

export const WithBorder: Story = {
    args: {
        src: 'https://randomuser.me/api/portraits/women/44.jpg',
        alt: 'Sarah Johnson',
        name: 'Sarah Johnson',
        borderVariant: 'primary',
    },
};

export const Square: Story = {
    args: {
        src: 'https://randomuser.me/api/portraits/men/85.jpg',
        alt: 'Robert Brown',
        shape: 'square',
        name: 'Robert Brown',
    },
};

export const SizeVariants: Story = {
    render: () => (
        <div className="flex flex-wrap items-end gap-4">
            <Avatar size="xs" name="XS User" />
            <Avatar size="sm" name="SM User" />
            <Avatar size="md" name="MD User" />
            <Avatar size="lg" name="LG User" />
            <Avatar size="xl" name="XL User" />
        </div>
    ),
};

export const Shapes: Story = {
    render: () => (
        <div className="flex gap-4">
            <Avatar shape="circle" name="Jane Doe" />
            <Avatar shape="square" name="Jane Doe" />
        </div>
    ),
} as Story;

export const StatusIndicators: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Avatar status="primary" name="PM" />
            <Avatar status="secondary" name="SE" />
            <Avatar status="success" name="SU" />
            <Avatar status="danger" name="DA" />
            <Avatar status="warning" name="WA" />
            <Avatar status="info" name="IN" />
        </div>
    ),
} as Story;

export const BorderVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Avatar borderVariant="primary" src="https://randomuser.me/api/portraits/women/44.jpg" />
            <Avatar borderVariant="secondary" src="https://randomuser.me/api/portraits/men/43.jpg" />
            <Avatar borderVariant="success" src="https://randomuser.me/api/portraits/women/17.jpg" />
            <Avatar borderVariant="danger" src="https://randomuser.me/api/portraits/men/67.jpg" />
            <Avatar borderVariant="warning" src="https://randomuser.me/api/portraits/women/63.jpg" />
            <Avatar borderVariant="info" src="https://randomuser.me/api/portraits/men/97.jpg" />
        </div>
    ),
} as Story;

export const InitialsWithDifferentNames: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Avatar name="John Doe" />
            <Avatar name="Jane Smith" />
            <Avatar name="Robert Johnson" />
            <Avatar name="Emily Wilson" />
            <Avatar name="Michael Brown" />
            <Avatar name="Lisa Anderson" />
        </div>
    ),
} as Story;

export const GroupExample: Story = {
    render: () => (
        <div className="flex -space-x-4">
            <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" borderVariant="secondary" />
            <Avatar src="https://randomuser.me/api/portraits/women/31.jpg" borderVariant="secondary" />
            <Avatar src="https://randomuser.me/api/portraits/men/33.jpg" borderVariant="secondary" />
            <Avatar name="John Doe" borderVariant="secondary" />
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 border-2 border-white dark:border-gray-800 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium">
                +3
            </div>
        </div>
    ),
} as Story;

export const CombinationExample: Story = {
    render: () => (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-2">
                <Avatar
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    size="lg"
                    borderVariant="success"
                    status="success"
                />
                <span className="text-sm font-medium">Sarah Johnson</span>
                <span className="text-xs text-green-600">Online</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Avatar
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    size="lg"
                    borderVariant="secondary"
                    status="secondary"
                />
                <span className="text-sm font-medium">David Miller</span>
                <span className="text-xs text-gray-500">Away</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Avatar
                    name="Robert Brown"
                    size="lg"
                    borderVariant="danger"
                    status="danger"
                />
                <span className="text-sm font-medium">Robert Brown</span>
                <span className="text-xs text-red-600">Busy</span>
            </div>
        </div>
    ),
} as Story;