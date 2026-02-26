import { memo } from 'react';

export const MovieHeader = memo(() => {
  return (
    <header className="border-primary mb-6 flex flex-col gap-1 border-l-4 pl-4">
      <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
        Movie Shearch
      </h1>
      <p className="text-text-secondary font-mono text-[10px] tracking-widest uppercase opacity-60">
        REACT JOURNEY • ПОИСК ФИЛЬМОВ
      </p>
    </header>
  );
});

MovieHeader.displayName = 'MovieHeader';
