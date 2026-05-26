import { useState } from 'react';
import { useDb } from '../context/DbContext';

export function TodoForm({ onAdded }: { onAdded: () => void }) {
  const db = useDb();
  const [text, setText] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    await db.query('INSERT INTO todos (text) VALUES ($1)', [trimmed]);
    setText('');
    onAdded();
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        autoFocus
      />
      <button type="submit">Add</button>
    </form>
  );
}
