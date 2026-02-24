import { motion } from 'framer-motion';
import { Moon, Sun, Sunrise, Sunset } from 'lucide-react';

export const WeatherWelcomeScreen = () => {
  const hour = new Date().getHours();

  //логика динамического приветвия и иконок
  const getGreeting = () => {
    if (hour >= 5 && hour < 12)
      return {
        text: 'Доброе утро',
        icon: <Sunrise className="text-orange-400" size={48} />,
      };
    if (hour >= 12 && hour < 18)
      return {
        text: 'Добрый день',
        icon: <Sun className="text-yellow-400" size={48} />,
      };
    if (hour >= 18 && hour < 22)
      return {
        text: 'Добрый вечер',
        icon: <Sunset className="text-orange-500" size={48} />,
      };
    return {
      text: 'Доброй ночи',
      icon: <Moon className="text-blue-300" size={48} />,
    };
  };

  const { text, icon } = getGreeting();

  const currentTime = new Date().toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const dateFull = new Date().toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card/20 border-card/50 flex flex-col items-center justify-center rounded-3xl border p-10 text-center backdrop-blur-md"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-6"
      >
        {icon}
      </motion.div>

      <div className="flex flex-col items-center gap-2">
        <h2 className="text-text-primary text-xl font-medium opacity-90">
          {text}
        </h2>
        <div className="flex flex-col items-center">
          <p className="text-text-primary text-4xl font-extrabold tracking-tight">
            {currentTime}
          </p>
          <p className="text-text-secondary mt-2 text-sm font-medium tracking-wider uppercase">
            {dateFull}
          </p>
        </div>
      </div>
      <p className="text-text-primary max-w-300px mt-4 text-2xl opacity-80">
        Введите название города в поиске выше, чтобы увидеть прогноз погоды
      </p>
    </motion.div>
  );
};
