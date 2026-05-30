import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { Badge, DataTable } from "@/components/DataTable";
import { navRecaudaciones } from "@/lib/module-navs";
import { useContribuyentesStore, useNotificacionesStore } from "@/lib/stores";
import { Bell, FileText, Phone } from "lucide-react";

export const Route = createFileRoute("/recaudaciones/mora")({
  head: () => ({ meta: [{ title: "Mora — Recaudaciones" }] }),
  component: MoraPage,
});

function MoraPage() {
  const morosos = useContribuyentesStore((s) => s.rows).filter((c) => c.deuda > 0).sort((a, b) => b.deuda - a.deuda);
  const createNot = useNotificacionesStore((s) => s.create);

  const notificar = (nombre: string, monto: number) => {
    createNot({
      codigo: `NOT-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      contribuyente: nombre, tipo: "Mora — Patente", monto, vencimiento: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15).toISOString().slice(0, 10),
      estado: "Notificado", canal: "Email",
    });
    alert(`Notificación generada para ${nombre}. Ver módulo Fiscalización → Notificaciones.`);
  };

  const tramos = [
    { label: "0 — 30 días", count: 8, color: "bg-accent" },
    { label: "31 — 90 días", count: 12, color: "bg-secondary" },
    { label: "91 — 180 días", count: 5, color: "bg-primary" },
    { label: "> 180 días", count: 3, color: "bg-destructive" },
  ];

  return (
    <ModuleShell title="Gestión de mora" subtitle="Segmentación de morosos y acciones de cobro"
      subnav={navRecaudaciones}
      breadcrumb={[{ label: "Recaudaciones", to: "/recaudaciones" }, { label: "Mora" }]}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {tramos.map((t) => (
          <div key={t.label} className="bg-card border border-border rounded-lg p-4">
            <div className={`h-1.5 w-12 rounded-full ${t.color} mb-2`} />
            <div className="text-xs text-muted-foreground">{t.label}</div>
            <div className="text-2xl font-semibold mt-1">{t.count}</div>
            <div className="text-[11px] text-muted-foreground">contribuyentes</div>
          </div>
        ))}
      </div>
      <h3 className="font-semibold mb-3">Top morosos · acciones</h3>
      <DataTable
        columns={[
          { key: "nit", label: "NIT/CI" },
          { key: "nombre", label: "Contribuyente" },
          { key: "predios", label: "Predios", className: "text-right" },
          { key: "deuda", label: "Deuda (Bs.)", className: "text-right font-medium", render: (r) => <span className="text-destructive">{r.deuda.toLocaleString("es-BO")}</span> },
          { key: "estado", label: "Estado", render: (r) => <Badge tone="destructive">{r.estado}</Badge> },
          { key: "__a", label: "Acciones", render: (r) => (
            <div className="flex gap-1">
              <button onClick={() => notificar(r.nombre, r.deuda)} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-accent/30 hover:bg-accent/50"><Bell className="h-3 w-3" /> Notificar</button>
              <button onClick={() => alert("Generar plan de pago (mock)")} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-muted hover:bg-muted/70"><FileText className="h-3 w-3" /> Plan</button>
              <button onClick={() => alert("Llamada registrada (mock)")} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-muted hover:bg-muted/70"><Phone className="h-3 w-3" /> Llamar</button>
            </div>
          )},
        ]}
        rows={morosos}
      />
    </ModuleShell>
  );
}
