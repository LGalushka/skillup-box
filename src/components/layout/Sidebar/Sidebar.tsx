import {
  Binary,
  CalendarCheck,
  Clapperboard,
  CloudSun,
  Coins,
  Grid3X3Icon,
  ListTodo,
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { useLocation, useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Функция для проверки активного пункта
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="bg-card border-border-color p-lg gap-xl sticky top-0 flex h-screen w-72 flex-col border-r shadow-md">
      {/**Логотип как большая кнопка-ссылка на главную */}
      <div className="px-xs group cursor-pointer" onClick={() => navigate('/')}>
        <h1 className="text-primary group-hover:text-primary/80 text-2xl font-black tracking-tighter uppercase italic transition-colors">
          SkillUp Box
        </h1>
        <p className="text-text-secondary mt-1 font-mono text-[10px]">
          React Journey • Day 18
        </p>
      </div>

      {/** Поиск по проектам (мой новый инпут) */}
      <div className="gap-sm flex flex-col">
        <span className="text-text-secondary px-xs text-[10px] font-bold tracking-widest uppercase">
          Поиск
        </span>
        <Input placeholder="🔍 Найти практику..." className="h-10 text-sm" />
      </div>

      {/**Навигация (мои кнопки) */}
      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto">
        {/** Группа1: Утилиты */}
        <section className="flex flex-col gap-2">
          <h3 className="text-text-secondary/50 px-xs mb-1 text-xs font-bold tracking-widest uppercase">
            Утилиты
          </h3>
          <Button
            variant={isActive('/todo') ? 'primary' : 'secondary'}
            className="hover:border-border-color h-11 w-full justify-start gap-3 border border-transparent"
            onClick={() => navigate('/todo')}
          >
            <ListTodo size={20} className="stroke-[1.5px]" />
            <span>Todo App</span>
          </Button>

          <Button
            variant={isActive('/habit') ? 'primary' : 'secondary'}
            className="hover:border-border-color h-11 w-full justify-start gap-3 border border-transparent"
            onClick={() => navigate('/habit')}
          >
            <CalendarCheck size={20} className="stroke-[1.5px]" />
            <span>Habit Tracker</span>
          </Button>

          <Button
            variant={isActive('/weather') ? 'primary' : 'secondary'}
            className="hover:border-border-color h-11 w-full justify-start gap-3 border border-transparent"
            onClick={() => navigate('/weather')}
          >
            <CloudSun size={20} className="stroke-[1.5]" />
            <span>Weather App</span>
          </Button>

          <Button
            variant={isActive('/movies') ? 'primary' : 'secondary'}
            className="hover:border-border-color h-11 w-full justify-start gap-3 border border-transparent"
            onClick={() => navigate('/movies')}
          >
            <Clapperboard size={20} className="stroke-[1.5px]" />
            <span>Movie Search</span>
          </Button>

          <Button
            variant={isActive('/crypto') ? 'primary' : 'secondary'}
            className="hover:border-border-color h-11 w-full justify-start gap-3 border border-transparent"
            onClick={() => navigate('/crypto')}
          >
            <Coins size={20} className="stroke-[1.5px]" />
            <span>Crypto Track</span>
          </Button>
        </section>

        {/* Группа 2: Игры */}
        <section className="flex flex-col gap-2">
          <h3 className="text-text-secondary/50 px-xs mb-1 text-xs font-bold tracking-widest uppercase">
            Игры
          </h3>
          <Button
            variant={isActive('/tictac') ? 'primary' : 'secondary'}
            className="hover:border-border-color h-11 w-full justify-start gap-3 border border-transparent"
            onClick={() => navigate('/tictac')}
          >
            <Grid3X3Icon size={20} className="stroke-[1.5px]" />
            <span>Tic Tac Toe</span>
          </Button>
          <Button
            variant={isActive('/guess') ? 'primary' : 'secondary'}
            className="hover:border-border-color h-11 w-full justify-start gap-3 border border-transparent"
            onClick={() => navigate('/guess')}
          >
            <Binary size={20} className="stroke-[1.5px]" />
            <span>Guess Number</span>
          </Button>
        </section>
      </nav>

      {/* Футер сайдбара (индикатор прогресса) */}
      <div className="pt-md border-border-color border-t">
        <div className="text-text-secondary mb-1 flex justify-between text-[10px]">
          <span>Прогресс обучения</span>
          <span>72%</span>
        </div>
        <div className="bg-main h-1.5 w-full overflow-hidden rounded-full">
          <div className="bg-primary h-full w-[40%] transition-all duration-1000"></div>
        </div>
      </div>
    </aside>
  );
};
