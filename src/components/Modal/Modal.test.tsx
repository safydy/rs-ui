import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';
import { describe, it, expect, vi } from 'vitest';

// Mock React's createPortal
vi.mock('react-dom', () => {
    return {
        ...vi.importActual('react-dom'),
        createPortal: (node: React.ReactNode) => node,
    };
});

describe('Modal Component', () => {
    const mockOnClose = vi.fn();

    beforeEach(() => {
        mockOnClose.mockClear();
        // Reset body style that might be changed by previous tests
        document.body.style.overflow = '';
    });

    it('renders modal when isOpen is true', () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
                Modal content
            </Modal>
        );

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('Test Modal')).toBeInTheDocument();
        expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('does not render modal when isOpen is false', () => {
        render(
            <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
                Modal content
            </Modal>
        );

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
        expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose} title="Test Modal" showCloseButton={true}>
                Modal content
            </Modal>
        );

        await userEvent.click(screen.getByLabelText('Close'));
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when overlay is clicked and closeOnOverlayClick is true', async () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose} closeOnOverlayClick={true}>
                Modal content
            </Modal>
        );

        // Click on the overlay (parent element of the modal)
        const overlay = screen.getByRole('main-dialog');
        await userEvent.click(overlay);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when overlay is clicked and closeOnOverlayClick is false', async () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose} closeOnOverlayClick={false}>
                Modal content
            </Modal>
        );

        // Click on the overlay (parent element of the modal)
        const overlay = screen.getByRole('dialog');
        await userEvent.click(overlay);

        expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('calls onClose when Escape key is pressed and closeOnEsc is true', () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose} closeOnEsc={true}>
                Modal content
            </Modal>
        );

        fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when Escape key is pressed and closeOnEsc is false', () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose} closeOnEsc={false}>
                Modal content
            </Modal>
        );

        fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
        expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('renders footer when provided', () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose} footer={<button>Submit</button>}>
                Modal content
            </Modal>
        );

        expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('applies the correct size class', () => {
        const { rerender } = render(
            <Modal isOpen={true} onClose={mockOnClose} size="sm">
                Modal content
            </Modal>
        );

        expect(screen.getByRole('dialog')).toHaveClass('max-w-sm');

        rerender(
            <Modal isOpen={true} onClose={mockOnClose} size="lg">
                Modal content
            </Modal>
        );

        expect(screen.getByRole('dialog')).toHaveClass('max-w-lg');
    });

    it('applies the correct variant styles to the header', () => {
        const { rerender } = render(
            <Modal isOpen={true} onClose={mockOnClose} title="Test" variant="primary">
                Modal content
            </Modal>
        );

        expect(screen.getByText('Test').parentElement.parentElement).toHaveClass('bg-blue-50');

        rerender(
            <Modal isOpen={true} onClose={mockOnClose} title="Test" variant="danger">
                Modal content
            </Modal>
        );

        expect(screen.getByText('Test').parentElement.parentElement).toHaveClass('bg-red-50');
    });

    it('renders with header prefix when provided', () => {
        render(
            <Modal
                isOpen={true}
                onClose={mockOnClose}
                title="Test Modal"
                headerPrefix={<span data-testid="prefix">Prefix</span>}
            >
                Modal content
            </Modal>
        );

        expect(screen.getByTestId('prefix')).toBeInTheDocument();
    });

    it('locks scrolling of body when modal is open', () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose}>
                Modal content
            </Modal>
        );

        expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body scrolling when modal is closed', async () => {
        const { rerender } = render(
            <Modal isOpen={true} onClose={mockOnClose}>
                Modal content
            </Modal>
        );

        expect(document.body.style.overflow).toBe('hidden');

        rerender(
            <Modal isOpen={false} onClose={mockOnClose}>
                Modal content
            </Modal>
        );

        await waitFor(() => {
            expect(document.body.style.overflow).not.toBe('hidden');
        });
    });

    it('calls onOpened when modal opens', () => {
        const onOpened = vi.fn();

        render(
            <Modal isOpen={true} onClose={mockOnClose} onOpened={onOpened}>
                Modal content
            </Modal>
        );

        expect(onOpened).toHaveBeenCalledTimes(1);
    });

    it('calls onClosed when modal closes', async () => {
        const onClosed = vi.fn();
        const { rerender } = render(
            <Modal isOpen={true} onClose={mockOnClose} onClosed={onClosed}>
                Modal content
            </Modal>
        );

        rerender(
            <Modal isOpen={false} onClose={mockOnClose} onClosed={onClosed}>
                Modal content
            </Modal>
        );

        // Wait for the close animation to finish
        await waitFor(() => {
            expect(onClosed).toHaveBeenCalledTimes(1);
        }, { timeout: 400 });
    });

    it('sets proper ARIA attributes for accessibility', () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
                Modal content
            </Modal>
        );

        const dialog = screen.getByRole('main-dialog');
        expect(dialog).toHaveAttribute('aria-modal', 'true');
        expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');

        const title = screen.getByText('Test Modal');
        expect(title).toHaveAttribute('id', 'modal-title');
    });
});