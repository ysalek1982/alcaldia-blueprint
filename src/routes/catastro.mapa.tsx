import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ModuleShell } from "@/components/ModuleShell";
import { navCatastro } from "@/lib/module-navs";
import { usePrediosStore, useZonasStore } from "@/lib/stores";

export const Route = createFileRoute("/catastro/mapa")({
  head: () => ({ meta: [{ title: "Mapa catastral" }] }),
  component: MapaPage,
});

const ZONAS = [
  { codigo: "UV-03", x: 30, y: 40, w: 110, h: 70 },
  { codigo: "UV-05", x: 150, y: 30, w: 100, h: 80 },
  { codigo: "UV-08", x: 260, y: 40, w: 120, h: 70 },
  { codigo: "UV-12", x: 390, y: 30, w: 120, h: 90 },
  { codigo: "UV-22", x: 60, y: 130, w: 150, h: 100 },
  { codigo: "UV-30", x: 220, y: 130, w: 150, h: 90 },
];

function MapaPage() {
  const predios = usePrediosStore((s) => s.rows);
  const zonas = useZonasStore((s) => s.rows);
  const [sel, setSel] = useState<string | null>(null);
  const seleccion = sel ? zonas.find((z) => z.codigo === sel) : null;
  const prediosSel = sel ? predios.filter((p) => p.zona === sel) : [];

  return (
    <ModuleShell title="Mapa catastral" subtitle="Click en una zona para ver predios y datos urbanos"
      subnav={navCatastro}
      breadcrumb={[{ label: "Catastro", to: "/catastro" }, { label: "Mapa" }]}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
          <svg viewBox="0 0 540 260" className="w-full h-80 bg-muted/30 rounded">
            {ZONAS.map((z) => {
              const active = sel === z.codigo;
              return (
                <g key={z.codigo} onClick={() => setSel(z.codigo)} className="cursor-pointer">
                  <rect x={z.x} y={z.y} width={z.w} height={z.h} fill={active ? "hsl(var(--primary) / 0.35)" : "hsl(var(--primary) / 0.12)"} stroke="hsl(var(--primary))" strokeWidth={active ? 2.5 : 1.5} rx="4" />
                  <text x={z.x + z.w / 2} y={z.y + z.h / 2 + 4} textAnchor="middle" className="text-xs fill-current text-primary font-semibold pointer-events-none">{z.codigo}</text>
                </g>
              );
            })}
          </svg>
          <p className="text-[11px] text-muted-foreground mt-2">Representación esquemática. En producción se integra Leaflet o Mapbox con la base SIG municipal.</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          {seleccion ? (
            <>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Zona</div>
              <h3 className="text-xl font-bold text-primary">{seleccion.codigo}</h3>
              <p className="text-sm text-foreground">{seleccion.nombre}</p>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div><dt className="text-[11px] text-muted-foreground">Valor m²</dt><dd className="font-semibold">Bs. {seleccion.valorM2}</dd></div>
                <div><dt className="text-[11px] text-muted-foreground">Coef.</dt><dd className="font-semibold">{seleccion.coeficiente}</dd></div>
                <div><dt className="text-[11px] text-muted-foreground">Predios</dt><dd className="font-semibold">{seleccion.predios}</dd></div>
                <div><dt className="text-[11px] text-muted-foreground">En padrón</dt><dd className="font-semibold">{prediosSel.length}</dd></div>
              </dl>
              <h4 className="text-xs font-semibold mt-4 mb-2">Predios visibles</h4>
              <ul className="space-y-1.5 max-h-48 overflow-y-auto text-xs">
                {prediosSel.map((p) => (
                  <li key={p.id} className="border-l-2 border-primary/40 pl-2">
                    <div className="font-medium">{p.codigo}</div>
                    <div className="text-muted-foreground">{p.direccion}</div>
                  </li>
                ))}
                {prediosSel.length === 0 && <li className="text-muted-foreground">Sin predios cargados en esta zona.</li>}
              </ul>
            </>
          ) : (
            <div className="text-sm text-muted-foreground">Selecciona una zona en el mapa para ver datos.</div>
          )}
        </div>
      </div>
    </ModuleShell>
  );
}
