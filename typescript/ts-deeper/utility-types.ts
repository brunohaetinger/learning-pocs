type User = {
  id: string;
  name: string;
  age: number;
}

type UserPreview = Pick<User, "id" | "name">;
