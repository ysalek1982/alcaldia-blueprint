import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { Badge, DataTable } from "@/components/DataTable";
import { navFiscalizacion } from "@/lib/module-navs";
import { useCasosStore } from "@/lib/stores";

export const Route = createFileRoute("/fiscalizacion/casos")({
  head: () => ({ meta: [{ title: "Casos — Fiscalización" }] }),
  component: CasosPage,
});

const ETAPAS = ["Apertura", "Notificación", "Intimación", "Coactivo", "Cerrado"] as const;

function CasosPage() {
  const casos = useCasosStore((s) => s.rows);
  const update = useCasosStore((s) => s.update);

  return (
    <ModuleShell title="Casos de fiscalización" subtitle="Apertura → Notificación → Intimación → Coactivo → Cierre"
      subnav={navFiscalizacion}
      breadcrumb={[{ label: "Fiscalización", to: "/fiscalizacion" }, { label: "Casos" }]}>
      <DataTable
        columns={[
          { key: "codigo", label: "Código" },
          { key: "contribuyente", label: "Contribuyente" },
          { key: "monto", label: "Monto (Bs.)", className: "text-right font-medium", render: (r) => r.monto.toLocaleString("es-BO") },
          { key: "fiscalizador", label: "Fiscalizador" },
          { key: "abierto", label: "Abierto" },
          { key: "etapa", label: "Etapa", render: (r) => <Badge tone={r.etapa === "Coactivo" ? "destructive" : r.etapa === "Cerrado" ? "primary" : "accent"}>{r.etapa}</Badge> },
          { key: "__a", label: "Avanzar", render: (r) => {
            const idx = ETAPAS.indexOf(r.etapa);
            const next = ETAPAS[idx + 1];
            return next ? (
              <button onClick={() => update(r.id, { etapa: next })} className="text-xs text-primary hover:underline">→ {next}</button>
            ) : <span className="text-[11px] text-muted-foreground">—</span>;
          }},
        ]}
        rows={casos}
      />
    </ModuleShell>
  );
}
