import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { StatCard } from "@/components/StatCard";
import { Badge, DataTable } from "@/components/DataTable";
import { contribuyentes } from "@/lib/mock-data";
import { Receipt, Users, AlertTriangle, FileBarChart, Plus, Download } from "lucide-react";

export const Route = createFileRoute("/recaudaciones")({
  head: () => ({ meta: [{ title: "Recaudaciones — G.A.M. Buena Vista" }] }),
  component: Recaudaciones,
});

function Recaudaciones() {
  return (
    <AppShell
      title="Recaudaciones"
      subtitle="Contribuyentes, deudas, planes de pago y notificaciones"
      actions={
        <>
          <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
            <Plus className="h-4 w-4" /> Generar deuda
          </button>
          <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-muted">
            <Download className="h-4 w-4" /> Reporte de mora
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Contribuyentes activos" value="6.421" hint="+182 en 2026" icon={Users} accent="primary" />
        <StatCard label="Deuda generada" value="Bs. 3.480.200" hint="Gestión 2026" icon={Receipt} accent="secondary" />
        <StatCard label="Mora" value="Bs. 612.300" hint="421 contribuyentes" icon={AlertTriangle} accent="destructive" />
        <StatCard label="Recaudado" value="Bs. 2.867.900" hint="82% de cumplimiento" icon={FileBarChart} accent="accent" />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground">Cumplimiento por concepto</h3>
          <p className="text-xs text-muted-foreground">Gestión 2026 — % recaudado sobre deuda generada</p>
          <div className="mt-5 space-y-4">
            {[
              { k: "Impuesto a inmuebles", v: 86, c: "bg-primary" },
              { k: "Patentes municipales", v: 74, c: "bg-secondary" },
              { k: "Vehículos automotores", v: 81, c: "bg-accent" },
              { k: "Tasas y servicios", v: 92, c: "bg-chart-4" },
              { k: "Multas y sanciones", v: 41, c: "bg-destructive" },
            ].map((r) => (
              <div key={r.k}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-foreground">{r.k}</span>
                  <span className="text-muted-foreground font-medium">{r.v}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full ${r.c}`} style={{ width: `${r.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground">Top morosos</h3>
          <p className="text-xs text-muted-foreground">Saldo a la fecha</p>
          <ul className="mt-4 space-y-3">
            {contribuyentes
              .filter((c) => c.deuda > 0)
              .sort((a, b) => b.deuda - a.deuda)
              .map((c) => (
                <li key={c.nit} className="flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{c.nombre}</div>
                    <div className="text-[11px] text-muted-foreground">NIT/CI {c.nit}</div>
                  </div>
                  <div className="text-sm font-semibold text-destructive">Bs. {c.deuda.toLocaleString("es-BO")}</div>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-foreground mb-3">Maestro de contribuyentes</h3>
        <DataTable
          columns={[
            { key: "nit", label: "NIT / CI" },
            { key: "nombre", label: "Contribuyente" },
            { key: "tipo", label: "Tipo" },
            { key: "predios", label: "Predios", className: "text-right" },
            {
              key: "deuda", label: "Deuda (Bs.)",
              className: "text-right",
              render: (r) => <span className={r.deuda > 0 ? "text-destructive font-medium" : "text-foreground"}>{r.deuda.toLocaleString("es-BO")}</span>,
            },
            {
              key: "estado", label: "Estado",
              render: (r) => {
                const tone =
                  r.estado === "Al día" ? "primary" :
                  r.estado === "Mora" ? "destructive" :
                  r.estado === "Notificado" ? "accent" : "secondary";
                return <Badge tone={tone}>{r.estado}</Badge>;
              },
            },
          ]}
          rows={contribuyentes}
        />
      </div>
    </AppShell>
  );
}
