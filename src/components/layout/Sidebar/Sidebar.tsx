import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

export const Sidebar = () => {
  return (
    <aside className="bg-card border-border-color p-lg gap-xl sticky top-0 flex h-screen w-72 flex-col border-r shadow-md">
      {/**Логотип как большая кнопка-ссылка на главную */}
      <div className="px-xs">
        <h1 className="text-primary text-2xl font-black tracking-tighter uppercase italic">
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
        <Input
          placeholder="Найти практику..."
          className="h-10 text-sm"
        />
      </div>

      {/**Навигация (мои кнопки) */}
      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto">
        {/** Группа1: Утилиты */}
        <section className="flex flex-col gap-2">
          <h3 className="text-text-secondary/50 px-xs mb-1 text-xs font-bold tracking-widest uppercase">
            Утилиты
          </h3>
          <Button
            variant="secondary"
            className="hover:border-border-color h-11 w-full justify-start gap-3 border border-transparent"
          >
            <span>To-Do List</span>
          </Button>
          <Button
            variant="secondary"
            className="hover:border-border-color h-11 w-full justify-start gap-3 border border-transparent"
          >
            <span>Калькулятор</span>
          </Button>
        </section>

        {/* Группа 2: Игры */}
        <section className="flex flex-col gap-2">
          <h3 className="text-text-secondary/50 px-xs mb-1 text-xs font-bold tracking-widest uppercase">
            Игры
          </h3>
          <Button
            variant="secondary"
            className="hover:border-border-color h-11 w-full justify-start gap-3 border border-transparent"
          >
            <span>Крестики-нолики</span>
          </Button>
          <Button
            variant="secondary"
            className="hover:border-border-color h-11 w-full justify-start gap-3 border border-transparent"
          >
            <span>Угадай число</span>
          </Button>
        </section>
      </nav>

      {/* Футер сайдбара (индикатор прогресса) */}
      <div className="pt-md border-border-color border-t">
        <div className="text-text-secondary mb-1 flex justify-between text-[10px]">
          <span>Прогресс обучения</span>
          <span>48%</span>
        </div>
        <div className="bg-main h-1.5 w-full overflow-hidden rounded-full">
          <div className="bg-primary h-full w-[40%] transition-all duration-1000"></div>
        </div>
      </div>
    </aside>
  );
};
