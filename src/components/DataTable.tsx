import type { ReactNode } from "react";

export type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => ReactNode;
  className?: string;
};

export function DataTable<T extends Record<string, unknown>>({
  columns, rows,
}: { columns: Column<T>[]; rows: T[] }) {
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
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-muted/40 transition-colors">
                {columns.map((c) => (
                  <td key={String(c.key)} className={`px-4 py-3 text-foreground ${c.className ?? ""}`}>
                    {c.render ? c.render(r) : String(r[c.key as keyof T] ?? "")}
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

export function Badge({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "primary" | "secondary" | "accent" | "destructive" }) {
  const tones: Record<string, string> = {
    muted: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/40 text-accent-foreground",
    destructive: "bg-destructive/10 text-destructive",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
