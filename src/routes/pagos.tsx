import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/DataTable";
import { navPagos } from "@/lib/module-navs";
import { usePagosStore, useOrdenesStore } from "@/lib/stores";
import { CreditCard, QrCode, Building, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/pagos")({
  head: () => ({ meta: [{ title: "Pagos Electrónicos — G.A.M. Buena Vista" }] }),
  component: PagosResumen,
});

function PagosResumen() {
  const pagos = usePagosStore((s) => s.rows);
  const ordenes = useOrdenesStore((s) => s.rows);
  const aplicados = pagos.filter((p) => p.estado === "Aplicado");
  const total = aplicados.reduce((s, p) => s + p.monto, 0);

  return (
    <ModuleShell title="Pagos Electrónicos" subtitle="Subsistema de cobros, canales y conciliación"
      subnav={navPagos}
      breadcrumb={[{ label: "Módulos", to: "/dashboard" }, { label: "Pagos" }]}>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Recaudado hoy" value={`Bs. ${total.toLocaleString("es-BO")}`} hint={`${aplicados.length} operaciones`} icon={CreditCard} accent="primary" />
        <StatCard label="Órdenes pendientes" value={ordenes.filter((o) => o.estado === "Pendiente").length.toString()} hint="Por vencer / vencidas" icon={QrCode} accent="accent" />
        <StatCard label="Canales activos" value="5" hint="Unión, BCP, BNB, Tigo, FIE" icon={Building} accent="secondary" />
        <StatCard label="Conciliación" value="100%" hint="Cierre 11/09 ok" icon={CheckCircle2} accent="primary" />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold">Últimos pagos aplicados</h3>
          <ul className="mt-3 divide-y divide-border">
            {pagos.slice(0, 6).map((p) => (
              <li key={p.id} className="py-2.5 flex items-center justify-between">
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{p.contribuyente}</div>
                  <div className="text-[11px] text-muted-foreground">{p.concepto} · {p.canal}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">Bs. {p.monto.toLocaleString("es-BO")}</div>
                  <Badge tone={p.estado === "Aplicado" ? "primary" : "accent"}>{p.estado}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold">Mix por canal</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { k: "QR / billeteras", v: 38, c: "bg-primary" },
              { k: "Banca por internet", v: 27, c: "bg-secondary" },
              { k: "Caja municipal", v: 21, c: "bg-accent" },
              { k: "Transferencia", v: 14, c: "bg-chart-4" },
            ].map((r) => (
              <li key={r.k}>
                <div className="flex justify-between text-xs mb-1"><span>{r.k}</span><span className="text-muted-foreground">{r.v}%</span></div>
                <div className="h-2 rounded-full bg-muted overflow-hidden"><div className={`h-full ${r.c}`} style={{ width: `${r.v}%` }} /></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ModuleShell>
  );
}
