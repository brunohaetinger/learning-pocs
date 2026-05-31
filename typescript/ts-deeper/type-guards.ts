function isString(value: unknown): value is string {
  return typeof value === "string";
}

const input = "abc";

if (isString(input)) {
  input.toUpperCase();
}
