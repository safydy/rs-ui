import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Alert } from './Alert';

describe('Alert Component', () => {
    it('renders correctly with default props', () => {
        render(<Alert>Test alert</Alert>);
        expect(screen.getByText('Test alert')).toBeInTheDocument();
    });

    it('renders with the correct variant styles', () => {
        const { rerender } = render(<Alert variant="success">Success alert</Alert>);
        expect(screen.getByRole('alert')).toHaveClass('bg-green-50');

        rerender(<Alert variant="danger">Danger alert</Alert>);
        expect(screen.getByRole('alert')).toHaveClass('bg-red-50');
    });

    it('renders with a title when provided', () => {
        render(<Alert title="Alert Title">Test alert</Alert>);
        expect(screen.getByText('Alert Title')).toBeInTheDocument();
    });

    it('renders with a left icon when provided', () => {
        render(
            <Alert leftIcon={<span data-testid="test-icon">Icon</span>}>
                Test alert with icon
            </Alert>
        );
        expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('calls onDismiss when close button is clicked', () => {
        const onDismiss = vi.fn();
        render(
            <Alert isDismissible onDismiss={onDismiss}>
                Dismissible alert
            </Alert>
        );

        fireEvent.click(screen.getByLabelText('Close'));
        expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('does not show a close button when isDismissible is false', () => {
        render(<Alert isDismissible={false}>Non-isDismissible alert</Alert>);
        expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
    });

    it('auto-dismisses after the specified time', async () => {
        vi.useFakeTimers();
        const onDismiss = vi.fn();

        render(
            <Alert autoDismiss={2000} onDismiss={onDismiss}>
                Auto-dismiss alert
            </Alert>
        );

        expect(screen.getByText('Auto-dismiss alert')).toBeInTheDocument();

        // Fast-forward time
        act(() => {
            vi.advanceTimersByTime(2000);
        });

        // Check if alert is dismissed
        expect(onDismiss).toHaveBeenCalledTimes(1);
        expect(screen.queryByText('Auto-dismiss alert')).not.toBeInTheDocument();

        vi.useRealTimers();
    });
});