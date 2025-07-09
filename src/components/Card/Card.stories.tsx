import type { Meta, StoryObj } from '@storybook/react';
import {Card} from './Card';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof Card> = {
    title: 'Components/Card',
    component: Card,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
            description: 'Controls the color scheme of the card'
        },
        shadow: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg'],
            description: 'Controls the shadow depth'
        },
        imgPosition: {
            control: 'radio',
            options: ['top', 'bottom'],
            description: 'Image position (top or bottom)'
        },
        bordered: {
            control: 'boolean',
            description: 'Whether to show a border'
        },
        horizontal: {
            control: 'boolean',
            description: 'Display in horizontal layout'
        },
        interactive: {
            control: 'boolean',
            description: 'Add hover effects'
        },
    },
} as Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
    args: {
        children: 'This is a simple card with some content inside.',
    },
};

export const WithHeaderAndFooter: Story = {
    args: {
        header: <h3 className="text-lg font-medium">Card Header</h3>,
        children: <p>This card has a header and footer section.</p>,
        footer: <div className="text-sm text-gray-500">Last updated: July 9, 2025</div>,
    },
};

export const WithTitleAndSubtitle: Story = {
    args: {
        title: 'Card Title',
        subtitle: 'Card Subtitle',
        children: <p>This card uses the title and subtitle props for a simplified header.</p>,
    },
};

export const WithImage: Story = {
    args: {
        imgSrc: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        imgAlt: 'People collaborating',
        title: 'Team Collaboration',
        children: <p>Enhance your team's productivity with our solutions.</p>,
        footer: <Button size="sm" variant="primary">Learn more</Button>,
    },
};

export const Horizontal: Story = {
    args: {
        horizontal: true,
        imgSrc: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        imgAlt: 'Business meeting',
        title: 'Business Solutions',
        children: <p>Discover how our services can help your business grow.</p>,
        footer: <div className="flex justify-end"><Button size="sm" variant="primary">Read more</Button></div>,
    },
};

export const Interactive: Story = {
    args: {
        interactive: true,
        title: 'Interactive Card',
        children: <p>This card has hover effects. Try hovering over it!</p>,
        imgSrc: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        imgAlt: 'Interactive design',
        bordered: true,
        shadow: 'sm',
    },
};

export const ProductCard: Story = {
    render: () => (
        <Card
            imgSrc="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80"
            imgAlt="Smart watch"
            interactive
            bordered
            shadow="md"
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium">Smart Watch</h3>
                <Badge variant="primary" pill>New</Badge>
            </div>
            <p className="text-gray-500 mb-4">Advanced health monitoring and notifications</p>
            <div className="flex justify-between items-center">
                <span className="text-lg font-bold">$199.99</span>
                <Button size="sm" variant="primary">Add to cart</Button>
            </div>
        </Card>
    ),
} as Story;

export const ProfileCard: Story = {
    render: () => (
        <Card variant="secondary" bordered shadow="md" className="max-w-xs mx-auto">
            <div className="flex flex-col items-center text-center">
                <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Profile"
                    className="w-24 h-24 rounded-full mb-4"
                />
                <h3 className="text-xl font-bold">Sarah Johnson</h3>
                <p className="text-gray-500 mb-2">UI/UX Designer</p>
                <p className="text-sm mb-4">Creating beautiful, user-friendly interfaces for web and mobile applications.</p>
                <div className="flex space-x-2">
                    <Button size="sm" variant="primary">Connect</Button>
                    <Button size="sm" variant="secondary">Message</Button>
                </div>
            </div>
        </Card>
    ),
} as Story;

export const AllVariants: Story = {
    render: () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['primary', 'secondary', 'success', 'danger', 'warning', 'info'].map((variant) => (
                <Card
                    key={variant}
                    variant={variant as CardVariant}
                    title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Card`}
                    shadow="sm"
                    bordered
                >
                    <p>This is a {variant} card example.</p>
                </Card>
            ))}
        </div>
    ),
} as Story;

export const AllShadows: Story = {
    render: () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['sm', 'md', 'lg', 'none'].map((shadow) => (
                <Card
                    key={shadow}
                    variant="primary"
                    title={`shadow ${shadow} Card`}
                    shadow={shadow}
                    bordered
                >
                    <p>This is a {shadow} card example.</p>
                </Card>
            ))}
        </div>
    ),
} as Story;