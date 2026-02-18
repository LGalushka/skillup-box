import {
  Binary,
  CalendarCheck,
  Clapperboard,
  CloudSun,
  Coins,
  Grid3X3,
  ListTodo,
  type LucideIcon,
} from 'lucide-react';

type Project = {
  title: string;
  icon: LucideIcon;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  path: string;
};

export const PROJECTS: Project[] = [
  {
    title: 'To-Do App',
    icon: ListTodo,
    description:
      'Эффективное управление задачами: CRUD операции, фильтрация и локальное хранение данных.',
    category: 'Утилиты',
    difficulty: 'Easy',
    path: '/todo',
  },
  {
    title: 'Habit Tracker',
    icon: CalendarCheck,
    description:
      'Система мониторинга привычек с визуализацией прогресса и работой с датами.',
    category: 'Продуктивность',
    difficulty: 'Medium',
    path: '/habit',
  },
  {
    title: 'Weather App',
    icon: CloudSun,
    description:
      'Прогноз погоды в реальном времени. Работа с внешними API, асинхронными запросами и JSON.',
    category: 'Сервисы',
    difficulty: 'Medium',
    path: '/weather',
  },
  {
    title: 'Movie Search',
    icon: Clapperboard,
    description:
      'Поиск фильмов по базе данных. Реализация динамического поиска и детальных карточек контента.',
    category: 'Медиа',
    difficulty: 'Medium',
    path: '/movies',
  },
  {
    title: 'Crypto Track',
    icon: Coins,
    description:
      'Мониторинг курсов криптовалют. Обработка больших массивов данных и работа с WebSocket или API.',
    category: 'Финансы',
    difficulty: 'Hard',
    path: '/crypto',
  },
  {
    title: 'Tic Tac Toe',
    icon: Grid3X3,
    description:
      'Классическая игра: алгоритм проверки победителя, состояние игрового поля и история ходов.',
    category: 'Игры',
    difficulty: 'Easy',
    path: '/tictac',
  },
  {
    title: 'Guess Number',
    icon: Binary,
    description:
      'Игра на угадывание числа. Логика случайных чисел, валидация ввода и обработка попыток.',
    category: 'Игры',
    difficulty: 'Easy',
    path: '/guess',
  },
];
