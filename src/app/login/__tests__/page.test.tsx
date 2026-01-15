import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '@/app/login/page';
import { DataProvider } from '@/context/DataContext';

// Mock useRouter
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

describe('LoginPage', () => {
    it('renders login form', () => {
        render(
            <DataProvider>
                <LoginPage />
            </DataProvider>
        );

        expect(screen.getByLabelText(/الرقم الجامعي/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/كلمة المرور/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /دخول/i })).toBeInTheDocument();
    });

    it('updates input values', () => {
        render(
            <DataProvider>
                <LoginPage />
            </DataProvider>
        );

        const idInput = screen.getByLabelText(/الرقم الجامعي/i) as HTMLInputElement;
        const passwordInput = screen.getByLabelText(/كلمة المرور/i) as HTMLInputElement;

        fireEvent.change(idInput, { target: { value: '123' } });
        fireEvent.change(passwordInput, { target: { value: 'pass' } });

        expect(idInput.value).toBe('123');
        expect(passwordInput.value).toBe('pass');
    });
});
