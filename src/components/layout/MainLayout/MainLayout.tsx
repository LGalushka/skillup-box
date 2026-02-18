import { Header } from '../Header';
import { Footer } from '../Footer';
import { Sidebar } from '../Sidebar';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="bg-main flex h-screen overflow-hidden">
      {/**Левая часть: Сайдбар (фиксированный) */}
      <Sidebar />

      <div className="flex h-full flex-1 flex-col overflow-y-auto">
        <Header />

        {/**Основной контент сраница */}
        <main className="p-lg mx-auto w-full max-w-7xl flex-1">
          <Outlet />{' '}
          {/* Здесь будут открываться страницы */}
        </main>

        {/**footer */}
        <Footer />
      </div>
    </div>
  );
};
