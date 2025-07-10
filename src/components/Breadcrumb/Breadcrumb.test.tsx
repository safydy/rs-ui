import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb Component', () => {
    it('renders correctly with default props', () => {
        render(
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/products' },
                    { label: 'Item', active: true },
                ]}
            />
        );

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Products')).toBeInTheDocument();
        expect(screen.getByText('Item')).toBeInTheDocument();

        // Check for nav and ol elements
        expect(screen.getByRole('navigation')).toBeInTheDocument();
        expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('renders links for non-active items and text for active items', () => {
        render(
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/products' },
                    { label: 'Item', active: true },
                ]}
            />
        );

        expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
        expect(screen.getByText('Products').closest('a')).toHaveAttribute('href', '/products');
        expect(screen.getByText('Item').closest('a')).toBeNull();
        expect(screen.getByText('Item').closest('span')).toBeInTheDocument();
    });

    it('applies aria-current="page" to active item', () => {
        render(
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Item', active: true },
                ]}
            />
        );

        expect(screen.getByText('Item').closest('span')).toHaveAttribute('aria-current', 'page');
    });

    it('handles custom separators', () => {
        const { rerender } = render(
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Item', active: true },
                ]}
                separator="slash"
            />
        );

        expect(screen.getByText('/')).toBeInTheDocument();

        rerender(
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Item', active: true },
                ]}
                separator="custom"
                customSeparator={<span data-testid="custom-separator">-</span>}
            />
        );

        expect(screen.getByTestId('custom-separator')).toBeInTheDocument();
    });

    it('applies the correct size classes', () => {
        const { rerender } = render(
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Item', active: true },
                ]}
                size="sm"
            />
        );

        expect(screen.getByRole('list')).toHaveClass('text-xs');

        rerender(
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Item', active: true },
                ]}
                size="md"
            />
        );

        expect(screen.getByRole('list')).toHaveClass('text-sm');

        rerender(
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Item', active: true },
                ]}
                size="lg"
            />
        );

        expect(screen.getByRole('list')).toHaveClass('text-base');
    });

    it('applies the correct variant styles to active item', () => {
        const { rerender } = render(
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Item', active: true },
                ]}
                variant="primary"
            />
        );

        expect(screen.getByText('Item').closest('span')).toHaveClass('text-blue-700');

        rerender(
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Item', active: true },
                ]}
                variant="success"
            />
        );

        expect(screen.getByText('Item').closest('span')).toHaveClass('text-green-700');
    });

    it('shows home icon when showHomeIcon is true', () => {
        render(
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Item', active: true },
                ]}
                showHomeIcon
            />
        );

        expect(screen.getByText('Home').closest('a')?.querySelector('svg')).toBeInTheDocument();
    });

    it('handles click events on breadcrumb items', async () => {
        const handleClick = vi.fn();

        render(
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/', onClick: handleClick },
                    { label: 'Item', active: true },
                ]}
            />
        );

        await userEvent.click(screen.getByText('Home'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders custom icons for items', () => {
        render(
            <Breadcrumb
                items={[
                    {
                        label: 'Home',
                        href: '/',
                        icon: <span data-testid="home-icon">🏠</span>
                    },
                    { label: 'Item', active: true },
                ]}
            />
        );

        expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('renders custom class name', () => {
        render(
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Item', active: true },
                ]}
                className="custom-class"
            />
        );

        expect(screen.getByRole('navigation')).toHaveClass('custom-class');
    });
});