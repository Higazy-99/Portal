import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '@/components/common/Card';

describe('Card', () => {
    it('renders children correctly', () => {
        render(
            <Card>
                <div>Test Content</div>
            </Card>
        );
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('applies padding by default', () => {
        const { container } = render(<Card>Content</Card>);
        // p-5 is the tailwind class for padding: 1.25rem
        expect(container.firstChild).toHaveClass('p-5');
    });

    it('removes padding when noPadding is true', () => {
        const { container } = render(<Card noPadding>Content</Card>);
        expect(container.firstChild).not.toHaveClass('p-5');
    });

    it('applies custom className', () => {
        const { container } = render(
            <Card className="custom-class">Content</Card>
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });
});
