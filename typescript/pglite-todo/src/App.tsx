import { useCallback, useEffect, useState } from 'react';
import { DbProvider, useDb } from './context/DbContext';
import { TodoForm } from './components/TodoForm';
import { TodoList, type Todo } from './components/TodoList';
import './App.css';

function TodoApp() {
  const db = useDb();
  const [todos, setTodos] = useState<Todo[]>([]);

  const refresh = useCallback(async () => {
    const result = await db.query<Todo>('SELECT * FROM todos ORDER BY created_at DESC');
    setTodos(result.rows);
  }, [db]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <main>
      <h1>PGlite Todos</h1>
      <TodoForm onAdded={refresh} />
      <TodoList todos={todos} onChanged={refresh} />
    </main>
  );
}

export default function App() {
  return (
    <DbProvider>
      <TodoApp />
    </DbProvider>
  );
}
