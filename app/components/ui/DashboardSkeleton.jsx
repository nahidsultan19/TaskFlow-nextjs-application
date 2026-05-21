import React from 'react';
import Skeleton from './Skeleton';
import StatCardSkeleton from './StatCardSkeleton';

// Dashboard content skeleton
const DashboardSkeleton = () => {
    return (
        <div className="space-y-6">
            {/* Welcome */}
            <div className="space-y-2">
                <Skeleton className="h-7 w-64" />
                <Skeleton className="h-4 w-48" />
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
            </div>

            {/* Progress bar */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-3">
                <div className="flex justify-between">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
                <div className="flex justify-between">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-16" />
                </div>
            </div>

            {/* Quick actions */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <Skeleton className="h-4 w-32 mb-4" />
                <div className="grid grid-cols-2 gap-3">
                    <Skeleton className="h-16 rounded-lg" />
                    <Skeleton className="h-16 rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default DashboardSkeleton;