import { memo } from 'react';
export const TodoHeader = memo(() => {
  return (
    <header className="border-primary flex flex-col gap-1 border-l-4 pl-4">
      <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
        MY TASKS
      </h1>
      <p className="text-text-secondary font-mono text-[10px] tracking-widest uppercase opacity-60">
        REACT JOURNEY • УПРАВЛЕНИЕ ЗАДАЧАМИ
      </p>
    </header>
  );
});

TodoHeader.displayName = 'TodoHeader';
