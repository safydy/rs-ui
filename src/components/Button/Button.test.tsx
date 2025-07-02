import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

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

    it('renders with correct variant class', () => {
        const { rerender } = render(<Button variant="success">Success Button</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-green-600');

        rerender(<Button variant="danger">Danger Button</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-red-600');
    });
});