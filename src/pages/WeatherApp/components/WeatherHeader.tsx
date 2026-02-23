import { memo } from 'react';

export const WeatherHeader = memo(() => {
  return (
    <header className="border-primary flex flex-col gap-1 border-l-4 pl-4">
      <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
        Weather App
      </h1>
      <p className="text-text-secondary font-mono text-[10px] tracking-widest uppercase opacity-60">
        REACT JOURNEY • ПРОГНОЗ ПОГОДЫ
      </p>
    </header>
  );
});

WeatherHeader.displayName = 'WeatherHeader';
