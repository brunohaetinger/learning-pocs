// store/users.ts
import { atom } from 'nanostores'

export const $todos = atom<string[]>([])

export function addToDo(todo: string) {
  $todos.set([...$todos.get(), todo]);
}
