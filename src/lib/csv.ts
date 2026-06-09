// Exportación CSV real desde el navegador.

export function downloadCSV<T extends Record<string, unknown>>(
  filename: string,
  rows: T[],
  columns?: { key: string; label: string }[],
) {
  if (!rows.length) {
    alert("No hay registros para exportar.");
    return;
  }
  const cols =
    columns ??
    Object.keys(rows[0]).map((k) => ({ key: k, label: k }));

  const escape = (v: unknown) => {
    if (v === null || v === undefined) return "";
    const s = String(v).replace(/"/g, '""');
    return /[",\n;]/.test(s) ? `"${s}"` : s;
  };

  const header = cols.map((c) => escape(c.label)).join(",");
  const body = rows
    .map((r) => cols.map((c) => escape((r as Record<string, unknown>)[c.key])).join(","))
    .join("\n");
  const csv = "\uFEFF" + header + "\n" + body;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
