import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { FiAlertCircle, FiInfo, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

const meta: Meta<typeof Alert> = {
    title: 'Components/Alert',
    component: Alert,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
            description: 'Controls the color scheme of the alert',
        },
        isDismissible: {
            control: 'boolean',
            description: 'If true, displays a close button',
        },
        leftIcon: {
            control: 'object',
            description: 'Icon to display on the left side',
        },
        title: {
            control: 'text',
            description: 'Optional title for the alert',
        },
        autoDismiss: {
            control: 'number',
            description: 'Automatically dismiss after specified milliseconds (0 means no auto-dismiss)',
        },
    },
} as Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof Alert>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'This is a primary alert with useful information.',
        leftIcon: <FiInfo className="w-5 h-5" />,
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'This is a secondary alert with additional information.',
    },
};

export const Success: Story = {
    args: {
        variant: 'success',
        children: 'Operation completed successfully!',
        leftIcon: <FiCheckCircle className="w-5 h-5" />,
        title: 'Success',
    },
};

export const Danger: Story = {
    args: {
        variant: 'danger',
        children: 'There was an error processing your request. Please try again.',
        leftIcon: <FiAlertCircle className="w-5 h-5" />,
        title: 'Error',
    },
};

export const Warning: Story = {
    args: {
        variant: 'warning',
        children: 'This action cannot be undone. Please proceed with caution.',
        leftIcon: <FiAlertTriangle className="w-5 h-5" />,
    },
};

export const Info: Story = {
    args: {
        variant: 'info',
        children: 'The system will be undergoing maintenance in 30 minutes.',
        leftIcon: <FiInfo className="w-5 h-5" />,
    },
};

export const Dismissible: Story = {
    args: {
        variant: 'primary',
        isDismissible: true,
        children: 'You can dismiss this alert by clicking the close button.',
        leftIcon: <FiInfo className="w-5 h-5" />,
    },
};

export const WithLeftIcon: Story = {
    args: {
        variant: 'primary',
        children: 'An alert with an icon on the left side.',
        leftIcon: <FiInfo className="w-5 h-5" />,
    },
};

export const WithTitle: Story = {
    args: {
        variant: 'info',
        title: 'Information',
        children: 'This alert contains a title and description for better context.',
        leftIcon: <FiInfo className="w-5 h-5" />,
    },
};

export const AutoDismiss: Story = {
    args: {
        variant: 'success',
        children: 'This alert will automatically dismiss in 5 seconds.',
        leftIcon: <FiCheckCircle className="w-5 h-5" />,
        autoDismiss: 5000,
    },
};

export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Alert variant="primary">Primary Alert</Alert>
            <Alert variant="secondary">Secondary Alert</Alert>
            <Alert variant="success">Success Alert</Alert>
            <Alert variant="danger">Danger Alert</Alert>
            <Alert variant="warning">Warning Alert</Alert>
            <Alert variant="info">Info Alert</Alert>
        </div>
    ),
} as Story;