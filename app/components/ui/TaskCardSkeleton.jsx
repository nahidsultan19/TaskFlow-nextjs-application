import React from 'react';
import Skeleton from './Skeleton';

// Task card skeleton for Kanban board
const TaskCardSkeleton = () => {
    return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-4 w-4 rounded" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-3/4" />
            <div className="flex items-center justify-between pt-1">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-5 w-24 rounded-full" />
            </div>
        </div>
    );
};

export default TaskCardSkeleton;