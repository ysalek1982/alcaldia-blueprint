import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Badge, DataTable } from "@/components/DataTable";
import { tramites } from "@/lib/mock-data";
import { FileText, Plus } from "lucide-react";

export const Route = createFileRoute("/expedientes")({
  head: () => ({ meta: [{ title: "Expedientes — G.A.M. Buena Vista" }] }),
  component: Expedientes,
});

function Expedientes() {
  return (
    <AppShell
      title="Gestión Documental y Expedientes"
      subtitle="Plantillas, firma digital y trazabilidad documental"
      actions={
        <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Abrir expediente
        </button>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { t: "Expedientes abiertos", v: "146" },
          { t: "Documentos firmados", v: "1.284" },
          { t: "Plantillas activas", v: "38" },
        ].map((s) => (
          <div key={s.t} className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{s.t}</div>
                <div className="mt-2 text-2xl font-semibold">{s.v}</div>
              </div>
              <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-foreground mb-3">Expedientes recientes</h3>
        <DataTable
          columns={[
            { key: "codigo", label: "Código" },
            { key: "tipo", label: "Tipo" },
            { key: "ciudadano", label: "Solicitante" },
            { key: "dias", label: "Días", className: "text-right" },
            {
              key: "estado", label: "Estado",
              render: (r) => {
                const tone =
                  r.estado === "Aprobado" ? "primary" :
                  r.estado === "Observado" ? "destructive" :
                  r.estado === "En revisión" ? "accent" : "secondary";
                return <Badge tone={tone}>{r.estado}</Badge>;
              },
            },
          ]}
          rows={tramites}
        />
      </div>
    </AppShell>
  );
}
