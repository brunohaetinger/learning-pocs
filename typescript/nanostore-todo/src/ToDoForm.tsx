// components/admins.tsx
import { addToDo } from '../src/store/todos.ts'
import { useState } from 'react';

export const ToDoForm = () => {
  const [title, setTitle] = useState("");

  return (
    <div>
      <input
        value={title}
        placeholder='To Do title here...'
        onChange={(ev) => setTitle(ev.target.value)}
        onKeyDown={(ev) => ev.key === 'Enter' && addToDo(title)}
      />
    </div>
  )
}
