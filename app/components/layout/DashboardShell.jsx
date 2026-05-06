'use client'

import { useState } from 'react';
import Header from './Header';
import { Sidebar } from './Sidebar';

const DashboardShell = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <div className='flex h-full bg-gray-950 overflow-hidden'>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className='flex flex-col flex-1 overflow-hidden'>
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <main className='flex-1 overflow-y-auto p-6'>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardShell;