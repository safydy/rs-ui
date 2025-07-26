import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from './Accordion';
import { useState } from 'react';

const meta: Meta<typeof Accordion> = {
    title: 'Components/Accordion',
    component: Accordion,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
            description: 'Controls the color scheme of the accordion',
        },
        bordered: {
            control: 'boolean',
            description: 'Whether to show borders around accordion items',
        },
        allowMultiple: {
            control: 'boolean',
            description: 'Whether multiple items can be expanded at once',
        },
    },
} as Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
    render: (args) => (
        <Accordion {...args}>
            <AccordionItem id="item1" title="What is an accordion?">
                <p>
                    An accordion is a component that displays collapsible content panels for presenting information in a limited space.
                    Each panel can be expanded or collapsed to reveal or hide its contents.
                </p>
            </AccordionItem>
            <AccordionItem id="item2" title="How do I use an accordion?">
                <p>
                    Click on the accordion header to expand or collapse the content panel.
                    Only one panel can be expanded at a time (unless allowMultiple is set to true).
                </p>
            </AccordionItem>
            <AccordionItem id="item3" title="Can I customize the accordion?">
                <p>
                    Yes, you can customize the accordion by changing its variant, adding icons to items,
                    making it bordered or borderless, and more.
                </p>
            </AccordionItem>
        </Accordion>
    ),
    args: {
        variant: 'primary',
        allowMultiple: false,
        bordered: true,
    },
} as Story;

export const AllowMultiple: Story = {
    render: (args) => (
        <Accordion {...args}>
            <AccordionItem id="faq1" title="First question?">
                <p>This is the answer to the first question.</p>
            </AccordionItem>
            <AccordionItem id="faq2" title="Second question?">
                <p>This is the answer to the second question.</p>
            </AccordionItem>
            <AccordionItem id="faq3" title="Third question?">
                <p>This is the answer to the third question.</p>
                <p className="mt-2">You can have multiple paragraphs or complex content here.</p>
            </AccordionItem>
        </Accordion>
    ),
    args: {
        allowMultiple: true,
        defaultExpanded: ['faq1', 'faq3'],
        variant: 'primary',
    },
} as Story;

export const Variants: Story = {
    render: () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-sm font-medium mb-2">Primary Variant:</h3>
                <Accordion variant="primary">
                    <AccordionItem id="primary1" title="Primary Accordion Item">
                        <p>This is using the primary color variant.</p>
                    </AccordionItem>
                </Accordion>
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">Secondary Variant:</h3>
                <Accordion variant="secondary">
                    <AccordionItem id="secondary1" title="Secondary Accordion Item">
                        <p>This is using the secondary color variant.</p>
                    </AccordionItem>
                </Accordion>
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">Success Variant:</h3>
                <Accordion variant="success">
                    <AccordionItem id="success1" title="Success Accordion Item">
                        <p>This is using the success color variant.</p>
                    </AccordionItem>
                </Accordion>
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">Danger Variant:</h3>
                <Accordion variant="danger">
                    <AccordionItem id="danger1" title="Danger Accordion Item">
                        <p>This is using the danger color variant.</p>
                    </AccordionItem>
                </Accordion>
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">Warning Variant:</h3>
                <Accordion variant="warning">
                    <AccordionItem id="warning1" title="Warning Accordion Item">
                        <p>This is using the warning color variant.</p>
                    </AccordionItem>
                </Accordion>
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">Info Variant:</h3>
                <Accordion variant="info">
                    <AccordionItem id="info1" title="Info Accordion Item">
                        <p>This is using the info color variant.</p>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    ),
} as Story;

export const WithIcons: Story = {
    render: () => (
        <Accordion>
            <AccordionItem
                id="icon1"
                title="User Settings"
                icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                }
            >
                <p>Manage your user settings and preferences.</p>
            </AccordionItem>

            <AccordionItem
                id="icon2"
                title="Security"
                icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                }
            >
                <p>Configure your account security settings.</p>
            </AccordionItem>

            <AccordionItem
                id="icon3"
                title="Notifications"
                icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                }
            >
                <p>Manage your notification preferences.</p>
            </AccordionItem>
        </Accordion>
    ),
} as Story;

export const DisabledItems: Story = {
    render: () => (
        <Accordion>
            <AccordionItem id="normal1" title="Normal Item">
                <p>This is a normal accordion item that can be toggled.</p>
            </AccordionItem>

            <AccordionItem id="disabled1" title="Disabled Item" disabled>
                <p>This accordion item is disabled and cannot be toggled.</p>
            </AccordionItem>

            <AccordionItem id="normal2" title="Another Normal Item">
                <p>This is another normal accordion item that can be toggled.</p>
            </AccordionItem>
        </Accordion>
    ),
};

export const Borderless: Story = {
    render: () => (
        <Accordion bordered={false}>
            <AccordionItem id="borderless1" title="First Item Without Border">
                <p>This accordion doesn't have borders around its items.</p>
            </AccordionItem>

            <AccordionItem id="borderless2" title="Second Item Without Border">
                <p>It creates a cleaner, more minimal look.</p>
            </AccordionItem>

            <AccordionItem id="borderless3" title="Third Item Without Border">
                <p>Great for interfaces where you want to reduce visual clutter.</p>
            </AccordionItem>
        </Accordion>
    ),
} as Story;

export const ControlledAccordion: Story = {
    render: () => {
        const [openItems, setOpenItems] = useState<string[]>(['panel1']);

        return (
            <div className="space-y-4">
                <div>
                    <p className="mb-2 text-sm">Currently open: {openItems.join(', ') || 'none'}</p>
                    <div className="flex gap-2 mb-4">
                        <button
                            onClick={() => setOpenItems(['panel1'])}
                            className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                        >
                            Open First
                        </button>
                        <button
                            onClick={() => setOpenItems(['panel2'])}
                            className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                        >
                            Open Second
                        </button>
                        <button
                            onClick={() => setOpenItems([])}
                            className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                        >
                            Close All
                        </button>
                    </div>
                </div>

                <Accordion
                    allowMultiple={false}
                    defaultExpanded={openItems}
                    onChange={setOpenItems}
                >
                    <AccordionItem id="panel1" title="First Panel">
                        <p>This is the first panel content.</p>
                    </AccordionItem>
                    <AccordionItem id="panel2" title="Second Panel">
                        <p>This is the second panel content.</p>
                    </AccordionItem>
                </Accordion>
            </div>
        );
    },
} as Story;

export const NestedAccordions: Story = {
    render: () => (
        <Accordion>
            <AccordionItem id="parent1" title="Categories">
                <Accordion variant="secondary">
                    <AccordionItem id="child1" title="Electronics">
                        <ul className="list-disc pl-5">
                            <li>Smartphones</li>
                            <li>Laptops</li>
                            <li>Tablets</li>
                        </ul>
                    </AccordionItem>
                    <AccordionItem id="child2" title="Clothing">
                        <ul className="list-disc pl-5">
                            <li>Men's</li>
                            <li>Women's</li>
                            <li>Children's</li>
                        </ul>
                    </AccordionItem>
                </Accordion>
            </AccordionItem>
            <AccordionItem id="parent2" title="More Information">
                <p>This is a simple accordion item without nested content.</p>
            </AccordionItem>
        </Accordion>
    ),
} as Story;

export const CustomStyles: Story = {
    render: () => (
        <Accordion>
            <AccordionItem
                id="custom1"
                title={<span className="text-purple-700 font-bold">Custom Header</span>}
                headerClassName="bg-purple-50 hover:bg-purple-100"
                contentClassName="bg-gray-50"
            >
                <p>This accordion item has custom styling for both header and content.</p>
            </AccordionItem>

            <AccordionItem
                id="custom2"
                title="Rich Content"
                contentClassName="p-0"
            >
                <div className="bg-gray-50 p-4 rounded">
                    <h3 className="text-lg font-bold mb-2">Rich Content Example</h3>
                    <p className="mb-2">You can include any kind of content in an accordion:</p>
                    <ul className="list-disc pl-5 mb-2">
                        <li>Lists</li>
                        <li>Images</li>
                        <li>Forms</li>
                    </ul>
                    <div className="bg-blue-100 p-3 rounded">
                        <p className="text-blue-800 text-sm">Even nested containers like this info box!</p>
                    </div>
                </div>
            </AccordionItem>
        </Accordion>
    ),
} as Story;

export const FAQExample: Story = {
    render: () => (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <Accordion allowMultiple variant="info">
                <AccordionItem
                    id="faq1"
                    title="How do I create an account?"
                    icon={<span className="text-xl mr-2">Q:</span>}
                >
                    <p>
                        Creating an account is easy! Click on the "Sign Up" button in the top right
                        corner of the page and fill out the registration form with your details.
                    </p>
                </AccordionItem>

                <AccordionItem
                    id="faq2"
                    title="What payment methods do you accept?"
                    icon={<span className="text-xl mr-2">Q:</span>}
                >
                    <p>
                        We accept all major credit cards (Visa, MasterCard, American Express),
                        PayPal, and bank transfers. All transactions are secure and encrypted.
                    </p>
                </AccordionItem>

                <AccordionItem
                    id="faq3"
                    title="How can I track my order?"
                    icon={<span className="text-xl mr-2">Q:</span>}
                >
                    <p>
                        Once your order is shipped, you'll receive a confirmation email with a
                        tracking number. You can use this number on our website's "Order Tracking"
                        page or directly on the carrier's website.
                    </p>
                </AccordionItem>

                <AccordionItem
                    id="faq4"
                    title="What is your return policy?"
                    icon={<span className="text-xl mr-2">Q:</span>}
                >
                    <p>
                        We offer a 30-day return policy on all items. Products must be in their
                        original condition with tags attached. Please visit our "Returns" page
                        to initiate the return process.
                    </p>
                </AccordionItem>
            </Accordion>
        </div>
    ),
} as Story;