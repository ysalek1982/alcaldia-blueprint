// Factory de stores en memoria con la MISMA interfaz que tendrá Supabase.
// Migración a Lovable Cloud = reemplazar el cuerpo de los métodos por
// supabase.from('<tabla>').select() / insert() / update() / delete().
//
// No tocar la UI: los componentes solo consumen list / get / create / update / remove.

import { create } from "zustand";

export type Filter<T> = Partial<Record<keyof T, unknown>> & {
  q?: string; // búsqueda libre
};

export type ListResult<T> = { rows: T[]; count: number };

export interface EntityStore<T extends { id: string }> {
  rows: T[];
  list: (f?: Filter<T>) => ListResult<T>;
  get: (id: string) => T | undefined;
  create: (input: Omit<T, "id"> & { id?: string }) => T;
  update: (id: string, patch: Partial<T>) => T | undefined;
  remove: (id: string) => void;
  bulkRemove: (ids: string[]) => void;
}

export function createEntityStore<T extends { id: string }>(
  seed: T[],
  searchableKeys: (keyof T)[] = [],
) {
  return create<EntityStore<T>>((set, get) => ({
    rows: seed,
    list: (f) => {
      let rows = get().rows;
      if (f) {
        const q = (f.q ?? "").toString().trim().toLowerCase();
        if (q) {
          rows = rows.filter((r) =>
            searchableKeys.some((k) =>
              String(r[k] ?? "").toLowerCase().includes(q),
            ),
          );
        }
        for (const [k, v] of Object.entries(f)) {
          if (k === "q" || v === undefined || v === "" || v === "all") continue;
          rows = rows.filter((r) => String((r as Record<string, unknown>)[k]) === String(v));
        }
      }
      return { rows, count: rows.length };
    },
    get: (id) => get().rows.find((r) => r.id === id),
    create: (input) => {
      const id = input.id ?? crypto.randomUUID().slice(0, 8);
      const row = { ...input, id } as T;
      set({ rows: [row, ...get().rows] });
      return row;
    },
    update: (id, patch) => {
      let updated: T | undefined;
      set({
        rows: get().rows.map((r) => {
          if (r.id !== id) return r;
          updated = { ...r, ...patch };
          return updated;
        }),
      });
      return updated;
    },
    remove: (id) => set({ rows: get().rows.filter((r) => r.id !== id) }),
    bulkRemove: (ids) =>
      set({ rows: get().rows.filter((r) => !ids.includes(r.id)) }),
  }));
}
