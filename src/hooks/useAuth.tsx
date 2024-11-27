"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/signin');
        }
    }, [user, router]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default AuthWrapper;
