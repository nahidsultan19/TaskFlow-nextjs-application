"use client"

import { useAuth } from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthGurad = ({ children }) => {

    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [user, loading])

    if (loading) return (
        <div className="flex items-center justify-center h-screen bg-gray-950">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
    )

    if (!user) return null

    return children
};

export default AuthGurad;