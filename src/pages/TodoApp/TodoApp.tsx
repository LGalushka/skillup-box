import { useMemo, useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

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
export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>(MY_TODO);
  const [newTask, setNewTask] = useState<string>('');
  const [filter, setFilter] = useState<Filter>('all');

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
    <div>
      <h1 className="text-textPrimary text-2xl font-bold">
        📝 Todo List
      </h1>
      <p className="text-textSecondary mt-4">
        Страница в разработке
      </p>

      <div>
        <Button
          variant={
            filter === 'all' ? 'primary' : 'secondary'
          }
          onClick={() => handleFilterChange('all')}
        >
          Все
        </Button>
        <Button
          variant={
            filter === 'active' ? 'primary' : 'secondary'
          }
          onClick={() => handleFilterChange('active')}
        >
          Активные
        </Button>
        <Button
          variant={
            filter === 'completed' ? 'primary' : 'secondary'
          }
          onClick={() => handleFilterChange('completed')}
        >
          Завершенные
        </Button>
      </div>

      <div>
        <Input
          type="text"
          value={newTask}
          placeholder="Новая задача..."
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button
          onClick={addTodo}
          disabled={!newTask.trim()}
        >
          Добавить
        </Button>
        <ul>
          {filteredTodos.map((item) => (
            <li key={item.id}>
              <Input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleTodo(item.id)}
              />
              <span>{item.title}</span>
              <Button onClick={() => deleteTask(item.id)}>
                X
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Статистика</h3>
        {/* Прогресс-бар */}
        <div>
          <span>Прогрес</span>
          <span>{stats.percentCompleted}%</span>
        </div>
        {/*Детальная статистика */}
        <div>
          <div>Всего</div>
          <div>{stats.total}</div>
        </div>
        <div>
          <div>Активно</div>
          <div>{stats.active}</div>
        </div>
      </div>
      <div>
        <div>Готово</div>
        <div>{stats.completed}</div>
      </div>
    </div>
  );
};
