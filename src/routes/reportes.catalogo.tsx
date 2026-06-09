import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { navReportes } from "@/lib/module-navs";
import { Download, FileBarChart } from "lucide-react";
import { downloadCSV } from "@/lib/csv";
import { toast } from "sonner";


const REPORTES = [
  { c: "R-001", n: "Recaudación por concepto y mes", a: "Recaudaciones" },
  { c: "R-002", n: "Mora por tramo de antigüedad", a: "Fiscalización" },
  { c: "R-003", n: "Avalúo catastral por UV", a: "Catastro" },
  { c: "R-004", n: "Pagos por canal", a: "Pagos" },
  { c: "R-005", n: "Planilla mensual consolidada", a: "RRHH" },
  { c: "R-006", n: "Expedientes vencidos por área", a: "Expedientes" },
  { c: "R-007", n: "Reclamos por zona y categoría", a: "Portal" },
  { c: "R-008", n: "Auditoría de accesos críticos", a: "Configuración" },
];

export const Route = createFileRoute("/reportes/catalogo")({
  head: () => ({ meta: [{ title: "Catálogo de reportes" }] }),
  component: () => (
    <ModuleShell title="Catálogo de reportes" subtitle="Reportes parametrizables exportables a CSV / PDF"
      subnav={navReportes}
      breadcrumb={[{ label: "Reportes", to: "/reportes" }, { label: "Catálogo" }]}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {REPORTES.map((r) => (
          <div key={r.c} className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center"><FileBarChart className="h-5 w-5" /></div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{r.c} · {r.a}</div>
                <div className="font-semibold text-sm leading-tight mt-0.5">{r.n}</div>
              </div>
            </div>
            <button onClick={() => {
              const sample = Array.from({ length: 20 }).map((_, i) => ({
                periodo: `2026-${String(((i % 9) + 1)).padStart(2, "0")}`,
                concepto: r.n,
                monto: Math.round(1000 + Math.random() * 15000),
                area: r.a,
              }));
              downloadCSV(`${r.c}_${r.n.toLowerCase().replace(/\s+/g, "_")}`, sample);
              toast.success(`Reporte ${r.c} generado`, { description: `${sample.length} filas exportadas a CSV` });
            }} className="mt-4 w-full h-9 rounded-md border border-border bg-card text-sm inline-flex items-center justify-center gap-2 hover:bg-muted">
              <Download className="h-3.5 w-3.5" /> Generar
            </button>

          </div>
        ))}
      </div>
    </ModuleShell>
  ),
});
