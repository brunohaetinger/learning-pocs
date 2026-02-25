import { Elysia } from "elysia";

type ToDo = {
  title: string;
  completed: boolean;
}

const todos: ToDo[] = [];

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get(
    "/todo",
    ({ status }) => {
      return status(200, todos)
    }
  )
  .post(
    "/todo",
    ({ status }) => {
      // get title
      const newItem: ToDo = { title, completed: false };
      todos.push(newItem)
      return status(201, todos)
    }
  )

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
