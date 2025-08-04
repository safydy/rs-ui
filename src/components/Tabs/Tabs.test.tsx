import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, Tab, TabPanel } from './Tabs';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('Tabs Component', () => {
    it('renders correctly with default props', () => {
        render(
            <Tabs>
                <Tab id="tab1" label="Tab 1" />
                <Tab id="tab2" label="Tab 2" />
                <TabPanel id="tab1">Content 1</TabPanel>
                <TabPanel id="tab2">Content 2</TabPanel>
            </Tabs>
        );

        expect(screen.getByText('Tab 1')).toBeInTheDocument();
        expect(screen.getByText('Tab 2')).toBeInTheDocument();
        expect(screen.getByText('Content 1')).toBeInTheDocument();
        expect(screen.getByText('Content 2').closest('div')).toHaveClass('hidden');
    });

    it('shows the first tab content by default', () => {
        render(
            <Tabs>
                <Tab id="tab1" label="Tab 1" />
                <Tab id="tab2" label="Tab 2" />
                <TabPanel id="tab1">Content 1</TabPanel>
                <TabPanel id="tab2">Content 2</TabPanel>
            </Tabs>
        );

        const tab1Panel = screen.getByText('Content 1');
        const tab2Panel = screen.getByText('Content 2').closest('div');

        expect(tab1Panel).toBeVisible();
        expect(tab2Panel).toHaveClass('hidden');
    });

    it('shows the tab content specified by defaultActiveTab', () => {
        render(
            <Tabs defaultActiveTab="tab2">
                <Tab id="tab1" label="Tab 1" />
                <Tab id="tab2" label="Tab 2" />
                <TabPanel id="tab1">Content 1</TabPanel>
                <TabPanel id="tab2">Content 2</TabPanel>
            </Tabs>
        );

        const tab1Panel = screen.getByText('Content 1').closest('div');
        const tab2Panel = screen.getByText('Content 2');

        expect(tab1Panel).toHaveClass('hidden');
        expect(tab2Panel).toBeVisible();
    });

    it('switches tab content when tab is clicked', async () => {
        render(
            <Tabs>
                <Tab id="tab1" label="Tab 1" />
                <Tab id="tab2" label="Tab 2" />
                <TabPanel id="tab1">Content 1</TabPanel>
                <TabPanel id="tab2">Content 2</TabPanel>
            </Tabs>
        );

        const tab2Button = screen.getByText('Tab 2');
        await userEvent.click(tab2Button);

        const tab1Panel = screen.getByText('Content 1').closest('div');
        const tab2Panel = screen.getByText('Content 2');

        expect(tab1Panel).toHaveClass('hidden');
        expect(tab2Panel).toBeVisible();
    });

    it('calls onChange when tab is changed', async () => {
        const handleChange = vi.fn();

        render(
            <Tabs onChange={handleChange}>
                <Tab id="tab1" label="Tab 1" />
                <Tab id="tab2" label="Tab 2" />
                <TabPanel id="tab1">Content 1</TabPanel>
                <TabPanel id="tab2">Content 2</TabPanel>
            </Tabs>
        );

        const tab2Button = screen.getByText('Tab 2');
        await userEvent.click(tab2Button);

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith('tab2');
    });

    it('respects the controlled activeTab prop', async () => {
        const handleChange = vi.fn();

        render(
            <Tabs activeTab="tab1" onChange={handleChange}>
                <Tab id="tab1" label="Tab 1" />
                <Tab id="tab2" label="Tab 2" />
                <TabPanel id="tab1">Content 1</TabPanel>
                <TabPanel id="tab2">Content 2</TabPanel>
            </Tabs>
        );

        const tab2Button = screen.getByText('Tab 2');
        await userEvent.click(tab2Button);

        // The content should not change because we're in controlled mode
        const tab1Panel = screen.getByText('Content 1');
        expect(tab1Panel).toBeVisible();

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith('tab2');
    });

    it('applies the correct variant styles', () => {
        render(
            <Tabs variant="success" defaultActiveTab="tab1">
                <Tab id="tab1" label="Tab 1" />
                <Tab id="tab2" label="Tab 2" />
                <TabPanel id="tab1">Content 1</TabPanel>
                <TabPanel id="tab2">Content 2</TabPanel>
            </Tabs>
        );

        const tab1Button = screen.getByRole('tab', { name: 'Tab 1' });
        expect(tab1Button).toHaveClass('text-green-600');
        expect(tab1Button).toHaveClass('border-green-600');
    });

    it('disables tab interaction when tab is disabled', async () => {
        render(
            <Tabs>
                <Tab id="tab1" label="Tab 1" />
                <Tab id="tab2" label="Tab 2" disabled />
                <TabPanel id="tab1">Content 1</TabPanel>
                <TabPanel id="tab2">Content 2</TabPanel>
            </Tabs>
        );

        const tab2Button = screen.getByRole('tab', { name: 'Tab 2' });
        await userEvent.click(tab2Button);

        // Content should not change
        const tab1Panel = screen.getByText('Content 1');
        expect(tab1Panel).toBeVisible();

        expect(tab2Button).toBeDisabled();
        expect(tab2Button).toHaveClass('opacity-50');
        expect(tab2Button).toHaveClass('cursor-not-allowed');
    });

    it('renders icons in tabs', () => {
        render(
            <Tabs>
                <Tab
                    id="tab1"
                    label="Tab 1"
                    icon={<span data-testid="tab-icon">Icon</span>}
                />
                <TabPanel id="tab1">Content 1</TabPanel>
            </Tabs>
        );

        expect(screen.getByTestId('tab-icon')).toBeInTheDocument();
    });

    it('aligns tabs correctly with align prop', () => {
        const { rerender } = render(
            <Tabs align="start">
                <Tab id="tab1" label="Tab 1" />
                <Tab id="tab2" label="Tab 2" />
                <TabPanel id="tab1">Content 1</TabPanel>
                <TabPanel id="tab2">Content 2</TabPanel>
            </Tabs>
        );

        let tabList = screen.getByRole('tablist').firstChild;
        expect(tabList).toHaveClass('justify-start');

        rerender(
            <Tabs align="center">
                <Tab id="tab1" label="Tab 1" />
                <Tab id="tab2" label="Tab 2" />
                <TabPanel id="tab1">Content 1</TabPanel>
                <TabPanel id="tab2">Content 2</TabPanel>
            </Tabs>
        );

        tabList = screen.getByRole('tablist').firstChild;
        expect(tabList).toHaveClass('justify-center');

        rerender(
            <Tabs align="end">
                <Tab id="tab1" label="Tab 1" />
                <Tab id="tab2" label="Tab 2" />
                <TabPanel id="tab1">Content 1</TabPanel>
                <TabPanel id="tab2">Content 2</TabPanel>
            </Tabs>
        );

        tabList = screen.getByRole('tablist').firstChild;
        expect(tabList).toHaveClass('justify-end');
    });

    it('applies fullWidth style when fullWidth is true', () => {
        render(
            <Tabs fullWidth>
                <Tab id="tab1" label="Tab 1" />
                <Tab id="tab2" label="Tab 2" />
                <TabPanel id="tab1">Content 1</TabPanel>
                <TabPanel id="tab2">Content 2</TabPanel>
            </Tabs>
        );

        const tab1Button = screen.getByRole('tab', { name: 'Tab 1' });
        console.log('Tab button classes:', tab1Button.className);
        expect(tab1Button).toHaveClass('flex-1');
    });

    it('hides divider when divider is false', () => {
        const { rerender } = render(
            <Tabs divider={true}>
                <Tab id="tab1" label="Tab 1" />
                <TabPanel id="tab1">Content 1</TabPanel>
            </Tabs>
        );

        let tabList = screen.getByRole('tablist').firstChild;
        expect(tabList).toHaveClass('border-b');

        rerender(
            <Tabs divider={false}>
                <Tab id="tab1" label="Tab 1" />
                <TabPanel id="tab1">Content 1</TabPanel>
            </Tabs>
        );

        tabList = screen.getByRole('tablist').firstChild;
        expect(tabList).not.toHaveClass('border-b');
    });

    it('renders badge content when provided', () => {
        render(
            <Tabs>
                <Tab
                    id="tab1"
                    label="Tab 1"
                    badge={<span data-testid="badge">5</span>}
                />
                <TabPanel id="tab1">Content 1</TabPanel>
            </Tabs>
        );

        expect(screen.getByTestId('badge')).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
        render(
            <Tabs>
                <Tab id="tab1" label="Tab 1" />
                <Tab id="tab2" label="Tab 2" />
                <TabPanel id="tab1">Content 1</TabPanel>
                <TabPanel id="tab2">Content 2</TabPanel>
            </Tabs>
        );

        const tab2Button = screen.getByText('Tab 2');

        // Focus on the tab button
        tab2Button.focus();

        // Press Enter key
        fireEvent.keyDown(tab2Button, { key: 'Enter' });

        const tab2Panel = screen.getByText('Content 2');
        expect(tab2Panel).toBeVisible();

        // Test with Space key on first tab
        const tab1Button = screen.getByText('Tab 1');
        tab1Button.focus();
        fireEvent.keyDown(tab1Button, { key: ' ' });

        const tab1Panel = screen.getByText('Content 1');
        expect(tab1Panel).toBeVisible();
    });

    it('sets proper ARIA attributes', () => {
        render(
            <Tabs defaultActiveTab="tab1">
                <Tab id="tab1" label="Tab 1" />
                <Tab id="tab2" label="Tab 2" />
                <TabPanel id="tab1">Content 1</TabPanel>
                <TabPanel id="tab2">Content 2</TabPanel>
            </Tabs>
        );

        const tabList = screen.getByRole('tablist');
        expect(tabList).toHaveAttribute('aria-orientation', 'horizontal');

        const tab1Button = screen.getByRole('tab', { name: 'Tab 1' });
        expect(tab1Button).toHaveAttribute('role', 'tab');
        expect(tab1Button).toHaveAttribute('id', 'tab-tab1');
        expect(tab1Button).toHaveAttribute('aria-controls', 'tabpanel-tab1');
        expect(tab1Button).toHaveAttribute('aria-selected', 'true');

        const tab2Button = screen.getByRole('tab', { name: 'Tab 2' });
        expect(tab2Button).toHaveAttribute('aria-selected', 'false');

        const tabPanel = screen.getByRole('tabpanel', { name: 'Tab 1' });
        expect(tabPanel).toHaveAttribute('id', 'tabpanel-tab1');
        expect(tabPanel).toHaveAttribute('aria-labelledby', 'tab-tab1');
    });
});