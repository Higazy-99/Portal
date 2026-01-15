import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataProvider, useData } from '@/context/DataContext';
import userEvent from '@testing-library/user-event';

// Helper component to consume context
const TestComponent = () => {
    const { isAuthenticated, login, logout, user } = useData();

    return (
        <div>
            <div data-testid="auth-status">
                {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
            </div>
            <div data-testid="user-name">{user?.name}</div>
            <button onClick={() => login('202503410', 'password')}>Login Success</button>
            <button onClick={() => login('wrong', 'password')}>Login Fail</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

// Mock useRouter
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

describe('DataContext', () => {
    it('provides default unauthenticated state', () => {
        render(
            <DataProvider>
                <TestComponent />
            </DataProvider>
        );
        expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
    });

    it('allows login with correct credentials', async () => {
        const user = userEvent.setup();
        render(
            <DataProvider>
                <TestComponent />
            </DataProvider>
        );

        const loginButton = screen.getByText('Login Success');
        await user.click(loginButton);

        expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
    });

    it('prevents login with incorrect credentials', async () => {
        const user = userEvent.setup();
        render(
            <DataProvider>
                <TestComponent />
            </DataProvider>
        );

        const loginFailButton = screen.getByText('Login Fail');
        await user.click(loginFailButton);

        expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
    });

    it('allows logout', async () => {
        const user = userEvent.setup();
        render(
            <DataProvider>
                <TestComponent />
            </DataProvider>
        );

        // Login first
        await user.click(screen.getByText('Login Success'));
        expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');

        // Then logout
        await user.click(screen.getByText('Logout'));
        expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
    });
});
