import { useMemo, useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import {
  CheckCircle2,
  Circle,
  EditIcon,
  Plus,
  Trash2,
} from 'lucide-react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

type Filter = 'all' | 'active' | 'completed';

const MY_TODO: Todo[] = [
  {
    id: 'h1',
    title: 'Выучить React',
    completed: false,
    createdAt: '18-02-2026',
  },
  {
    id: 'h2',
    title: 'Не сдаваться. Все получиться!!!',
    completed: true,
    createdAt: '18-02-2026',
  },
  {
    id: 'h3',
    title: 'Реализовать проект полностью',
    completed: false,
    createdAt: '18-02-2026',
  },
];

interface StatCardProps {
  label: string;
  value: number | string;
  colorClass?: string;
}

const StatCard = ({
  label,
  value,
  colorClass = '',
}: StatCardProps) => (
  <div className="bg-card border-border-color p-md rounded-xl border shadow-sm">
    <p className="text-text-secondary text-[10px] font-bold tracking-widest uppercase">
      {label}
    </p>
    <p className={`text-2xl font-black ${colorClass}`}>
      {value}
    </p>
  </div>
);

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>(MY_TODO);
  const [newTask, setNewTask] = useState<string>('');
  const [filter, setFilter] = useState<Filter>('all');
  const [editId, setEditId] = useState<string | null>(null);

  const addTodo = () => {
    if (!newTask.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setTodos([...todos, newTodo]);
    setNewTask('');
  };
  const deleteTask = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const updeteTodo = <K extends keyof Todo>(
    id: string,
    key: K,
    value: Todo[K]
  ) => {
    const update = todos.map((todo) =>
      todo.id === id ? { ...todo, [key]: value } : todo
    );
    setTodos(update);
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((item) => !item.completed);
      case 'completed':
        return todos.filter((item) => item.completed);
      case 'all':
      default:
        return todos;
    }
  }, [todos, filter]);

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  const handleSave = () => {
    setEditId(null);
  };

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(
      (item) => item.completed
    ).length;
    const active = total - completed;

    return {
      total,
      completed,
      active,
      percentCompleted: total
        ? Math.round((completed / total) * 100)
        : 0,
      percentActive: total
        ? Math.round((active / total) * 100)
        : 0,
    };
  }, [todos]);

  return (
    <div className="p-lg mx-auto flex max-w-2xl flex-col gap-10">
      {' '}
      {/* Уменьшил max-width до 2xl для компактности */}
      {/* Шапка: вернем к левому краю и добавим акцент */}
      <header className="border-primary flex flex-col gap-1 border-l-4 pl-4">
        <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
          MY TASKS
        </h1>
        <p className="text-text-secondary font-mono text-[10px] tracking-widest uppercase opacity-60">
          REACT JOURNEY • УПРАВЛЕНИЕ ЗАДАЧАМИ
        </p>
      </header>
      {/* Статистика: сделаем их чуть меньше и аккуратнее */}
      <section className="grid grid-cols-3 gap-4">
        <StatCard label="Всего" value={stats.total} />
        <StatCard
          label="В работе"
          value={stats.active}
          colorClass="text-primary"
        />
        <StatCard label="Готово" value={stats.completed} />
      </section>
      {/* Поле ввода: УБИРАЕМ лишний фон-карточку, оставляем только Gap */}
      <div className="flex flex-col gap-6">
        <div className="flex gap-3">
          <Input
            value={newTask}
            placeholder="Что нужно сделать?..."
            className="border-border-color bg-card/50 focus:border-primary/50 h-12 flex-1 text-base"
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button
            onClick={addTodo}
            disabled={!newTask.trim()}
            className="shadow-primary/10 h-14 shadow-lg"
          >
            <Plus size={20} className="mr-2" /> Добавить
          </Button>
        </div>

        {/* Фильтры: сделаем их совсем маленькими и аккуратными */}
        <div className="flex items-center gap-2">
          <span className="text-text-secondary mr-2 text-[10px] font-bold tracking-widest uppercase">
            Фильтр:
          </span>
          {(['all', 'active', 'completed'] as Filter[]).map(
            (f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`rounded-full border px-5 py-3 text-xs font-bold transition-all ${
                  filter === f
                    ? 'bg-primary border-primary text-black'
                    : 'border-border-color text-text-secondary hover:border-primary/50'
                }`}
              >
                {f === 'all'
                  ? 'Все'
                  : f === 'active'
                    ? 'Активные'
                    : 'Завершенные'}
              </button>
            )
          )}
        </div>
      </div>
      {/* Список задач: добавим разделители или чуть больше отступов */}
      <ul className="flex flex-col gap-3 pb-20">
        {filteredTodos.map((item) => (
          <li
            key={item.id}
            className="group border-border-color bg-card hover:border-primary/30 flex items-center gap-4 rounded-xl border p-4 transition-all hover:shadow-sm"
          >
            {editId === item.id ? (
              <>
                <Input
                  type="text"
                  value={item.title}
                  onChange={(e) =>
                    updeteTodo(
                      item.id,
                      'title',
                      e.target.value
                    )
                  }
                />
                <div className="flex gap-2">
                  <Button onClick={handleSave}>
                    Сохранить
                  </Button>
                  <Button onClick={() => setEditId(null)}>
                    Отмена
                  </Button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => toggleTodo(item.id)}
                  className="text-primary transition-transform active:scale-90"
                >
                  {item.completed ? (
                    <CheckCircle2
                      size={22}
                      className="opacity-100"
                    />
                  ) : (
                    <Circle
                      size={22}
                      className="opacity-30"
                    />
                  )}
                </button>

                <span
                  className={`flex-1 text-sm font-medium transition-all ${
                    item.completed
                      ? 'text-text-secondary line-through opacity-40'
                      : 'text-white'
                  }`}
                >
                  {item.title}
                </span>
                <Button
                  variant="secondary"
                  onClick={() => deleteTask(item.id)}
                  className="hover:bg-destructive opacity-0 transition-all group-hover:opacity-100 hover:text-white"
                >
                  <Trash2 size={16} />
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setEditId(item.id)}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <EditIcon
                    size={16}
                    className="stroke-[1.5px]"
                  />
                </Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
