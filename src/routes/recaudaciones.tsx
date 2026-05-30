import { createFileRoute, Link } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { StatCard } from "@/components/StatCard";
import { navRecaudaciones } from "@/lib/module-navs";
import { useContribuyentesStore, useDeudasStore } from "@/lib/stores";
import { Receipt, Users, AlertTriangle, FileBarChart } from "lucide-react";

export const Route = createFileRoute("/recaudaciones")({
  head: () => ({ meta: [{ title: "Recaudaciones — G.A.M. Buena Vista" }] }),
  component: RecaudacionesResumen,
});

function RecaudacionesResumen() {
  const contribuyentes = useContribuyentesStore((s) => s.rows);
  const deudas = useDeudasStore((s) => s.rows);
  const morosos = contribuyentes.filter((c) => c.deuda > 0);
  const totalDeuda = deudas.reduce((s, d) => s + d.saldo, 0);

  return (
    <ModuleShell title="Recaudaciones" subtitle="Subsistema de contribuyentes, deudas y cobranza"
      subnav={navRecaudaciones}
      breadcrumb={[{ label: "Módulos", to: "/dashboard" }, { label: "Recaudaciones" }]}>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Contribuyentes" value={contribuyentes.length.toString()} hint={`${morosos.length} con deuda`} icon={Users} accent="primary" />
        <StatCard label="Deuda total" value={`Bs. ${totalDeuda.toLocaleString("es-BO")}`} hint={`${deudas.length} obligaciones`} icon={Receipt} accent="secondary" />
        <StatCard label="En mora" value={`Bs. ${morosos.reduce((s, c) => s + c.deuda, 0).toLocaleString("es-BO")}`} hint={`${morosos.length} contribuyentes`} icon={AlertTriangle} accent="destructive" />
        <StatCard label="Cumplimiento" value="82%" hint="Gestión 2026" icon={FileBarChart} accent="accent" />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground">Cumplimiento por concepto</h3>
          <p className="text-xs text-muted-foreground">Gestión 2026</p>
          <div className="mt-5 space-y-4">
            {[
              { k: "Impuesto a inmuebles", v: 86, c: "bg-primary" },
              { k: "Patentes municipales", v: 74, c: "bg-secondary" },
              { k: "Vehículos automotores", v: 81, c: "bg-accent" },
              { k: "Tasas y servicios", v: 92, c: "bg-chart-4" },
              { k: "Multas y sanciones", v: 41, c: "bg-destructive" },
            ].map((r) => (
              <div key={r.k}>
                <div className="flex justify-between text-xs mb-1.5"><span>{r.k}</span><span className="text-muted-foreground font-medium">{r.v}%</span></div>
                <div className="h-2 rounded-full bg-muted overflow-hidden"><div className={`h-full ${r.c}`} style={{ width: `${r.v}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Top morosos</h3>
            <Link to="/recaudaciones/mora" className="text-xs text-primary hover:underline">Ver mora →</Link>
          </div>
          <ul className="mt-4 space-y-3">
            {morosos.sort((a, b) => b.deuda - a.deuda).slice(0, 6).map((c) => (
              <li key={c.id} className="flex items-center justify-between">
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
    </ModuleShell>
  );
}
