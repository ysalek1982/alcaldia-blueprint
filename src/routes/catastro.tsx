import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { StatCard } from "@/components/StatCard";
import { DataTable } from "@/components/DataTable";
import { predios } from "@/lib/mock-data";
import { MapPinned, Layers, AlertTriangle, Plus, Map } from "lucide-react";

export const Route = createFileRoute("/catastro")({
  head: () => ({ meta: [{ title: "Catastro Digital — G.A.M. Buena Vista" }] }),
  component: Catastro,
});

function Catastro() {
  return (
    <AppShell
      title="Catastro Digital"
      subtitle="Predios, zonas, avalúos y trazabilidad de cambios"
      actions={
        <>
          <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
            <Plus className="h-4 w-4" /> Registrar predio
          </button>
          <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-muted">
            <Map className="h-4 w-4" /> Ver mapa
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Predios registrados" value="9.482" hint="Gestión 2026" icon={MapPinned} accent="primary" />
        <StatCard label="Zonas / UV" value="24" hint="3 urbanas, 21 rurales" icon={Layers} accent="secondary" />
        <StatCard label="Observaciones" value="138" hint="Pendientes de regularización" icon={AlertTriangle} accent="accent" />
        <StatCard label="Avalúo total" value="Bs. 482M" hint="Suma del padrón" icon={MapPinned} accent="primary" />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground">Mapa catastral</h3>
          <p className="text-xs text-muted-foreground">Vista esquemática · listo para integrar Mapbox / Leaflet</p>
          <div className="mt-4 relative rounded-md overflow-hidden border border-border h-72 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/20">
            <svg viewBox="0 0 400 240" className="absolute inset-0 w-full h-full">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity=".08" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="400" height="240" fill="url(#grid)" className="text-foreground" />
              {/* Manzanas */}
              <g className="text-primary" fill="currentColor" fillOpacity=".18" stroke="currentColor" strokeWidth="1">
                <rect x="40" y="40" width="80" height="50" />
                <rect x="130" y="40" width="60" height="50" />
                <rect x="200" y="40" width="90" height="70" />
                <rect x="40" y="100" width="60" height="60" />
                <rect x="110" y="100" width="80" height="60" />
                <rect x="200" y="120" width="60" height="40" />
                <rect x="270" y="120" width="80" height="40" />
                <rect x="40" y="170" width="100" height="40" />
                <rect x="150" y="170" width="120" height="40" />
                <rect x="280" y="170" width="70" height="40" />
              </g>
              {/* Pins */}
              <g>
                <circle cx="80" cy="65" r="5" className="fill-destructive" />
                <circle cx="160" cy="65" r="5" className="fill-accent" />
                <circle cx="245" cy="75" r="5" className="fill-primary" />
                <circle cx="150" cy="130" r="5" className="fill-primary" />
                <circle cx="310" cy="140" r="5" className="fill-secondary" />
              </g>
            </svg>
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-3 text-[11px] bg-card/90 backdrop-blur border border-border rounded-md px-3 py-2">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Al día</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent" /> Observado</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" /> Mora</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-secondary" /> Regularización</span>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground">Zonas / UV destacadas</h3>
          <p className="text-xs text-muted-foreground">Por densidad de predios</p>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { z: "UV-03 · Centro", n: 412, d: 92 },
              { z: "UV-08 · El Carmen", n: 318, d: 78 },
              { z: "UV-12 · Las Palmeras", n: 287, d: 65 },
              { z: "UV-22 · Periurbano", n: 198, d: 41 },
            ].map((r) => (
              <li key={r.z}>
                <div className="flex justify-between text-xs">
                  <span className="text-foreground font-medium">{r.z}</span>
                  <span className="text-muted-foreground">{r.n} predios</span>
                </div>
                <div className="h-1.5 mt-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${r.d}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-foreground mb-3">Padrón de predios</h3>
        <DataTable
          columns={[
            { key: "codigo", label: "Código catastral" },
            { key: "zona", label: "Zona" },
            { key: "direccion", label: "Dirección" },
            { key: "propietario", label: "Propietario" },
            { key: "superficie", label: "Sup. (m²)", className: "text-right", render: (r) => r.superficie.toLocaleString("es-BO") },
            { key: "avaluo", label: "Avalúo (Bs.)", className: "text-right", render: (r) => r.avaluo.toLocaleString("es-BO") },
          ]}
          rows={predios}
        />
      </div>
    </AppShell>
  );
}
