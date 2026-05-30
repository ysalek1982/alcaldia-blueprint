import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { StatCard } from "@/components/StatCard";
import { navExpedientes } from "@/lib/module-navs";
import { useExpedientesStore, usePlantillasStore } from "@/lib/stores";
import { FileText, FilePlus, FileSignature } from "lucide-react";

export const Route = createFileRoute("/expedientes")({
  head: () => ({ meta: [{ title: "Expedientes — G.A.M. Buena Vista" }] }),
  component: () => {
    const exps = useExpedientesStore((s) => s.rows);
    const plants = usePlantillasStore((s) => s.rows);
    return (
      <ModuleShell title="Gestión documental" subtitle="Expedientes, plantillas y firmas"
        subnav={navExpedientes}
        breadcrumb={[{ label: "Módulos", to: "/dashboard" }, { label: "Expedientes" }]}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Expedientes abiertos" value={exps.length.toString()} hint="Activos en gestión" icon={FileText} accent="primary" />
          <StatCard label="Plantillas" value={plants.length.toString()} hint="Versionadas" icon={FilePlus} accent="secondary" />
          <StatCard label="Documentos firmados" value="1.284" hint="Acumulado 2026" icon={FileSignature} accent="accent" />
        </div>
      </ModuleShell>
    );
  },
});
