import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';
import { FiSend } from 'react-icons/fi';

describe('Button', () => {
    it('renders correctly', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', async () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click me</Button>);

        await userEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('is disabled when isLoading is true', () => {
        render(<Button isLoading>Click me</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('ís disabled when disabled prop is true', () => {
        render(<Button disabled>Click me</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    })

    it('renders with correct variant class', () => {
        const { rerender } = render(<Button variant="success">Success Button</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-green-600');

        rerender(<Button variant="danger">Danger Button</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-red-600');

        rerender(<Button variant="primary">Primary Button</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-gray-200');

        rerender(<Button variant="secondary">Secondary Button</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-gray-600');

        rerender(<Button variant="warning">Warning Button</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-yellow-400');

        rerender(<Button variant="info">Info Button</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-blue-600');
    });

    it('renders left icon', () => {
        render(<Button leftIcon={<FiSend />}>Send</Button>);
        expect(screen.getByRole('button')).toContainElement(screen.getByTestId('icon-left'));
    })

    it('renders right icon', () => {
        render(<Button rightIcon={<FiSend />}>Send</Button>);
        expect(screen.getByRole('button')).toContainElement(screen.getByTestId('icon-right'));
    })
});