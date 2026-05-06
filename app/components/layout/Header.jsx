
"use client";

import { useAuth } from "@/app/hooks/useAuth";
import Image from "next/image";
import { usePathname } from "next/navigation";

const pageTitles = {
    '/dashboard': 'Dashboard',
    '/board': 'Board',
    '/tasks': 'Tasks',
    '/members': 'Members',
    '/settings': 'Settings',
}


const Header = ({ onMenuClick }) => {
    const pathname = usePathname()
    const { user } = useAuth()
    const title = pageTitles[pathname] || "TaskFlow"

    return (
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 flex-shrink-0">
            <div className="flex items-center gap-3">
                {/* Hamburger menu — mobile only */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden text-gray-400 hover:text-white transition"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
                <h1 className="text-white font-semibold text-lg">{title}</h1>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
                <button className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 01-3.46 0" />
                    </svg>
                </button>
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-medium overflow-hidden">
                    {user?.photoURL ? (
                        <Image
                            src={user.photoURL}
                            alt="avatar"
                            width={32}
                            height={32}
                            className="rounded-full object-cover"
                        />
                    ) : (
                        user?.displayName?.[0]?.toUpperCase() || 'U'
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;