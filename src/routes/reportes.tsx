import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { StatCard } from "@/components/StatCard";
import { navReportes } from "@/lib/module-navs";
import { BarChart3, TrendingUp, Users, Receipt } from "lucide-react";

export const Route = createFileRoute("/reportes")({
  head: () => ({ meta: [{ title: "Reportes / BI — G.A.M. Buena Vista" }] }),
  component: () => (
    <ModuleShell title="Reportes e indicadores" subtitle="Tablero ejecutivo institucional"
      subnav={navReportes}
      breadcrumb={[{ label: "Módulos", to: "/dashboard" }, { label: "Reportes" }]}>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Recaudación YTD" value="Bs. 2.867.900" hint="82% de la meta anual" icon={Receipt} accent="primary" />
        <StatCard label="Crecimiento" value="+14%" hint="vs. gestión 2025" icon={TrendingUp} accent="secondary" />
        <StatCard label="Contribuyentes activos" value="6.421" hint="+182 en 2026" icon={Users} accent="accent" />
        <StatCard label="Reportes disponibles" value="38" hint="Catálogo institucional" icon={BarChart3} accent="primary" />
      </div>
      <div className="mt-6 bg-card border border-border rounded-lg p-5">
        <h3 className="font-semibold mb-4">Recaudación mensual 2026 (Bs.)</h3>
        <div className="flex items-end gap-2 h-48">
          {[180, 210, 245, 220, 260, 280, 295, 310, 290].map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-primary rounded-t" style={{ height: `${(v / 320) * 100}%` }} />
              <span className="text-[10px] text-muted-foreground">{["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep"][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </ModuleShell>
  ),
});
