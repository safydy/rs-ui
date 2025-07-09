import {render, screen} from '@testing-library/react';
import {Badge} from './Badge';
import { describe, it, expect, vi } from 'vitest';

describe('Badge Component', () => {
    it('renders correctly with default props', () => {
        render(<Badge>Test Badge</Badge>);
        expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('renders with the correct variant styles', () => {
        const {rerender} = render(<Badge variant="primary">Primary</Badge>);
        expect(screen.getByText('Primary')).toHaveClass('bg-blue-200');

        rerender(<Badge variant="success">Success</Badge>);
        expect(screen.getByText('Success')).toHaveClass('bg-green-200');

        rerender(<Badge variant="danger">Danger</Badge>);
        expect(screen.getByText('Danger')).toHaveClass('bg-red-200');

        rerender(<Badge variant="warning">Warning</Badge>);
        expect(screen.getByText('Warning')).toHaveClass('bg-yellow-200');

        rerender(<Badge variant="info">Info</Badge>);
        expect(screen.getByText('Info')).toHaveClass('bg-cyan-200');

        rerender(<Badge variant="secondary">Secondary</Badge>);
        expect(screen.getByText('Secondary')).toHaveClass('bg-gray-200');
    });

    it('applies pill styles when pill prop is true', () => {
        render(<Badge pill>Pill Badge</Badge>);
        expect(screen.getByText('Pill Badge')).toHaveClass('rounded-full');
    });

    it('applies rounded styles when pill prop is false', () => {
        render(<Badge pill={false}>Regular Badge</Badge>);
        expect(screen.getByText('Regular Badge')).toHaveClass('rounded');
    });

    it('renders different sizes correctly', () => {
        const {rerender} = render(<Badge size="sm">Small</Badge>);
        expect(screen.getByText('Small')).toHaveClass('text-xs');

        rerender(<Badge size="md">Medium</Badge>);
        expect(screen.getByText('Medium')).toHaveClass('text-xs');

        rerender(<Badge size="lg">Large</Badge>);
        expect(screen.getByText('Large')).toHaveClass('text-sm');
    });

    it('renders as a dot when dot prop is true', () => {
        render(<Badge dot/>);
        const badge = screen.getByTestId('badge');
        expect(badge).toHaveClass('flex-shrink-0');
        expect(badge.textContent).toBe('');
    });

    it('applies custom className', () => {
        render(<Badge className="custom-class">Custom Badge</Badge>);
        expect(screen.getByText('Custom Badge')).toHaveClass('custom-class');
    });

    it('does not render children when in dot mode', () => {
        render(<Badge dot>This should not be rendered</Badge>);
        expect(screen.queryByText('This should not be rendered')).not.toBeInTheDocument();
    });
});