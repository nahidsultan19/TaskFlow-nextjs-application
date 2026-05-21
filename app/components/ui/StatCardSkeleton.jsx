import React from 'react';
import Skeleton from './Skeleton';

// Dashboard stat card skeleton
const StatCardSkeleton = () => {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="w-9 h-9 rounded-lg" />
            </div>
            <Skeleton className="h-8 w-16" />
        </div>
    );
};

export default StatCardSkeleton;