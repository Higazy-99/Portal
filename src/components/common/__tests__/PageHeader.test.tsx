import React from 'react';
import { render, screen } from '@testing-library/react';
import PageHeader from '@/components/common/PageHeader';

describe('PageHeader', () => {
    it('renders title and description', () => {
        render(
            <PageHeader
                title="Dashboard"
                description="Overview"
                breadcrumbs={[]}
            />
        );
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Overview')).toBeInTheDocument();
    });

    it('renders breadcrumbs correctly', () => {
        render(
            <PageHeader
                title="Test"
                description="Desc"
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Current', href: '/curr' }]}
            />
        );
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Current')).toBeInTheDocument();
    });

    it('renders actions when provided', () => {
        render(
            <PageHeader
                title="Test"
                description="Desc"
                breadcrumbs={[]}
                actions={<button>Action Button</button>}
            />
        );
        expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument();
    });
});
