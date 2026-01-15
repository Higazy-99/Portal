import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusBadge from '@/components/common/StatusBadge';

describe('StatusBadge', () => {
    it('renders label correctly', () => {
        render(<StatusBadge label="Pending" />);
        expect(screen.getByText('Pending')).toBeInTheDocument();
    });

    it('renders dot when showDot is true', () => {
        const { container } = render(<StatusBadge label="Active" showDot />);
        // search for the dot element
        const dot = container.querySelector('.rounded-full.w-1\\.5');
        expect(dot).toBeInTheDocument();
    });

    it('renders specific variant classes', () => {
        const { container } = render(
            <StatusBadge label="Success" variant="success" />
        );
        expect(container.firstChild).toHaveClass('bg-green-50');
    });

    it('renders icon when provided', () => {
        render(<StatusBadge label="Info" icon="info" />);
        expect(screen.getByText('info')).toBeInTheDocument();
    });
});
