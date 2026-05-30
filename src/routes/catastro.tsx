import { createFileRoute, Link } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { StatCard } from "@/components/StatCard";
import { navCatastro } from "@/lib/module-navs";
import { usePrediosStore, useZonasStore } from "@/lib/stores";
import { Building2, MapPinned, Layers, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/catastro")({
  head: () => ({ meta: [{ title: "Catastro Digital — G.A.M. Buena Vista" }] }),
  component: CatastroResumen,
});

function CatastroResumen() {
  const predios = usePrediosStore((s) => s.rows);
  const zonas = useZonasStore((s) => s.rows);
  const avaluoTotal = predios.reduce((s, p) => s + p.avaluo, 0);

  return (
    <ModuleShell title="Catastro Digital" subtitle="Subsistema territorial — predios, zonas y mapa"
      subnav={navCatastro}
      breadcrumb={[{ label: "Módulos", to: "/dashboard" }, { label: "Catastro" }]}>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Predios registrados" value={predios.length.toString()} hint={`${zonas.length} zonas / UV`} icon={Building2} accent="primary" />
        <StatCard label="Avalúo total" value={`Bs. ${(avaluoTotal / 1000).toFixed(0)}k`} hint="Base imponible" icon={TrendingUp} accent="secondary" />
        <StatCard label="Zonas / UV" value={zonas.length.toString()} hint="Cobertura urbana" icon={MapPinned} accent="accent" />
        <StatCard label="Trámites técnicos" value="12" hint="Mutaciones / fusiones" icon={Layers} accent="primary" />
      </div>

      <div className="mt-6 bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Mapa esquemático</h3>
          <Link to="/catastro/mapa" className="text-xs text-primary hover:underline">Abrir mapa →</Link>
        </div>
        <MiniMap />
      </div>
    </ModuleShell>
  );
}

function MiniMap() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-48 bg-muted/30 rounded">
      {[
        { x: 20, y: 30, w: 80, h: 50, l: "UV-03" },
        { x: 110, y: 20, w: 70, h: 70, l: "UV-05" },
        { x: 190, y: 40, w: 90, h: 60, l: "UV-08" },
        { x: 290, y: 30, w: 90, h: 80, l: "UV-12" },
        { x: 60, y: 100, w: 100, h: 70, l: "UV-22" },
        { x: 170, y: 110, w: 110, h: 60, l: "UV-30" },
      ].map((z) => (
        <g key={z.l}>
          <rect x={z.x} y={z.y} width={z.w} height={z.h} fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="1.5" rx="4" />
          <text x={z.x + z.w / 2} y={z.y + z.h / 2 + 4} textAnchor="middle" className="text-[10px] fill-current text-primary font-medium">{z.l}</text>
        </g>
      ))}
    </svg>
  );
}
