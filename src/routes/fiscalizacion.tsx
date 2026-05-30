import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { StatCard } from "@/components/StatCard";
import { navFiscalizacion } from "@/lib/module-navs";
import { useNotificacionesStore, useCasosStore } from "@/lib/stores";
import { Bell, ShieldCheck, Gavel, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/fiscalizacion")({
  head: () => ({ meta: [{ title: "Fiscalización — G.A.M. Buena Vista" }] }),
  component: FiscalizacionResumen,
});

function FiscalizacionResumen() {
  const nots = useNotificacionesStore((s) => s.rows);
  const casos = useCasosStore((s) => s.rows);
  const coactivos = casos.filter((c) => c.etapa === "Coactivo").length;

  return (
    <ModuleShell title="Fiscalización tributaria" subtitle="Notificaciones, casos y coactivo"
      subnav={navFiscalizacion}
      breadcrumb={[{ label: "Módulos", to: "/dashboard" }, { label: "Fiscalización" }]}>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Notificaciones" value={nots.length.toString()} hint="Emitidas en gestión" icon={Bell} accent="primary" />
        <StatCard label="Casos abiertos" value={casos.length.toString()} hint="Activos" icon={ShieldCheck} accent="secondary" />
        <StatCard label="En coactivo" value={coactivos.toString()} hint="Etapa judicial" icon={Gavel} accent="destructive" />
        <StatCard label="Reincidentes" value={nots.filter((n) => n.estado === "Reincidente").length.toString()} hint="Alertas" icon={AlertTriangle} accent="accent" />
      </div>
    </ModuleShell>
  );
}
