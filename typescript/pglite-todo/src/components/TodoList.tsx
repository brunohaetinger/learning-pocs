import { useDb } from '../context/DbContext';

export interface Todo {
  id: number;
  text: string;
  done: boolean;
  created_at: string;
}

export function TodoList({ todos, onChanged }: { todos: Todo[]; onChanged: () => void }) {
  const db = useDb();

  async function toggleDone(todo: Todo) {
    await db.query('UPDATE todos SET done = $1 WHERE id = $2', [!todo.done, todo.id]);
    onChanged();
  }

  async function deleteTodo(id: number) {
    await db.query('DELETE FROM todos WHERE id = $1', [id]);
    onChanged();
  }

  if (todos.length === 0) {
    return <p className="empty">No todos yet. Add one above!</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={todo.done ? 'done' : ''}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => toggleDone(todo)}
          />
          <span>{todo.text}</span>
          <button onClick={() => deleteTodo(todo.id)} aria-label="Delete">✕</button>
        </li>
      ))}
    </ul>
  );
}
