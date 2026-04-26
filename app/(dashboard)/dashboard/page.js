import DashboardComponent from '@/app/components/dashboard/DashboardContent';
import React from 'react';

export const metadata = {
    title: 'Dashboard | TaskFlow',
}

const DashboardPage = () => {
    return (
        <div>
            <DashboardComponent />
        </div>
    );
};

export default DashboardPage;