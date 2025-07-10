import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar Component', () => {
    it('renders an image when src is provided', () => {
        render(<Avatar src="test-image.jpg" alt="Test Avatar" />);
        const img = screen.getByAltText('Test Avatar');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', 'test-image.jpg');
    });

    it('renders initials when no src is provided but name is', () => {
        render(<Avatar name="John Doe" />);
        const avatarEl = screen.getByLabelText('John Doe');
        expect(avatarEl).toBeInTheDocument();
        expect(avatarEl).toHaveTextContent('JD');
    });

    it('renders only first two initials for names with more than two words', () => {
        render(<Avatar name="John Middle Doe" />);
        const avatarEl = screen.getByLabelText('John Middle Doe');
        expect(avatarEl).toHaveTextContent('JM');
    });

    it('renders nothing when no src or name is provided', () => {
        render(<Avatar />);
        const avatarEl = screen.getByLabelText('Avatar');
        expect(avatarEl).toHaveTextContent('');
    });

    it('applies the correct size classes', () => {
        const { rerender } = render(<Avatar name="John Doe" size="xs" />);
        expect(screen.getByLabelText('John Doe')).toHaveClass('w-6 h-6');

        rerender(<Avatar name="John Doe" size="sm" />);
        expect(screen.getByLabelText('John Doe')).toHaveClass('w-8 h-8');

        rerender(<Avatar name="John Doe" size="md" />);
        expect(screen.getByLabelText('John Doe')).toHaveClass('w-10 h-10');

        rerender(<Avatar name="John Doe" size="lg" />);
        expect(screen.getByLabelText('John Doe')).toHaveClass('w-12 h-12');

        rerender(<Avatar name="John Doe" size="xl" />);
        expect(screen.getByLabelText('John Doe')).toHaveClass('w-16 h-16');
    });

    it('applies the correct shape classes', () => {
        const { rerender } = render(<Avatar name="John Doe" shape="circle" />);
        expect(screen.getByLabelText('John Doe')).toHaveClass('rounded-full');

        rerender(<Avatar name="John Doe" shape="square" />);
        expect(screen.getByLabelText('John Doe')).toHaveClass('rounded-md');
    });

    it('applies the correct border variant classes', () => {
        const { rerender } = render(<Avatar name="John Doe" borderVariant="primary" />);
        expect(screen.getByLabelText('John Doe')).toHaveClass('border-blue-500');

        rerender(<Avatar name="John Doe" borderVariant="success" />);
        expect(screen.getByLabelText('John Doe')).toHaveClass('border-green-500');

        rerender(<Avatar name="John Doe" borderVariant="danger" />);
        expect(screen.getByLabelText('John Doe')).toHaveClass('border-red-500');
    });

    it('renders a status indicator when status prop is provided', () => {
        render(<Avatar name="John Doe" status="success" />);
        expect(screen.getByLabelText('success status')).toBeInTheDocument();
        expect(screen.getByLabelText('success status')).toHaveClass('bg-green-500');
    });

    it('does not render a status indicator when status is null', () => {
        render(<Avatar name="John Doe" status={null} />);
        expect(screen.queryByLabelText(/status/i)).not.toBeInTheDocument();
    });

    it('applies custom class name', () => {
        render(<Avatar name="John Doe" className="custom-class" />);
        expect(screen.getByLabelText('John Doe')).toHaveClass('custom-class');
    });

    it('generates consistent background colors for the same name', () => {
        const { rerender } = render(<Avatar name="John Doe" />);
        const firstColor = window.getComputedStyle(screen.getByLabelText('John Doe')).backgroundColor;

        rerender(<Avatar name="John Doe" />);
        const secondColor = window.getComputedStyle(screen.getByLabelText('John Doe')).backgroundColor;

        expect(firstColor).toBe(secondColor);
    });
});