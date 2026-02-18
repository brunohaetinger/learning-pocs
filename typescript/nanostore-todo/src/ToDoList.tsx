// components/admins.tsx
import { useStore } from '@nanostores/react'
import { $todos } from '../src/store/todos.ts'

export const ToDoList = () => {
  const todos = useStore($todos);

  return (
    <ul>
      {todos.map(t => <li>{t}</li>)}
    </ul>
  )
}
