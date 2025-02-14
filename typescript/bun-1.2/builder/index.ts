import { build } from "bun";

const results = await build({
  entrypoints: ["./index.css"],
  outdir: "./dist",
  minify: true,
});

console.log(results);