import type { ReactNode } from "react";
import { Search, Filter as FilterIcon, Download, Plus } from "lucide-react";

export function EntityToolbar({
  search,
  onSearch,
  searchPlaceholder = "Buscar…",
  filters,
  onCreate,
  createLabel = "Nuevo",
  onExport,
  selectedCount = 0,
  bulkActions,
}: {
  search?: string;
  onSearch?: (v: string) => void;
  searchPlaceholder?: string;
  filters?: ReactNode;
  onCreate?: () => void;
  createLabel?: string;
  onExport?: () => void;
  selectedCount?: number;
  bulkActions?: ReactNode;
}) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      {onSearch && (
        <div className="flex items-center gap-2 px-3 h-9 rounded-md bg-card border border-input text-sm w-72">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={search ?? ""}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
      )}
      {filters && (
        <div className="flex items-center gap-2">
          <FilterIcon className="h-4 w-4 text-muted-foreground" />
          {filters}
        </div>
      )}
      <div className="flex-1" />
      {selectedCount > 0 && (
        <div className="flex items-center gap-2 mr-2 px-3 h-9 rounded-md bg-accent/30 text-xs">
          <span className="font-medium">{selectedCount} seleccionados</span>
          {bulkActions}
        </div>
      )}
      {onExport && (
        <button onClick={onExport} className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-muted">
          <Download className="h-4 w-4" /> Exportar
        </button>
      )}
      {onCreate && (
        <button onClick={onCreate} className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
          <Plus className="h-4 w-4" /> {createLabel}
        </button>
      )}
    </div>
  );
}

export function SelectFilter({
  value, onChange, options, placeholder = "Filtro",
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 px-2 rounded-md border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
    >
      <option value="all">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}
