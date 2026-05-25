import { createContext, useContext, useEffect, useState } from 'react';
import type { PGlite } from '@electric-sql/pglite';
import { getDb } from '../db/pglite';

const DbContext = createContext<PGlite | null>(null);

export function DbProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<PGlite | null>(null);

  useEffect(() => {
    getDb().then(setDb);
  }, []);

  if (!db) return <div className="loading">Loading database…</div>;

  return <DbContext.Provider value={db}>{children}</DbContext.Provider>;
}

export function useDb(): PGlite {
  const db = useContext(DbContext);
  if (!db) throw new Error('useDb must be used inside DbProvider');
  return db;
}
