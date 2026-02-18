import type { ReactNode } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Sidebar } from '../Sidebar';

interface MainLayoutProps {
  children: ReactNode; //сюда будет попадать контект страницы
}

export const MainLayout = ({
  children,
}: MainLayoutProps) => {
  return (
    <div className="bg-main flex h-screen overflow-hidden">
      {/**Левая часть: Сайдбар (фиксированный) */}
      <Sidebar />

      <div className="flex h-full flex-1 flex-col overflow-y-auto">
        <Header />

        {/**Основной контент сраница */}
        <main className="p-lg mx-auto w-full max-w-7xl flex-1">
          {children}
        </main>

        {/**footer */}
        <Footer />
      </div>
    </div>
  );
};
