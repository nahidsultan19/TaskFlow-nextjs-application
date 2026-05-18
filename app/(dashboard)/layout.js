
import { Sidebar } from '../components/layout/Sidebar';
import AuthGurad from '../components/layout/AuthGurad';
import Header from '../components/layout/Header';
import DashboardShell from '../components/layout/DashboardShell';
import StatsProvider from '../providers/StatsProvider';


const DashboardLayout = ({ children }) => {

    return (
        <AuthGurad>
            <StatsProvider>
                <DashboardShell>
                    {children}
                </DashboardShell>
            </StatsProvider>
        </AuthGurad>
    );
};

export default DashboardLayout;