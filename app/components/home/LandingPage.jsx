import Link from 'next/link';
import React from 'react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-950">

            {/* Navbar */}
            <nav className="border-b border-gray-800 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
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
                    <div className="flex items-center gap-3">
                        <Link
                            href="/login"
                            className="text-gray-400 hover:text-white text-sm transition"
                        >
                            Sign in
                        </Link>
                        <Link
                            href="/signup"
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="max-w-6xl mx-auto px-6 py-24 text-center">
                <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs px-3 py-1.5 rounded-full mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    Now available for free
                </div>
                <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                    Manage tasks with your
                    <span className="text-indigo-400"> team effortlessly</span>
                </h1>
                <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                    TaskFlow helps you organize, track, and complete your work with a beautiful Kanban board, real-time updates, and powerful task management tools.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <Link
                        href="/signup"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition"
                    >
                        Get Started for Free
                    </Link>
                    <Link
                        href="/login"
                        className="border border-gray-700 hover:bg-gray-800 text-gray-300 px-6 py-3 rounded-lg font-medium transition"
                    >
                        Sign In
                    </Link>
                </div>
            </section>

            {/* Features */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-white text-center mb-4">
                    Everything you need
                </h2>
                <p className="text-gray-400 text-center mb-12">
                    All the tools you need to manage your tasks effectively
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Feature 1 */}
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="5" height="18" />
                                <rect x="10" y="3" width="5" height="18" />
                                <rect x="17" y="3" width="5" height="18" />
                            </svg>
                        </div>
                        <h3 className="text-white font-semibold mb-2">Kanban Board</h3>
                        <p className="text-gray-400 text-sm">
                            Visualize your workflow with a drag and drop Kanban board. Move tasks between columns with ease.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 mb-4">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 11l3 3L22 4" />
                                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                            </svg>
                        </div>
                        <h3 className="text-white font-semibold mb-2">Task Management</h3>
                        <p className="text-gray-400 text-sm">
                            Create, organize and track tasks with priorities, descriptions and due dates all in one place.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 20V10M12 20V4M6 20v-6" />
                            </svg>
                        </div>
                        <h3 className="text-white font-semibold mb-2">Progress Tracking</h3>
                        <p className="text-gray-400 text-sm">
                            Monitor your progress with real time stats and a visual progress bar showing your completion rate.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <h3 className="text-white font-semibold mb-2">Secure Auth</h3>
                        <p className="text-gray-400 text-sm">
                            Sign in securely with email and password or Google. Your data is always safe and private.
                        </p>
                    </div>

                    {/* Feature 5 */}
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                        <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 mb-4">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                            </svg>
                        </div>
                        <h3 className="text-white font-semibold mb-2">Easy Settings</h3>
                        <p className="text-gray-400 text-sm">
                            Update your profile, change your password and manage your account settings with ease.
                        </p>
                    </div>

                    {/* Feature 6 */}
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                        <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 mb-4">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                            </svg>
                        </div>
                        <h3 className="text-white font-semibold mb-2">Real Time Updates</h3>
                        <p className="text-gray-400 text-sm">
                            All changes are saved instantly to the database. Your tasks are always up to date.
                        </p>
                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-12 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to get started?
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Join TaskFlow today and start managing your tasks like a pro.
                    </p>
                    <Link
                        href="/signup"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg font-medium transition inline-block"
                    >
                        Create Free Account
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-800 px-6 py-6">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                <rect x="2" y="2" width="5" height="5" rx="1" fill="white" />
                                <rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity="0.6" />
                                <rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity="0.6" />
                                <rect x="9" y="9" width="5" height="5" rx="1" fill="white" />
                            </svg>
                        </div>
                        <span className="text-gray-400 text-sm">TaskFlow</span>
                    </div>
                    <p className="text-gray-600 text-xs">
                        Built with Next.js, Firebase and MongoDB
                    </p>
                </div>
            </footer>

        </div>
    );
};

export default LandingPage;