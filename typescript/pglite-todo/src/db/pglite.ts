import { PGlite } from '@electric-sql/pglite';

let instance: PGlite | null = null;

export async function getDb(): Promise<PGlite> {
  if (instance) return instance;
  instance = new PGlite('idb://todo-app');
  await instance.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id         SERIAL PRIMARY KEY,
      text       TEXT NOT NULL,
      done       BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
  return instance;
}
