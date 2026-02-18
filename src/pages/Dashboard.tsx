type Project = {
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  path?: string;
};

export const PROJECTS: Project[] = [
  {
    title: 'To-Do List',
    description:
      'Классическое приложение для управления задачами. Работа с массивами и формами.',
    category: 'Утилиты',
    difficulty: 'Easy',
    path: '/todo',
  },
  {
    title: 'Калькулятор',
    description:
      'Математическая логика и сложная обработка состояний (useState).',
    category: 'Утилиты',
    difficulty: 'Medium',
  },
  {
    title: 'Крестики-нолики',
    description:
      'Первая игра на React. Логика победных комбинаций и переключение ходов.',
    category: 'Игры',
    difficulty: 'Medium',
    path: '/tictac',
  },
  {
    title: 'Крестики-нолики',
    description:
      'Первая игра на React. Логика победных комбинаций и переключение ходов.',
    category: 'Игры',
    difficulty: 'Medium',
  },
];
