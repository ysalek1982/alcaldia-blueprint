import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { BarChart3, Download, FileBarChart } from "lucide-react";

export const Route = createFileRoute("/reportes")({
  head: () => ({ meta: [{ title: "Reportes & BI — G.A.M. Buena Vista" }] }),
  component: Reportes,
});

const indicadores = [
  { k: "Cumplimiento de recaudación 2026", v: "82%", t: "Meta 85%", c: "primary" },
  { k: "Reducción de mora vs. 2025", v: "-14%", t: "Meta -10%", c: "primary" },
  { k: "Trámites resueltos en SLA", v: "91%", t: "Meta 90%", c: "accent" },
  { k: "Predios catastrados", v: "78%", t: "Meta 80%", c: "secondary" },
  { k: "Disponibilidad del sistema", v: "99.7%", t: "Meta 99.5%", c: "primary" },
  { k: "Satisfacción ciudadana", v: "4.3/5", t: "n=412", c: "accent" },
];

const reportes = [
  { n: "Recaudación diaria por canal", f: "PDF / Excel", a: "Tesorería" },
  { n: "Mora por zona y concepto", f: "Excel", a: "Recaudaciones" },
  { n: "Planilla salarial mensual", f: "PDF", a: "RRHH" },
  { n: "Estado de trámites por secretaría", f: "Excel", a: "Atención" },
  { n: "Conciliación bancaria", f: "PDF", a: "Tesorería" },
  { n: "Ejecución presupuestaria", f: "Excel", a: "Planificación" },
];

function Reportes() {
  return (
    <AppShell
      title="Reportes y BI"
      subtitle="Indicadores institucionales, tableros gerenciales y exportes"
      actions={
        <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
          <Download className="h-4 w-4" /> Exportar tablero
        </button>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {indicadores.map((i) => (
          <div key={i.k} className="bg-card border border-border rounded-lg p-5">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{i.k}</div>
            <div className="mt-3 flex items-baseline gap-3">
              <span className={`text-3xl font-semibold text-${i.c}`}>{i.v}</span>
              <span className="text-xs text-muted-foreground">{i.t}</span>
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className={`h-full bg-${i.c}`} style={{ width: "78%" }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground">Ejecución vs. presupuesto</h3>
          <p className="text-xs text-muted-foreground">Gestión 2026 por secretaría</p>
          <div className="mt-5 space-y-3">
            {[
              { s: "Obras Públicas", e: 68 },
              { s: "Salud", e: 74 },
              { s: "Educación", e: 81 },
              { s: "Desarrollo Productivo", e: 52 },
              { s: "Administrativa", e: 88 },
            ].map((r) => (
              <div key={r.s}>
                <div className="flex justify-between text-xs mb-1"><span>{r.s}</span><span className="text-muted-foreground">{r.e}%</span></div>
                <div className="h-2 rounded bg-muted overflow-hidden"><div className="h-full bg-secondary" style={{ width: `${r.e}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground">Catálogo de reportes</h3>
          <p className="text-xs text-muted-foreground">Generables bajo demanda</p>
          <ul className="mt-4 divide-y divide-border">
            {reportes.map((r) => (
              <li key={r.n} className="py-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                  <FileBarChart className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{r.n}</div>
                  <div className="text-[11px] text-muted-foreground">{r.a} · {r.f}</div>
                </div>
                <button className="h-8 px-3 rounded-md border border-border text-xs hover:bg-muted inline-flex items-center gap-1">
                  <Download className="h-3.5 w-3.5" /> Generar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 bg-card border border-border rounded-lg p-5">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-5 w-5 text-secondary" />
          <div>
            <div className="font-semibold text-foreground">Compatible con Lovable Cloud</div>
            <div className="text-xs text-muted-foreground">Los tableros se alimentan automáticamente desde el esquema Postgres una vez conectado el backend.</div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
