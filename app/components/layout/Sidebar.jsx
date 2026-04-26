'use client'

import { useAuth } from '@/app/hooks/useAuth'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const navItems = [
    {
        label: 'Dashboard',
        href: '/dashboard',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
        ),
    },
    {
        label: 'Board',
        href: '/board',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="5" height="18" /><rect x="10" y="3" width="5" height="18" />
                <rect x="17" y="3" width="5" height="18" />
            </svg>
        ),
    },
    {
        label: 'Tasks',
        href: '/tasks',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
        ),
    },
    {
        label: 'Members',
        href: '/members',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
        ),
    },
    {
        label: 'Settings',
        href: '/settings',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
        ),
    },
]

export function Sidebar() {
    const pathname = usePathname()
    const { user, logout } = useAuth()

    const getInitials = (name) => {
        if (!name) return 'U'
        return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    }

    return (
        <div className="w-60 h-screen bg-gray-900 border-r border-gray-800 flex flex-col">

            {/* Logo */}
            <div className="p-5 border-b border-gray-800">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <rect x="2" y="2" width="5" height="5" rx="1" fill="white" />
                            <rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity="0.6" />
                            <rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity="0.6" />
                            <rect x="9" y="9" width="5" height="5" rx="1" fill="white" />
                        </svg>
                    </div>
                    <span className="text-white font-semibold text-base">TaskFlow</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${isActive
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            {/* User section */}
            <div className="p-3 border-t border-gray-800">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-800 transition cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-medium overflow-hidden flex-shrink-0">
                        {user?.photoURL ? (
                            <Image
                                src={user.photoURL}
                                alt="avatar"
                                width={32}
                                height={32}
                                className="rounded-full object-cover"
                            />
                        ) : (
                            <span>{getInitials(user?.displayName || user?.email)}</span>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-medium truncate">
                            {user?.displayName || 'User'}
                        </p>
                        <p className="text-gray-500 text-xs truncate">{user?.email}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="text-gray-500 hover:text-red-400 transition"
                        title="Logout"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                    </button>
                </div>
            </div>

        </div>
    )
}