import React from 'react';
import Skeleton from './Skeleton';
import TaskCardSkeleton from './TaskCardSkeleton';

// Kanban column skeleton
const KanbanColumnSkeleton = () => {
    return (
        <div className="flex flex-col bg-gray-900 rounded-2xl border border-gray-800 min-w-72 flex-1">
            {/* Column header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-800">
                <Skeleton className="w-2 h-2 rounded-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="ml-auto h-5 w-6 rounded-full" />
            </div>
            {/* Cards */}
            <div className="p-3 space-y-3">
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
            </div>
        </div>
    );
};

export default KanbanColumnSkeleton;