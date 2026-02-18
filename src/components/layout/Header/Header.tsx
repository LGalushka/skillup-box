export const Header = () => {
  return (
    <header className="border-border-color bg-card/40 px-lg sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b backdrop-blur-md">
      <div className="flex flex-col">
        <span className="text-text-secondary text-xs font-bold tracking-tighter uppercase">
          Текущий раздел
        </span>
        <h2 className="text-text-primary text-sm font-semibold">
          Главная панель
        </h2>
      </div>

      {/**Правая часть: Прогресс или аватар */}
      <div className="gap-md flex items-center">
        <div className="hidden text-right md:block">
          <p className="text-text-secondary text-[10px] uppercase">
            Уровень навыков
          </p>
          <div className="bg-main mt-1 h-1 w-32 overflow-hidden rounded-full">
            <div className="bg-primary h-full w-1/3 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
          </div>
        </div>
        <div className="rounded-box from primary to blue-600 flex h-9 w-9 items-center justify-center bg-linear-to-br font-bold text-white shadow-lg">
          S
        </div>
      </div>
    </header>
  );
};
