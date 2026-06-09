type Params<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
  ? Param | Params<Rest>
  : T extends `${string}:${infer Param}`
  ? Param
  : never;

type RouteParams = Params<"/users/:id/posts/:postId">;

// "id" | "postId"
