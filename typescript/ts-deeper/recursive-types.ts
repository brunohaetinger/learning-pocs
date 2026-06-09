type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };
// Recursive Types: useful for trees, ASTs and nested configurations;
