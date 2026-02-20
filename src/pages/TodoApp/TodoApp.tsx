import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Plus } from 'lucide-react';
import { TodoItem } from './components/TodoItem';
import { TodoFilter } from './components/TodoFilter';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export type Filter = 'all' | 'active' | 'completed';

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
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todoApp');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('todoApp', JSON.stringify(todos));
  }, [todos]);

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

  const deleteTask = useCallback((id: string) => {
    const todoDelete = todos.find((t) => t.id === id);
    if (todoDelete) {
      const isConfirmed = window.confirm(
        `Вы уверены, что хотите удалить задачу "${todoDelete.title}"?`
      );
      if (isConfirmed) {
        setTodos(todos.filter((todo) => todo.id !== id));
      }
    }
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }, []);

  const updateTodo = <K extends keyof Todo>(
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

  const handleFilterChange = useCallback(
    (newFilter: Filter) => {
      setFilter(newFilter);
    },
    []
  );

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

  console.log(stats);

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
          value={`${stats.active} (${stats.percentActive}%)`}
          colorClass={
            stats.active === 0
              ? 'text-text-light'
              : 'text-primary'
          }
        />
        <StatCard
          label="Готово"
          value={`${stats.completed} (${stats.percentCompleted}%)`}
          colorClass={
            stats.completed === 0
              ? 'text-text-light'
              : 'text-primary'
          }
        />
      </section>
      {/* Поле ввода: УБИРАЕМ лишний фон-карточку, оставляем только Gap */}
      <div className="flex flex-col gap-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (newTask.trim()) {
              addTodo();
            }
          }}
          className="flex gap-3"
        >
          <Input
            autoFocus
            value={newTask}
            placeholder="Что нужно сделать?..."
            className="border-border-color bg-card/50 focus:border-primary/50 h-12 flex-1 text-base"
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button
            type="submit"
            disabled={!newTask.trim()}
            className="shadow-primary/10 h-14 shadow-lg"
          >
            <Plus size={20} className="mr-2" /> Добавить
          </Button>
        </form>

        {/* Фильтры: сделаем их совсем маленькими и аккуратными */}
        <TodoFilter
          currentFilter={filter}
          onFilterChange={handleFilterChange}
        />
        {/* Список задач: добавим разделители или чуть больше отступов */}
        <ul className="flex flex-col gap-3 pb-20">
          {filteredTodos.length === 0 ? (
            <div className="border-border-color flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed py-12 opacity-50">
              <p className="text-sm font-medium">
                {filter === 'all'
                  ? 'Ваш список дел пуст'
                  : filter === 'active'
                    ? 'Нет активных задач'
                    : 'У вас нет завершенных дел'}
              </p>
              <span className="text-[10px] tracking-widest uppercase">
                Отличная работа!!!
              </span>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                item={todo}
                isEditing={editId === todo.id}
                onToggle={toggleTodo}
                onDelete={deleteTask}
                onEdit={setEditId}
                onUpdate={(id, title) =>
                  updateTodo(id, 'title', title)
                }
                onCancel={() => setEditId(null)}
                onSave={handleSave}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
