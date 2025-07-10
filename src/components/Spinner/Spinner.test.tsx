import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner Component', () => {
    it('renders correctly with default props', () => {
        render(<Spinner />);
        expect(screen.getByRole('status')).toBeInTheDocument();
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('applies the correct size classes for border type', () => {
        const { rerender } = render(<Spinner size="xs" type="border" />);
        expect(screen.getByRole('status').firstChild).toHaveClass('w-3 h-3');

        rerender(<Spinner size="sm" type="border" />);
        expect(screen.getByRole('status').firstChild).toHaveClass('w-4 h-4');

        rerender(<Spinner size="md" type="border" />);
        expect(screen.getByRole('status').firstChild).toHaveClass('w-6 h-6');

        rerender(<Spinner size="lg" type="border" />);
        expect(screen.getByRole('status').firstChild).toHaveClass('w-8 h-8');

        rerender(<Spinner size="xl" type="border" />);
        expect(screen.getByRole('status').firstChild).toHaveClass('w-12 h-12');
    });

    it('applies the correct variant classes', () => {
        const { rerender } = render(<Spinner variant="primary" type="border"/>);
        expect(screen.getByRole('status').firstChild).toHaveClass('border-blue-600');

        rerender(<Spinner variant="success" type="border"/>);
        expect(screen.getByRole('status').firstChild).toHaveClass('border-green-600');

        rerender(<Spinner variant="danger" type="border"/>);
        expect(screen.getByRole('status').firstChild).toHaveClass('border-red-600');

        rerender(<Spinner variant="warning" type="border"/>);
        expect(screen.getByRole('status').firstChild).toHaveClass('border-yellow-600');

        rerender(<Spinner variant="info" type="border"/>);
        expect(screen.getByRole('status').firstChild).toHaveClass('border-cyan-600');

        rerender(<Spinner variant="secondary" type="border"/>);
        expect(screen.getByRole('status').firstChild).toHaveClass('border-gray-600');
    });

    it('renders border type spinner with proper classes', () => {
        render(<Spinner type="border" />);
        const spinner = screen.getByRole('status').firstChild;
        expect(spinner).toHaveClass('animate-spin');
        expect(spinner).toHaveClass('rounded-full');
        expect(spinner).toHaveClass('border-r-transparent');
        expect(spinner).toHaveClass('border-b-transparent');
    });

    it('renders grow type spinner with proper classes', () => {
        render(<Spinner type="grow" />);
        const spinner = screen.getByRole('status').firstChild;
        expect(spinner).toHaveClass('animate-pulse');
        expect(spinner).toHaveClass('rounded-full');
        expect(spinner).toHaveClass('bg-current');
    });

    it('renders dots type spinner with three dots', () => {
        render(<Spinner type="dots" />);
        const statusElement = screen.getByRole('status');
        // Count the number of elements with animate-bounce classes
        const dots = statusElement.querySelectorAll('[class*="animate-bounce"]');
        expect(dots.length).toBe(3);
    });

    it('applies custom label for screen readers', () => {
        render(<Spinner label="Custom loading message" />);
        expect(screen.getByText('Custom loading message')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        render(<Spinner className="custom-class" />);
        expect(screen.getByRole('status')).toHaveClass('custom-class');
    });

    it('renders with proper border width based on size', () => {
        const { rerender } = render(<Spinner size="sm" type="border" />);
        expect(screen.getByRole('status').firstChild).toHaveClass('border-2');

        rerender(<Spinner size="xl" type="border" />);
        expect(screen.getByRole('status').firstChild).toHaveClass('border-4');
    });
});