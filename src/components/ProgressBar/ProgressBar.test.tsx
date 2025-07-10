import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar Component', () => {
    it('renders correctly with default props', () => {
        render(<ProgressBar value={50} />);
        const progressbar = screen.getByRole('progressbar');
        expect(progressbar).toBeInTheDocument();
        expect(progressbar).toHaveAttribute('aria-valuenow', '50');
        expect(progressbar).toHaveStyle({ width: '50%' });
    });

    it('clamps value to min-max range', () => {
        const { rerender } = render(<ProgressBar value={120} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
        expect(screen.getByRole('progressbar')).toHaveStyle({ width: '100%' });

        rerender(<ProgressBar value={-10} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
        expect(screen.getByRole('progressbar')).toHaveStyle({ width: '0%' });
    });

    it('renders with the correct size classes', () => {
        const { rerender } = render(<ProgressBar value={50} size="xs" />);
        expect(screen.getByRole('progressbar')).toHaveClass('h-1');

        rerender(<ProgressBar value={50} size="sm" />);
        expect(screen.getByRole('progressbar')).toHaveClass('h-2');

        rerender(<ProgressBar value={50} size="md" />);
        expect(screen.getByRole('progressbar')).toHaveClass('h-4');

        rerender(<ProgressBar value={50} size="lg" />);
        expect(screen.getByRole('progressbar')).toHaveClass('h-6');
    });

    it('renders with the correct variant styles', () => {
        const { rerender } = render(<ProgressBar value={50} variant="primary" />);
        expect(screen.getByRole('progressbar')).toHaveClass('bg-blue-600');

        rerender(<ProgressBar value={50} variant="success" />);
        expect(screen.getByRole('progressbar')).toHaveClass('bg-green-600');

        rerender(<ProgressBar value={50} variant="danger" />);
        expect(screen.getByRole('progressbar')).toHaveClass('bg-red-600');

        rerender(<ProgressBar value={50} variant="warning" />);
        expect(screen.getByRole('progressbar')).toHaveClass('bg-yellow-500');

        rerender(<ProgressBar value={50} variant="info" />);
        expect(screen.getByRole('progressbar')).toHaveClass('bg-cyan-600');

        rerender(<ProgressBar value={50} variant="secondary" />);
        expect(screen.getByRole('progressbar')).toHaveClass('bg-gray-600');
    });

    it('displays a label when provided', () => {
        render(<ProgressBar value={50} label="Test Label" />);
        expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('shows percentage text when showPercentage is true', () => {
        render(<ProgressBar value={50} showPercentage label="Test" />);
        expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('applies striped styles when striped is true', () => {
        render(<ProgressBar value={50} striped />);
        expect(screen.getByRole('progressbar')).toHaveClass('bg-gradient-to-r');
    });

    it('applies animated styles when animated and striped are true', () => {
        render(<ProgressBar value={50} striped animated />);
        expect(screen.getByRole('progressbar')).toHaveClass('animate-progress-stripes');
    });

    it('does not apply animated styles when striped is false', () => {
        render(<ProgressBar value={50} animated striped={false} />);
        expect(screen.getByRole('progressbar')).not.toHaveClass('animate-progress-stripes');
    });

    it('renders percentage inside bar for large size', () => {
        render(<ProgressBar value={50} size="lg" showPercentage />);
        const progressbar = screen.getByRole('progressbar');
        expect(progressbar).toHaveTextContent('50%');
    });

    it('applies custom className', () => {
        render(<ProgressBar value={50} className="custom-class" />);
        // Check that the wrapper div has the custom class
        expect(screen.getByRole('progressbar').parentElement?.parentElement).toHaveClass('custom-class');
    });
});