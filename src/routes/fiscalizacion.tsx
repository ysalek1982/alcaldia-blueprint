import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { StatCard } from "@/components/StatCard";
import { Badge, DataTable } from "@/components/DataTable";
import { notificaciones } from "@/lib/mock-data";
import { ShieldCheck, Send, AlertTriangle, Gavel, Plus } from "lucide-react";

export const Route = createFileRoute("/fiscalizacion")({
  head: () => ({ meta: [{ title: "Fiscalización — G.A.M. Buena Vista" }] }),
  component: Fiscalizacion,
});

function Fiscalizacion() {
  return (
    <AppShell
      title="Fiscalización y cobranza"
      subtitle="Gestión de mora, notificaciones e inspecciones de campo"
      actions={
        <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Nueva notificación
        </button>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Casos activos" value="312" hint="Asignados a 6 fiscalizadores" icon={ShieldCheck} accent="primary" />
        <StatCard label="Notificaciones del mes" value="184" hint="124 efectivas" icon={Send} accent="secondary" />
        <StatCard label="Reincidentes" value="47" hint="3 o más periodos en mora" icon={AlertTriangle} accent="destructive" />
        <StatCard label="Procesos coactivos" value="9" hint="En etapa judicial" icon={Gavel} accent="accent" />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground">Embudo de cobranza</h3>
          <p className="text-xs text-muted-foreground">Estado de los casos abiertos</p>
          <div className="mt-5 space-y-3">
            {[
              { k: "Identificado", v: 312, p: 100, c: "bg-primary" },
              { k: "Notificado", v: 248, p: 79, c: "bg-secondary" },
              { k: "Compromiso de pago", v: 132, p: 42, c: "bg-accent" },
              { k: "Pagado", v: 89, p: 28, c: "bg-chart-4" },
              { k: "Coactivo", v: 9, p: 3, c: "bg-destructive" },
            ].map((s) => (
              <div key={s.k}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-foreground">{s.k}</span>
                  <span className="text-muted-foreground">{s.v} casos · {s.p}%</span>
                </div>
                <div className="h-3 rounded bg-muted overflow-hidden">
                  <div className={`h-full ${s.c}`} style={{ width: `${s.p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground">Equipo fiscalizador</h3>
          <ul className="mt-4 space-y-3">
            {[
              { n: "Luis F. Peña", c: 64, e: 41 },
              { n: "Carla Justiniano", c: 58, e: 39 },
              { n: "Marco Salvatierra", c: 52, e: 28 },
              { n: "Helen Cuéllar", c: 47, e: 22 },
            ].map((p) => (
              <li key={p.n} className="flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium text-foreground">{p.n}</div>
                  <div className="text-[11px] text-muted-foreground">{p.c} casos · {p.e} efectivos</div>
                </div>
                <Badge tone="primary">{Math.round((p.e / p.c) * 100)}%</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-foreground mb-3">Notificaciones recientes</h3>
        <DataTable
          columns={[
            { key: "codigo", label: "Código" },
            { key: "contribuyente", label: "Contribuyente" },
            { key: "tipo", label: "Tipo" },
            { key: "monto", label: "Monto (Bs.)", className: "text-right", render: (r) => r.monto ? r.monto.toLocaleString("es-BO") : "—" },
            { key: "vencimiento", label: "Vencimiento" },
            {
              key: "estado", label: "Estado",
              render: (r) => {
                const tone =
                  r.estado === "Reincidente" ? "destructive" :
                  r.estado === "Notificado" ? "accent" :
                  r.estado === "En gestión" ? "secondary" : "muted";
                return <Badge tone={tone}>{r.estado}</Badge>;
              },
            },
          ]}
          rows={notificaciones}
        />
      </div>
    </AppShell>
  );
}
