import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
    title: 'Components/Breadcrumb',
    component: Breadcrumb,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
            description: 'Controls the color of the active breadcrumb item',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Controls the size of breadcrumb items',
        },
        separator: {
            control: 'select',
            options: ['slash', 'chevron', 'dot', 'arrow', 'custom'],
            description: 'Type of separator between items',
        },
        showHomeIcon: {
            control: 'boolean',
            description: 'Whether to show home icon for the first item',
        },
    },
} as Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
    args: {
        items: [
            { label: 'Home', href: '#' },
            { label: 'Products', href: '#' },
            { label: 'Category', href: '#' },
            { label: 'Item Name', active: true },
        ],
        variant: 'primary',
        size: 'md',
        separator: 'slash',
        showHomeIcon: true,
    },
};

export const WithIcons: Story = {
    args: {
        items: [
            {
                label: 'Home',
                href: '#',
                icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                ),
            },
            {
                label: 'Dashboard',
                href: '#',
                icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                ),
            },
            {
                label: 'User Settings',
                active: true,
                icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                ),
            },
        ],
        separator: 'chevron',
    },
};

export const Separators: Story = {
    render: () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-sm font-medium mb-2">Slash Separator:</h3>
                <Breadcrumb
                    items={[
                        { label: 'Home', href: '#' },
                        { label: 'Products', href: '#' },
                        { label: 'Item Name', active: true },
                    ]}
                    separator="slash"
                />
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">Chevron Separator:</h3>
                <Breadcrumb
                    items={[
                        { label: 'Home', href: '#' },
                        { label: 'Products', href: '#' },
                        { label: 'Item Name', active: true },
                    ]}
                    separator="chevron"
                />
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">Dot Separator:</h3>
                <Breadcrumb
                    items={[
                        { label: 'Home', href: '#' },
                        { label: 'Products', href: '#' },
                        { label: 'Item Name', active: true },
                    ]}
                    separator="dot"
                />
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">Arrow Separator:</h3>
                <Breadcrumb
                    items={[
                        { label: 'Home', href: '#' },
                        { label: 'Products', href: '#' },
                        { label: 'Item Name', active: true },
                    ]}
                    separator="arrow"
                />
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">Custom Separator:</h3>
                <Breadcrumb
                    items={[
                        { label: 'Home', href: '#' },
                        { label: 'Products', href: '#' },
                        { label: 'Item Name', active: true },
                    ]}
                    separator="custom"
                    customSeparator={<span className="mx-1 text-gray-400">|</span>}
                />
            </div>
        </div>
    ),
} as Story;

export const Sizes: Story = {
    render: () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-sm font-medium mb-2">Small:</h3>
                <Breadcrumb
                    size="sm"
                    items={[
                        { label: 'Home', href: '#' },
                        { label: 'Products', href: '#' },
                        { label: 'Item Name', active: true },
                    ]}
                />
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">Medium:</h3>
                <Breadcrumb
                    size="md"
                    items={[
                        { label: 'Home', href: '#' },
                        { label: 'Products', href: '#' },
                        { label: 'Item Name', active: true },
                    ]}
                />
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">Large:</h3>
                <Breadcrumb
                    size="lg"
                    items={[
                        { label: 'Home', href: '#' },
                        { label: 'Products', href: '#' },
                        { label: 'Item Name', active: true },
                    ]}
                />
            </div>
        </div>
    ),
} as Story;

export const ColorVariants: Story = {
    render: () => (
        <div className="space-y-4">
            <Breadcrumb
                variant="primary"
                items={[
                    { label: 'Home', href: '#' },
                    { label: 'Products', href: '#' },
                    { label: 'Primary Variant', active: true },
                ]}
            />
            <Breadcrumb
                variant="secondary"
                items={[
                    { label: 'Home', href: '#' },
                    { label: 'Products', href: '#' },
                    { label: 'Secondary Variant', active: true },
                ]}
            />
            <Breadcrumb
                variant="success"
                items={[
                    { label: 'Home', href: '#' },
                    { label: 'Products', href: '#' },
                    { label: 'Success Variant', active: true },
                ]}
            />
            <Breadcrumb
                variant="danger"
                items={[
                    { label: 'Home', href: '#' },
                    { label: 'Products', href: '#' },
                    { label: 'Danger Variant', active: true },
                ]}
            />
            <Breadcrumb
                variant="warning"
                items={[
                    { label: 'Home', href: '#' },
                    { label: 'Products', href: '#' },
                    { label: 'Warning Variant', active: true },
                ]}
            />
            <Breadcrumb
                variant="info"
                items={[
                    { label: 'Home', href: '#' },
                    { label: 'Products', href: '#' },
                    { label: 'Info Variant', active: true },
                ]}
            />
        </div>
    ),
} as Story;

export const ECommerceBreadcrumb: Story = {
    render: () => (
        <div className="space-y-4">
            <Breadcrumb
                showHomeIcon
                separator="chevron"
                items={[
                    { label: 'Home', href: '#' },
                    { label: 'Electronics', href: '#' },
                    { label: 'Smartphones', href: '#' },
                    { label: 'Apple', href: '#' },
                    { label: 'iPhone 14 Pro Max', active: true },
                ]}
            />
        </div>
    ),
} as Story;

export const WithCustomContent: Story = {
    render: () => (
        <Breadcrumb
            separator="chevron"
            items={[
                { label: 'Home', href: '#' },
                { label: 'Projects', href: '#' },
                {
                    label: (
                        <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              July 10, 2025
            </span>
                    ),
                    href: '#'
                },
                {
                    label: (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Active Project
            </span>
                    ),
                    active: true
                },
            ]}
        />
    ),
} as Story;