import type { WeatherResponse } from '../types/weather';

interface WeatherContentProps {
  data: WeatherResponse;
}

export const WeatherContent = ({ data }: WeatherContentProps) => {
  return (
    <>
      <section className="bg-card/50 border-card w-115 rounded-xl border p-6">
        <h1 className="text-text-primary mb-2 text-2xl font-bold">
          {data.location.name}, {data.location.country}
        </h1>

        <div className="flex items-center gap-4">
          <img
            src={`https:${data.current.condition.icon}`}
            alt={data.current.condition.text}
            className="h-16 w-16"
          />
          <div>
            <p className="text-text-primary text-4xl font-bold">
              {Math.round(data.current.temp_c)}°C
            </p>
            <p className="text-text-secondary">{data.current.condition.text}</p>
          </div>
        </div>
      </section>

      {/**Прогноз на несколько дней */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data.forecast.forecastday.map((item) => (
          <div
            key={item.date}
            className="bg-card/30 border-card rounded-xl border p-4 text-center"
          >
            <p className="text-text-secondary mb-2 text-sm">
              {new Date(item.date).toLocaleDateString('ru-RU', {
                weekday: 'long',
                day: 'numeric',
              })}
            </p>
            <img
              src={`https:${item.day.condition.icon}`}
              className="mx-auto h-10 w-10"
              alt="weather icon"
            />
            <p className="text-text-primary font-semibold">
              {Math.round(item.day.maxtemp_c)}°
            </p>
          </div>
        ))}
      </section>
    </>
  );
};
