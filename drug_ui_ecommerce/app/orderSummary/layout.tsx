import PageHeader from '@/app/ui/home/pageHeader';
import PageFooter from '@/app/ui/home/pageFooter';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen">
            <PageHeader />

            {/* content */}
            <div >{children}</div>

            <PageFooter />
        </div>
    );
}