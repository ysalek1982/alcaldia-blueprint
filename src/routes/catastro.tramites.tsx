import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { navCatastro } from "@/lib/module-navs";
import { Layers, Combine, Scissors, Pencil } from "lucide-react";

export const Route = createFileRoute("/catastro/tramites")({
  head: () => ({ meta: [{ title: "Trámites técnicos — Catastro" }] }),
  component: TramitesTec,
});

const TIPOS = [
  { i: Pencil, t: "Mutación", d: "Cambio de propietario por compraventa, herencia o donación.", n: 6 },
  { i: Combine, t: "Fusión de predios", d: "Unificación de dos o más predios contiguos.", n: 2 },
  { i: Scissors, t: "División / Loteo", d: "Subdivisión de un predio mayor en lotes independientes.", n: 3 },
  { i: Layers, t: "Reajuste de límites", d: "Corrección topográfica entre predios colindantes.", n: 1 },
];

function TramitesTec() {
  return (
    <ModuleShell title="Trámites técnicos" subtitle="Mutaciones, fusiones y divisiones catastrales"
      subnav={navCatastro}
      breadcrumb={[{ label: "Catastro", to: "/catastro" }, { label: "Trámites" }]}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {TIPOS.map((x) => {
          const Icon = x.i;
          return (
            <div key={x.t} className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center"><Icon className="h-5 w-5" /></div>
                <span className="text-xs bg-accent/30 px-2 py-0.5 rounded-full">{x.n} en curso</span>
              </div>
              <div className="mt-4 font-semibold">{x.t}</div>
              <p className="text-xs text-muted-foreground mt-1">{x.d}</p>
              <button onClick={() => alert(`Apertura de trámite "${x.t}" (mock)`)} className="mt-4 w-full h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium">Iniciar trámite</button>
            </div>
          );
        })}
      </div>
    </ModuleShell>
  );
}
