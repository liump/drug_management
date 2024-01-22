import PageHeader from '@/app/ui/home/pageHeader';
import PageFooter from '@/app/ui/home/pageFooter';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen flex flex-col">
            <PageHeader />

            {/* content */}
            <div className='flex-1 bg-white'>{children}</div>

            <PageFooter />
        </div>
    );
}