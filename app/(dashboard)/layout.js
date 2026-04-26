
import { Sidebar } from '../components/layout/Sidebar';
import AuthGurad from '../components/layout/AuthGurad';
import Header from '../components/layout/Header';

const DashboardLayout = ({ children }) => {
    return (
        <AuthGurad>
            <div className='flex h-full bg-gray-950 overflow-hidden'>
                <Sidebar />
                <div className='flex flex-col flex-1 overflow-hidden'>
                    <Header />
                    <main className='flex-1 overflow-y-auto p-6'>
                        {children}
                    </main>
                </div>
            </div>
        </AuthGurad>
    );
};

export default DashboardLayout;