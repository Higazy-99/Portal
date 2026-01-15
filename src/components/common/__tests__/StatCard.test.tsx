import React from 'react';
import { render, screen } from '@testing-library/react';
import StatCard from '@/components/common/StatCard';

describe('StatCard', () => {
    it('renders title and value correctly', () => {
        render(<StatCard title="Test Title" value="123" icon="school" />);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('123')).toBeInTheDocument();
    });

    it('renders subValue when provided', () => {
        render(<StatCard title="Test" value="10" subValue="/ 20" icon="school" />);
        expect(screen.getByText('/ 20')).toBeInTheDocument();
    });

    it('renders trend information correctly', () => {
        render(
            <StatCard
                title="Test"
                value="10"
                icon="school"
                trend={{ value: '10%', label: 'increase', icon: 'trending_up' }}
            />
        );
        expect(screen.getByText('10%')).toBeInTheDocument();
        expect(screen.getByText('increase')).toBeInTheDocument();
        expect(screen.getByText('trending_up')).toBeInTheDocument();
    });
});
