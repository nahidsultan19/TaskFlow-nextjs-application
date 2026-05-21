import React from 'react';
import Skeleton from './Skeleton';

// Members skeleton
const MembersSkeleton = () => {
    return (
        <div className="space-y-6 max-w-3xl">
            <div className="space-y-2">
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-4 w-48" />
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
                <Skeleton className="h-4 w-32" />
                <div className="flex gap-3">
                    <Skeleton className="h-10 flex-1 rounded-lg" />
                    <Skeleton className="h-10 w-28 rounded-lg" />
                </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-800">
                    <Skeleton className="h-4 w-32" />
                </div>
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between px-6 py-4 border-b border-gray-800 last:border-0">
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-9 h-9 rounded-full" />
                            <div className="space-y-1.5">
                                <Skeleton className="h-3.5 w-32" />
                                <Skeleton className="h-3 w-48" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-16 rounded-full" />
                            <Skeleton className="h-5 w-16 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MembersSkeleton;