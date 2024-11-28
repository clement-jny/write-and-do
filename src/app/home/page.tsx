import AuthWrapper from '../../hooks/useAuth';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import ViewCard from '@/components/viewCard';

const Home = () => {
    return (
        <AuthWrapper>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <Header />
                    <div className="flex">
                        <div className="w-2/3">
                            <ViewCard title="My tasks" />
                        </div>
                        <div className="w-1/3">
                            <ViewCard title="Faire une raclette" />
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </AuthWrapper>
    );
};

export default Home;
