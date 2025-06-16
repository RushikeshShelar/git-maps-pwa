'use client';

import { useState, useEffect, use } from 'react';
import { User } from 'firebase/auth';
import { onAuthChange } from '@/lib/auth';
import { unsubscribe } from 'diagnostics_channel';


export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthChange((firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { user, loading };
}