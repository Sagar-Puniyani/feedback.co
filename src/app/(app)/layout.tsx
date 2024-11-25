import Navbar from '@/components/Navbar';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-700 transition-all duration-300 relative overflow-hidden">
      <Navbar />
      {children}
    </div>
  );
}
