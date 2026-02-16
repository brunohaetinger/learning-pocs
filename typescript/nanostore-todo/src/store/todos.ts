// store/users.ts
import { atom } from 'nanostores'

export const $todos = atom<ToDo[]>([])

export function addUser(todo: ToDo) {
  $todos.set([...$todos.get(), todo]);
}
