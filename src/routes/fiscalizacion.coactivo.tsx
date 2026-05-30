import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { Badge, DataTable } from "@/components/DataTable";
import { navFiscalizacion } from "@/lib/module-navs";
import { useCasosStore } from "@/lib/stores";

export const Route = createFileRoute("/fiscalizacion/coactivo")({
  head: () => ({ meta: [{ title: "Coactivo" }] }),
  component: () => {
    const rows = useCasosStore((s) => s.rows).filter((c) => c.etapa === "Coactivo");
    return (
      <ModuleShell title="Vía coactiva" subtitle="Casos en proceso judicial coactivo"
        subnav={navFiscalizacion}
        breadcrumb={[{ label: "Fiscalización", to: "/fiscalizacion" }, { label: "Coactivo" }]}>
        <DataTable
          columns={[
            { key: "codigo", label: "Código" },
            { key: "contribuyente", label: "Contribuyente" },
            { key: "monto", label: "Monto (Bs.)", className: "text-right font-medium", render: (r) => r.monto.toLocaleString("es-BO") },
            { key: "abierto", label: "Abierto" },
            { key: "fiscalizador", label: "Responsable" },
            { key: "__a", label: "Estado", render: () => <Badge tone="destructive">Coactivo activo</Badge> },
          ]}
          rows={rows}
        />
      </ModuleShell>
    );
  },
});
