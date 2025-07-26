import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, AccordionItem } from './Accordion';
import { describe, it, expect, vi } from 'vitest';

describe('Accordion Component', () => {
    it('renders correctly with default props', () => {
        render(
            <Accordion>
                <AccordionItem id="item1" title="Item 1">
                    Content 1
                </AccordionItem>
                <AccordionItem id="item2" title="Item 2">
                    Content 2
                </AccordionItem>
            </Accordion>
        );

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();

        // Content should not be visible initially
        expect(screen.getByText('Content 1').parentElement).toHaveClass('max-h-0');
        expect(screen.getByText('Content 2').parentElement).toHaveClass('max-h-0');
    });

    it('expands item when header is clicked', async () => {
        render(
            <Accordion>
                <AccordionItem id="item1" title="Item 1">
                    Content 1
                </AccordionItem>
            </Accordion>
        );

        const header = screen.getByText('Item 1');
        await userEvent.click(header);

        // Content should now be visible
        expect(screen.getByText('Content 1').parentElement).toHaveClass('max-h-[1000px]');
    });

    it('collapses item when clicked again', async () => {
        render(
            <Accordion>
                <AccordionItem id="item1" title="Item 1">
                    Content 1
                </AccordionItem>
            </Accordion>
        );

        const header = screen.getByText('Item 1');
        await userEvent.click(header); // expand
        await userEvent.click(header); // collapse

        // Content should be hidden again
        expect(screen.getByText('Content 1').parentElement).toHaveClass('max-h-0');
    });

    it('allows only one item to be expanded at a time by default', async () => {
        render(
            <Accordion>
                <AccordionItem id="item1" title="Item 1">
                    Content 1
                </AccordionItem>
                <AccordionItem id="item2" title="Item 2">
                    Content 2
                </AccordionItem>
            </Accordion>
        );

        const header1 = screen.getByText('Item 1');
        const header2 = screen.getByText('Item 2');

        await userEvent.click(header1);
        expect(screen.getByText('Content 1').parentElement).toHaveClass('max-h-[1000px]');

        await userEvent.click(header2);
        expect(screen.getByText('Content 2').parentElement).toHaveClass('max-h-[1000px]');
        expect(screen.getByText('Content 1').parentElement).toHaveClass('max-h-0'); // first item collapsed
    });

    it('allows multiple items to be expanded when allowMultiple is true', async () => {
        render(
            <Accordion allowMultiple>
                <AccordionItem id="item1" title="Item 1">
                    Content 1
                </AccordionItem>
                <AccordionItem id="item2" title="Item 2">
                    Content 2
                </AccordionItem>
            </Accordion>
        );

        const header1 = screen.getByText('Item 1');
        const header2 = screen.getByText('Item 2');

        await userEvent.click(header1);
        await userEvent.click(header2);

        // Both contents should be visible
        expect(screen.getByText('Content 1').parentElement).toHaveClass('max-h-[1000px]');
        expect(screen.getByText('Content 2').parentElement).toHaveClass('max-h-[1000px]');
    });

    it('respects defaultExpanded prop', () => {
        render(
            <Accordion defaultExpanded={['item2']}>
                <AccordionItem id="item1" title="Item 1">
                    Content 1
                </AccordionItem>
                <AccordionItem id="item2" title="Item 2">
                    Content 2
                </AccordionItem>
            </Accordion>
        );

        // Item 2 should be expanded by default
        expect(screen.getByText('Content 1').parentElement).toHaveClass('max-h-0');
        expect(screen.getByText('Content 2').parentElement).toHaveClass('max-h-[1000px]');
    });

    it('respects disabled state of items', async () => {
        render(
            <Accordion>
                <AccordionItem id="item1" title="Item 1" disabled>
                    Content 1
                </AccordionItem>
            </Accordion>
        );

        const header = screen.getByText('Item 1');
        await userEvent.click(header);

        // Content should remain hidden
        expect(screen.getByText('Content 1').parentElement).toHaveClass('max-h-0');
    });

    it('renders items with icons', () => {
        render(
            <Accordion>
                <AccordionItem
                    id="item1"
                    title="Item with Icon"
                    icon={<span data-testid="test-icon">🔍</span>}
                >
                    Content
                </AccordionItem>
            </Accordion>
        );

        expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('applies appropriate ARIA attributes', () => {
        render(
            <Accordion>
                <AccordionItem id="test-item" title="Test Item">
                    Content
                </AccordionItem>
            </Accordion>
        );

        const button = screen.getByRole('button');
        const region = screen.getByRole('region');

        expect(button).toHaveAttribute('id', 'accordion-header-test-item');
        expect(button).toHaveAttribute('aria-expanded', 'false');
        expect(button).toHaveAttribute('aria-controls', 'accordion-panel-test-item');

        expect(region).toHaveAttribute('id', 'accordion-panel-test-item');
        expect(region).toHaveAttribute('aria-labelledby', 'accordion-header-test-item');
    });

    it('supports keyboard navigation', async () => {
        render(
            <Accordion>
                <AccordionItem id="test-item" title="Test Item">
                    Content
                </AccordionItem>
            </Accordion>
        );

        const button = screen.getByRole('button');

        // Focus the button
        button.focus();

        // Press Enter key
        fireEvent.keyDown(button, { key: 'Enter' });
        expect(screen.getByText('Content').parentElement).toHaveClass('max-h-[1000px]');

        // Press Space key
        fireEvent.keyDown(button, { key: ' ' });
        expect(screen.getByText('Content').parentElement).toHaveClass('max-h-0');
    });

    it('applies variant styles correctly', () => {
        render(
            <Accordion variant="success">
                <AccordionItem id="item1" title="Item 1">
                    Content 1
                </AccordionItem>
            </Accordion>
        );

        // Click to expand
        const button = screen.getByRole('button');
        fireEvent.click(button);

        // Check if success styles are applied when expanded
        expect(button).toHaveClass('bg-green-50');
    });

    it('calls onChange callback when item is toggled', async () => {
        const handleChange = vi.fn();

        render(
            <Accordion onChange={handleChange}>
                <AccordionItem id="item1" title="Item 1">
                    Content 1
                </AccordionItem>
            </Accordion>
        );

        const header = screen.getByText('Item 1');
        await userEvent.click(header);

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(['item1']);

        await userEvent.click(header); // collapse
        expect(handleChange).toHaveBeenCalledTimes(2);
        expect(handleChange).toHaveBeenCalledWith([]);
    });
});