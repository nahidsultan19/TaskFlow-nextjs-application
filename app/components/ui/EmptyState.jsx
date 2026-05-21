import React from 'react';

const EmptyState = ({ type = 'tasks', onClearSearch, onActionModal, actionLabel }) => {
    const states = {
        tasks: {
            illustration: (
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                    <circle cx="60" cy="60" r="50" fill="#1f2937" />
                    <rect x="35" y="35" width="50" height="8" rx="4" fill="#374151" />
                    <rect x="35" y="50" width="35" height="8" rx="4" fill="#374151" />
                    <rect x="35" y="65" width="42" height="8" rx="4" fill="#374151" />
                    <circle cx="80" cy="80" r="18" fill="#4f46e5" />
                    <path d="M74 80h12M80 74v12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
            ),
            title: 'No tasks yet',
            description: 'Create your first task to get started',
        },
        search: {
            illustration: (
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                    <circle cx="60" cy="60" r="50" fill="#1f2937" />
                    <circle cx="52" cy="52" r="20" stroke="#374151" strokeWidth="6" />
                    <path d="M66 66l14 14" stroke="#374151" strokeWidth="6" strokeLinecap="round" />
                    <path d="M46 52h12M52 46v12" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />
                </svg>
            ),
            title: 'No results found',
            description: 'Try different keywords or clear your search',
        },
        board: {
            illustration: (
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                    <circle cx="60" cy="60" r="50" fill="#1f2937" />
                    <rect x="28" y="35" width="18" height="50" rx="4" fill="#374151" />
                    <rect x="51" y="35" width="18" height="50" rx="4" fill="#374151" />
                    <rect x="74" y="35" width="18" height="50" rx="4" fill="#374151" />
                    <rect x="30" y="38" width="14" height="10" rx="2" fill="#4f46e5" />
                    <rect x="53" y="38" width="14" height="10" rx="2" fill="#4f46e5" />
                    <rect x="76" y="38" width="14" height="10" rx="2" fill="#4f46e5" />
                </svg>
            ),
            title: 'No tasks on the board',
            description: 'Add your first task to get started',
        },
        members: {
            illustration: (
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                    <circle cx="60" cy="60" r="50" fill="#1f2937" />
                    <circle cx="50" cy="48" r="14" fill="#374151" />
                    <path d="M22 88c0-15.464 12.536-28 28-28s28 12.536 28 28" stroke="#374151" strokeWidth="6" strokeLinecap="round" />
                    <circle cx="82" cy="52" r="10" fill="#4f46e5" />
                    <path d="M76 52h12M82 46v12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: 'No members yet',
            description: 'Invite your team members to collaborate',
        },
    }

    const state = states[type] || states.tasks

    return (
        <div className='flex flex-col items-center justify-center py-16 px-4'>
            <div onClick={onActionModal} className="mb-4 opacity-80">
                {/* Illustration — clickable if onAction provided */}
                {onActionModal && type !== 'search' ? (
                    <button
                        className="mb-4 opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-200 cursor-pointer"
                        title={actionLabel || 'Create Task'}
                    >
                        {state.illustration}
                    </button>
                ) : (
                    <div className="mb-4 opacity-80">
                        {state.illustration}
                    </div>
                )}

            </div>
            <h3 className="text-white font-medium text-base mb-1">
                {state.title}
            </h3>
            <p className="text-gray-400 text-sm text-center max-w-xs">{state.description}</p>

            {/* show clear button for search type  */}
            {type === 'search' && onClearSearch && (
                <button
                    onClick={onClearSearch}
                    className="mt-4 text-indigo-400 hover:text-indigo-300 text-sm transition"
                >
                    Clear search
                </button>
            )}
        </div>
    );
};

export default EmptyState;