'use client'

import { useState } from 'react';
import Header from './Header';
import { Sidebar } from './Sidebar';
import TasksProvider from '@/app/providers/TasksProvider';
import { useAuth } from '@/app/hooks/useAuth';

const DashboardShell = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { user, loading } = useAuth()

    if (loading) return (
        <div className="flex items-center justify-center h-screen bg-gray-950">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
    )
    return (
        <TasksProvider userId={user?.uid}>
            <div className='flex h-full bg-gray-950 overflow-hidden'>
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <div className='flex flex-col flex-1 overflow-hidden'>
                    <Header onMenuClick={() => setSidebarOpen(true)} />
                    <main className='flex-1 overflow-y-auto p-6'>
                        {children}
                    </main>
                </div>
            </div>
        </TasksProvider>
    );
};

export default DashboardShell;