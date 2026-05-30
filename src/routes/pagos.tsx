import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { StatCard } from "@/components/StatCard";
import { Badge, DataTable } from "@/components/DataTable";
import { pagos } from "@/lib/mock-data";
import { CreditCard, QrCode, Building, CheckCircle2, Plus } from "lucide-react";

export const Route = createFileRoute("/pagos")({
  head: () => ({ meta: [{ title: "Pagos Electrónicos — G.A.M. Buena Vista" }] }),
  component: Pagos,
});

function Pagos() {
  return (
    <AppShell
      title="Pagos Electrónicos"
      subtitle="Órdenes, canales bancarios, conciliación y comprobantes"
      actions={
        <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Generar orden de pago
        </button>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Pagos del día" value="Bs. 42.180" hint="38 operaciones" icon={CreditCard} accent="primary" />
        <StatCard label="Pagos por QR" value="61%" hint="Tigo Money + BCP" icon={QrCode} accent="accent" />
        <StatCard label="Canales bancarios" value="5" hint="Unión, BCP, BNB, FIE, Sol" icon={Building} accent="secondary" />
        <StatCard label="Conciliación" value="100%" hint="Cierre 11/09 ok" icon={CheckCircle2} accent="primary" />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground">Distribución por canal</h3>
          <p className="text-xs text-muted-foreground">Mes en curso</p>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { k: "QR / billeteras", v: 38, c: "bg-primary" },
              { k: "Banca por internet", v: 27, c: "bg-secondary" },
              { k: "Caja municipal", v: 21, c: "bg-accent" },
              { k: "Transferencia", v: 14, c: "bg-chart-4" },
            ].map((r) => (
              <li key={r.k}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{r.k}</span><span className="text-muted-foreground">{r.v}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden"><div className={`h-full ${r.c}`} style={{ width: `${r.v}%` }} /></div>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground">Conciliación bancaria</h3>
          <p className="text-xs text-muted-foreground">Últimos 5 días</p>
          <div className="mt-4 grid grid-cols-5 gap-3">
            {[
              { d: "08/09", v: "Bs. 38.420", ok: true },
              { d: "09/09", v: "Bs. 41.150", ok: true },
              { d: "10/09", v: "Bs. 36.780", ok: true },
              { d: "11/09", v: "Bs. 44.910", ok: true },
              { d: "12/09", v: "Bs. 42.180", ok: false },
            ].map((c) => (
              <div key={c.d} className="rounded-md border border-border p-3 text-center">
                <div className="text-[11px] text-muted-foreground">{c.d}</div>
                <div className="text-sm font-semibold mt-1">{c.v}</div>
                <div className="mt-2">
                  <Badge tone={c.ok ? "primary" : "accent"}>{c.ok ? "Conciliado" : "En proceso"}</Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-md bg-muted/60 text-xs text-muted-foreground">
            La conciliación corre cada 30 min contra extractos bancarios. Diferencias se reportan automáticamente al tesorero.
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-foreground mb-3">Movimientos recientes</h3>
        <DataTable
          columns={[
            { key: "fecha", label: "Fecha / Hora" },
            { key: "recibo", label: "Recibo" },
            { key: "contribuyente", label: "Contribuyente" },
            { key: "concepto", label: "Concepto" },
            { key: "canal", label: "Canal" },
            { key: "monto", label: "Monto (Bs.)", className: "text-right font-medium", render: (r) => r.monto.toLocaleString("es-BO") },
            {
              key: "estado", label: "Estado",
              render: (r) => <Badge tone={r.estado === "Aplicado" ? "primary" : "accent"}>{r.estado}</Badge>,
            },
          ]}
          rows={pagos}
        />
      </div>
    </AppShell>
  );
}
