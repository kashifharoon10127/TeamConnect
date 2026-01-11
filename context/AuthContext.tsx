'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';
import { ref, set } from 'firebase/database';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser as setReduxUser } from '@/store/slices/authSlice';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);

            if (user) {
                const userData = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    lastSeen: Date.now()
                };

                dispatch(setReduxUser(userData));

                // Save user profile to database
                const userRef = ref(db, `users/${user.uid}`);
                set(userRef, userData);
            } else {
                dispatch(setReduxUser(null));
            }

            if (!user && window.location.pathname !== '/signup') {
                
            }
        });

        return () => unsubscribe();
    }, [router, dispatch]);

    const signOut = async () => {
        await firebaseSignOut(auth);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, signOut }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}
