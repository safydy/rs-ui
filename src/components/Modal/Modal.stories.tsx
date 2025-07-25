import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { useState } from 'react';

const meta: Meta<typeof Modal> = {
    title: 'Components/Modal',
    component: Modal,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
            description: 'Controls the color scheme of the modal header',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'xl', 'full'],
            description: 'Controls the size of the modal',
        },
        overlayOpacity: {
            control: { type: 'range', min: 0, max: 100, step: 5 },
            description: 'Controls the opacity of the overlay (0-100)',
        },
        isOpen: {
            control: 'boolean',
            description: 'Controls whether the modal is displayed',
        },
    },
    decorators: [
        (Story) => (
            <div className="p-6 bg-white dark:bg-gray-800">
                {Story()}
            </div>
        ),
    ],
} as Meta<typeof Modal>;

export default meta;

// We need to create a wrapper component to handle the state
const ModalDemo = (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal
                {...args}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </div>
    );
};

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
    render: (args) => <ModalDemo {...args} />,
    args: {
        title: 'Modal Title',
        children: <p className="text-gray-700 dark:text-gray-300">This is the content of the modal dialog.</p>,
        footer: (
            <>
                <Button variant="secondary">Cancel</Button>
                <Button variant="primary">Confirm</Button>
            </>
        ),
        variant: 'primary',
        size: 'md',
    },
} as Story;

export const WithCustomActions: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        const [result, setResult] = useState<string | null>(null);

        const handleConfirm = () => {
            setResult('Confirmed!');
            setIsOpen(false);
        };

        const handleCancel = () => {
            setResult('Cancelled!');
            setIsOpen(false);
        };

        return (
            <div className="space-y-4">
                <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
                {result && (
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                        Result: {result}
                    </div>
                )}

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Confirm Action"
                    variant="warning"
                    footer={
                        <>
                            <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                            <Button variant="warning" onClick={handleConfirm}>Yes, I'm sure</Button>
                        </>
                    }
                >
                    <p className="text-gray-700 dark:text-gray-300">
                        Are you sure you want to perform this action?<br/>
                        This action cannot be undone.
                    </p>
                </Modal>
            </div>
        );
    },
} as Story;

export const Variants: Story = {
    render: () => {
        const [variant, setVariant] = useState<'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'>('primary');
        const [isOpen, setIsOpen] = useState(false);

        const openModal = (selectedVariant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info') => {
            setVariant(selectedVariant);
            setIsOpen(true);
        };

        return (
            <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    <Button variant="primary" onClick={() => openModal('primary')}>Primary</Button>
                    <Button variant="secondary" onClick={() => openModal('secondary')}>Secondary</Button>
                    <Button variant="success" onClick={() => openModal('success')}>Success</Button>
                    <Button variant="danger" onClick={() => openModal('danger')}>Danger</Button>
                    <Button variant="warning" onClick={() => openModal('warning')}>Warning</Button>
                    <Button variant="info" onClick={() => openModal('info')}>Info</Button>
                </div>

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Modal`}
                    variant={variant}
                    footer={
                        <>
                            <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button variant={variant} onClick={() => setIsOpen(false)}>Confirm</Button>
                        </>
                    }
                >
                    <p className="text-gray-700 dark:text-gray-300">
                        This modal uses the {variant} variant styling for its header.
                    </p>
                </Modal>
            </div>
        );
    },
} as Story;

export const Sizes: Story = {
    render: () => {
        const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
        const [isOpen, setIsOpen] = useState(false);

        const openModal = (selectedSize: 'sm' | 'md' | 'lg' | 'xl' | 'full') => {
            setSize(selectedSize);
            setIsOpen(true);
        };

        return (
            <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    <Button onClick={() => openModal('sm')}>Small</Button>
                    <Button onClick={() => openModal('md')}>Medium</Button>
                    <Button onClick={() => openModal('lg')}>Large</Button>
                    <Button onClick={() => openModal('xl')}>X-Large</Button>
                    <Button onClick={() => openModal('full')}>Full Width</Button>
                </div>

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title={`${size.toUpperCase()} Size Modal`}
                    size={size}
                    footer={
                        <Button variant="primary" onClick={() => setIsOpen(false)}>Close</Button>
                    }
                >
                    <div className="text-gray-700 dark:text-gray-300">
                        <p>This modal has a size of <strong>{size}</strong>.</p>
                        <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded mt-4 flex items-center justify-center">
                            Content area
                        </div>
                    </div>
                </Modal>
            </div>
        );
    },
} as Story;

export const LongContent: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div>
                <Button onClick={() => setIsOpen(true)}>Open Modal with Long Content</Button>

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Scrollable Content"
                    scrollable={true}
                    footer={
                        <Button variant="primary" onClick={() => setIsOpen(false)}>Close</Button>
                    }
                >
                    <div className="space-y-4 text-gray-700 dark:text-gray-300">
                        <p>This modal contains a lot of content that will make it scrollable.</p>
                        {Array(10).fill(0).map((_, i) => (
                            <div key={i} className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                                <h4 className="font-medium">Section {i + 1}</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                            </div>
                        ))}
                    </div>
                </Modal>
            </div>
        );
    },
} as Story;

export const CustomHeader: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div>
                <Button onClick={() => setIsOpen(true)}>Open Modal with Custom Header</Button>

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="User Profile"
                    headerPrefix={
                        <div className="mr-3">
                            <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                                <span>JS</span>
                            </div>
                        </div>
                    }
                    footer={
                        <Button variant="primary" onClick={() => setIsOpen(false)}>Close</Button>
                    }
                >
                    <div className="space-y-3 text-gray-700 dark:text-gray-300">
                        <p><strong>Name:</strong> John Smith</p>
                        <p><strong>Email:</strong> john.smith@example.com</p>
                        <p><strong>Role:</strong> Administrator</p>
                        <p><strong>Member since:</strong> January 15, 2025</p>
                    </div>
                </Modal>
            </div>
        );
    },
} as Story;

export const FormModal: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        const [formData, setFormData] = useState({ name: '', email: '' });
        const [submitted, setSubmitted] = useState(false);

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            setSubmitted(true);
            setTimeout(() => {
                setIsOpen(false);
                // Reset form after closing
                setTimeout(() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '' });
                }, 300);
            }, 1000);
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };

        return (
            <div className="space-y-4">
                <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>

                <Modal
                    isOpen={isOpen}
                    onClose={() => !submitted && setIsOpen(false)}
                    title="Contact Form"
                    variant="primary"
                    closeOnEsc={!submitted}
                    closeOnOverlayClick={!submitted}
                    showCloseButton={!submitted}
                >
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {submitted ? (
                                <div className="flex flex-col items-center justify-center py-4">
                                    <svg
                                        className="w-12 h-12 text-green-500 mb-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <p className="text-xl font-medium">Thank you!</p>
                                    <p className="text-gray-600 dark:text-gray-300">Your form has been submitted.</p>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        {!submitted && (
                            <div className="mt-5 flex justify-end gap-2">
                                <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary">
                                    Submit
                                </Button>
                            </div>
                        )}
                    </form>
                </Modal>
            </div>
        );
    },
} as Story;

export const ConfirmationDialog: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div>
                <Button variant="danger" onClick={() => setIsOpen(true)}>Delete Item</Button>

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Confirm Delete"
                    variant="danger"
                    size="sm"
                    footer={
                        <>
                            <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button variant="danger" onClick={() => setIsOpen(false)}>Delete</Button>
                        </>
                    }
                >
                    <div className="text-center py-4">
                        <svg
                            className="mx-auto w-12 h-12 text-red-500 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                        <p className="text-gray-700 dark:text-gray-300">
                            Are you sure you want to delete this item? This action cannot be undone.
                        </p>
                    </div>
                </Modal>
            </div>
        );
    },
} as Story;