
import { Sidebar } from '../components/layout/Sidebar';
import AuthGurad from '../components/layout/AuthGurad';
import Header from '../components/layout/Header';
import DashboardShell from '../components/layout/DashboardShell';


const DashboardLayout = ({ children }) => {

    return (
        <AuthGurad>
            {/* <div className='flex h-full bg-gray-950 overflow-hidden'>
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <div className='flex flex-col flex-1 overflow-hidden'>
                    <Header onMenuClick={() => setSidebarOpen(true)} />
                    <main className='flex-1 overflow-y-auto p-6'>
                        {children}
                    </main>
                </div>
            </div> */}
            <DashboardShell>
                {children}
            </DashboardShell>
        </AuthGurad>
    );
};

export default DashboardLayout;