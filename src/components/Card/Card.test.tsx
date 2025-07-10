import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card Component', () => {
    it('renders correctly with default props', () => {
        render(<Card>Card Content</Card>);
        expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('renders with the correct variant styles', () => {
        const { rerender } = render(<Card variant="primary">Primary Card</Card>);
        expect(screen.getByTestId('primary-card')).toHaveClass('bg-blue-50');

        rerender(<Card variant="success">Success Card</Card>);
        expect(screen.getByTestId('success-card')).toHaveClass('bg-green-50');

        rerender(<Card variant="danger">Danger Card</Card>);
        expect(screen.getByTestId('danger-card')).toHaveClass('bg-red-50');
    });

    it('renders with different shadow styles', () => {
        const { rerender } = render(<Card shadow="none">No Shadow</Card>);
        expect(screen.getByText('No Shadow').closest('div')).not.toHaveClass('shadow');

        rerender(<Card shadow="md" variant="primary">Medium Shadow</Card>);
        expect(screen.getByTestId('primary-card')).toHaveClass('shadow');

        rerender(<Card shadow="lg" variant="primary">Large Shadow</Card>);
        expect(screen.getByTestId('primary-card')).toHaveClass('shadow-lg');
    });

    it('renders with border when bordered is true', () => {
        render(<Card variant="primary" bordered>Bordered Card</Card>);
        expect(screen.getByTestId('primary-card')).toHaveClass('border');
    });

    it('renders without border when bordered is false', () => {
        render(<Card bordered={false}>No Border Card</Card>);
        const cardElement = screen.getByText('No Border Card').closest('div');
        expect(cardElement).not.toHaveClass('border');
    });

    it('renders with header when provided', () => {
        render(
            <Card header={<h2 data-testid="header">Card Header</h2>}>Card Content</Card>
        );
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('renders with footer when provided', () => {
        render(
            <Card footer={<div data-testid="footer">Card Footer</div>}>Card Content</Card>
        );
        expect(screen.getByTestId('footer')).toBeInTheDocument();
        expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('renders with image when imgSrc is provided', () => {
        render(
            <Card imgSrc="test-image.jpg" imgAlt="Test image">Card with Image</Card>
        );
        expect(screen.getByAltText('Test image')).toBeInTheDocument();
    });

    it('applies horizontal layout when horizontal is true', () => {
        render(<Card horizontal variant="primary">Horizontal Card</Card>);
        expect(screen.getByTestId('primary-card')).toHaveClass('flex flex-row');
    });

    it('applies interactive styles when interactive is true', () => {
        render(<Card interactive variant="primary">Interactive Card</Card>);
        expect(screen.getByTestId('primary-card')).toHaveClass('cursor-pointer');
    });

    it('renders with title and subtitle', () => {
        render(
            <Card title="Card Title" subtitle="Card Subtitle">
                Card Content
            </Card>
        );
        expect(screen.getByText('Card Title')).toBeInTheDocument();
        expect(screen.getByText('Card Subtitle')).toBeInTheDocument();
        expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('renders with custom element type', () => {
        render(
            <Card as="article" variant="primary">
                Article Card
            </Card>
        );
        expect(screen.getByTestId('primary-card').tagName).toBe('ARTICLE');
    });
});