'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/context/AuthContext';
import { Provider } from 'react-redux';
import { store, persistor } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}
