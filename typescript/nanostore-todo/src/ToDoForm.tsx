// components/admins.tsx
import { useStore } from '@nanostores/react'
import { $todos, addToDo } from '../src/store/todos.ts'
import { useState } from 'react';

export const ToDoForm = () => {
  const todos = useStore($todos);
  const [title, setTitle] = useState("");

  return (
    <div>
      <input value={title} placeholder='To Do title here...' onChange={(ev) => setTitle(ev.target.value)} onKeyDown={(ev) => ev.key === 'Enter' && addToDo(title)} />
    </div>
  )
}
