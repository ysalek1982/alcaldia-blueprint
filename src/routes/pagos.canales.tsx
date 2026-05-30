import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { navPagos } from "@/lib/module-navs";
import { Building, Smartphone, Globe, Wallet } from "lucide-react";

export const Route = createFileRoute("/pagos/canales")({
  head: () => ({ meta: [{ title: "Canales de pago" }] }),
  component: CanalesPage,
});

const CANALES = [
  { i: Building, n: "Banco Unión", t: "Banca", estado: "Activo", comision: "0.5%", soporte: "API" },
  { i: Building, n: "Banco BCP", t: "Banca", estado: "Activo", comision: "0.6%", soporte: "API" },
  { i: Building, n: "Banco BNB", t: "Banca", estado: "Activo", comision: "0.5%", soporte: "Lote diario" },
  { i: Smartphone, n: "Tigo Money", t: "Billetera", estado: "Activo", comision: "0.8%", soporte: "QR EMV" },
  { i: Smartphone, n: "FIE Móvil", t: "Billetera", estado: "Pruebas", comision: "—", soporte: "QR EMV" },
  { i: Globe, n: "Portal web", t: "En línea", estado: "Activo", comision: "0%", soporte: "Tarjeta + QR" },
  { i: Wallet, n: "Caja municipal", t: "Presencial", estado: "Activo", comision: "0%", soporte: "Manual" },
];

function CanalesPage() {
  return (
    <ModuleShell title="Canales de pago" subtitle="Bancos, billeteras y caja municipal"
      subnav={navPagos}
      breadcrumb={[{ label: "Pagos", to: "/pagos" }, { label: "Canales" }]}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {CANALES.map((c) => {
          const Icon = c.i;
          return (
            <div key={c.n} className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center"><Icon className="h-5 w-5" /></div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full ${c.estado === "Activo" ? "bg-primary/10 text-primary" : "bg-accent/30"}`}>{c.estado}</span>
              </div>
              <div className="mt-4 font-semibold">{c.n}</div>
              <div className="text-xs text-muted-foreground">{c.t}</div>
              <dl className="mt-3 text-xs space-y-1">
                <div className="flex justify-between"><dt className="text-muted-foreground">Comisión</dt><dd>{c.comision}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Integración</dt><dd>{c.soporte}</dd></div>
              </dl>
            </div>
          );
        })}
      </div>
    </ModuleShell>
  );
}
