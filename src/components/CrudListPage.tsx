import { useMemo, useState, type ReactNode } from "react";
import type { UseBoundStore, StoreApi } from "zustand";
import type { EntityStore } from "@/lib/store-factory";
import { DataTable, type Column } from "./DataTable";
import { EntityToolbar, SelectFilter } from "./EntityToolbar";
import { FormSheet } from "./FormSheet";
import { Trash2, Pencil } from "lucide-react";

type Store<T extends { id: string }> = UseBoundStore<StoreApi<EntityStore<T>>>;

export function CrudListPage<T extends { id: string }>({
  store,
  columns,
  searchPlaceholder,
  filters,
  renderForm,
  createLabel = "Nuevo",
  emptyText = "Sin registros",
  rowActions = true,
  onRowClick,
  initialFilterState,
  exportable = true,
}: {
  store: Store<T>;
  columns: Column<T>[];
  searchPlaceholder?: string;
  filters?: (state: Record<string, string>, set: (k: string, v: string) => void) => ReactNode;
  renderForm: (args: { editing: T | null; close: () => void }) => ReactNode;
  createLabel?: string;
  emptyText?: string;
  rowActions?: boolean;
  onRowClick?: (row: T) => void;
  initialFilterState?: Record<string, string>;
  exportable?: boolean;
}) {
  const list = store((s) => s.list);
  const remove = store((s) => s.remove);
  // subscribe a `rows` para que la lista se re-renderice tras crear/editar
  store((s) => s.rows);

  const [q, setQ] = useState("");
  const [filterState, setFilterState] = useState<Record<string, string>>(initialFilterState ?? {});
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);

  const data = useMemo(() => list({ q, ...filterState } as never), [q, filterState, list]);

  const fullColumns: Column<T>[] = rowActions
    ? [
        ...columns,
        {
          key: "__actions" as never,
          label: "",
          className: "text-right w-24",
          render: (row) => (
            <div className="flex justify-end gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); setEditing(row); setSheetOpen(true); }}
                className="h-7 w-7 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground"
                title="Editar"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm("¿Eliminar este registro?")) remove(row.id);
                }}
                className="h-7 w-7 rounded-md hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive"
                title="Eliminar"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ),
        },
      ]
    : columns;

  return (
    <div>
      <EntityToolbar
        search={q}
        onSearch={setQ}
        searchPlaceholder={searchPlaceholder}
        filters={filters?.(filterState, (k, v) => setFilterState((s) => ({ ...s, [k]: v })))}
        onCreate={() => { setEditing(null); setSheetOpen(true); }}
        createLabel={createLabel}
        onExport={exportable ? () => alert("Exportación CSV (mock). En Lovable Cloud se sirve desde Postgres.") : undefined}
      />

      {data.rows.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12 text-center text-sm text-muted-foreground">
          {emptyText}
        </div>
      ) : (
        <div onClick={(e) => {
          // delegación de click por fila
          const tr = (e.target as HTMLElement).closest("tr[data-rowid]");
          if (!tr || !onRowClick) return;
          const id = tr.getAttribute("data-rowid");
          const row = data.rows.find((r) => r.id === id);
          if (row) onRowClick(row);
        }}>
          <ClickableTable columns={fullColumns} rows={data.rows} />
        </div>
      )}

      <div className="mt-3 text-xs text-muted-foreground">
        {data.count} registro{data.count === 1 ? "" : "s"}
      </div>

      <FormSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title={editing ? "Editar registro" : `Crear ${createLabel.toLowerCase()}`}
        size="lg"
      >
        {renderForm({ editing, close: () => setSheetOpen(false) })}
      </FormSheet>
    </div>
  );
}

function ClickableTable<T extends { id: string }>({ columns, rows }: { columns: Column<T>[]; rows: T[] }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 border-b border-border">
            <tr>
              {columns.map((c) => (
                <th key={String(c.key)} className={`text-left font-medium text-xs uppercase tracking-wide text-muted-foreground px-4 py-3 ${c.className ?? ""}`}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => (
              <tr key={r.id} data-rowid={r.id} className="hover:bg-muted/40 transition-colors cursor-pointer">
                {columns.map((c) => (
                  <td key={String(c.key)} className={`px-4 py-3 text-foreground ${c.className ?? ""}`}>
                    {c.render ? c.render(r) : String((r as Record<string, unknown>)[c.key as string] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { SelectFilter };
