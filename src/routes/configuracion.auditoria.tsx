import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { DataTable, Badge } from "@/components/DataTable";
import { navConfiguracion } from "@/lib/module-navs";
import { useAuditoriaStore } from "@/lib/stores";

export const Route = createFileRoute("/configuracion/auditoria")({
  head: () => ({ meta: [{ title: "Auditoría" }] }),
  component: () => {
    const rows = useAuditoriaStore((s) => s.rows);
    return (
      <ModuleShell title="Auditoría" subtitle="Registro inmutable de acciones críticas"
        subnav={navConfiguracion}
        breadcrumb={[{ label: "Configuración", to: "/configuracion" }, { label: "Auditoría" }]}>
        <DataTable
          columns={[
            { key: "fecha", label: "Fecha" },
            { key: "usuario", label: "Usuario" },
            { key: "accion", label: "Acción", render: (r) => <Badge tone={r.accion === "CREATE" ? "primary" : r.accion === "UPDATE" ? "accent" : "secondary"}>{r.accion}</Badge> },
            { key: "entidad", label: "Entidad" },
            { key: "detalle", label: "Detalle" },
          ]}
          rows={rows}
        />
      </ModuleShell>
    );
  },
});
