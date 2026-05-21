import React from 'react';
import Skeleton from './Skeleton';

const TaskRowSkeleton = () => {
    return (
        <div className="px-6 py-4 border-b border-gray-800">
            {/* Mobile */}
            <div className="md:hidden space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <div className="flex gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                </div>
            </div>
            {/* Desktop */}
            <div className="hidden md:grid grid-cols-12 gap-4">
                <div className="col-span-4 space-y-1.5">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
                <div className="col-span-2 flex items-center">
                    <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <div className="col-span-2 flex items-center">
                    <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <div className="col-span-2 flex items-center">
                    <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <div className="col-span-1 flex items-center">
                    <Skeleton className="h-3 w-16" />
                </div>
                <div className="col-span-1" />
            </div>
        </div>
    );
};

export default TaskRowSkeleton;