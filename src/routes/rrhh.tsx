import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { StatCard } from "@/components/StatCard";
import { Badge, DataTable } from "@/components/DataTable";
import { funcionarios } from "@/lib/mock-data";
import { Users, UserPlus, Clock, FileSignature, Download, Plus } from "lucide-react";

export const Route = createFileRoute("/rrhh")({
  head: () => ({ meta: [{ title: "Recursos Humanos — G.A.M. Buena Vista" }] }),
  component: RRHH,
});

function RRHH() {
  return (
    <AppShell
      title="Recursos Humanos"
      subtitle="Legajo, asistencia, planillas y movimientos"
      actions={
        <>
          <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
            <Plus className="h-4 w-4" /> Nuevo funcionario
          </button>
          <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-muted">
            <Download className="h-4 w-4" /> Exportar planilla
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Funcionarios" value="218" hint="14 secretarías" icon={Users} accent="primary" />
        <StatCard label="Altas del mes" value="4" hint="2 contratos eventuales" icon={UserPlus} accent="secondary" />
        <StatCard label="Solicitudes pendientes" value="12" hint="Vacaciones / permisos" icon={Clock} accent="accent" />
        <StatCard label="Planilla septiembre" value="Bs. 1.842.300" hint="Pendiente aprobación" icon={FileSignature} accent="primary" />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Legajo de funcionarios</h3>
          <input
            placeholder="Buscar por CI o nombre…"
            className="h-9 px-3 rounded-md border border-input bg-card text-sm w-72 focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <DataTable
          columns={[
            { key: "ci", label: "CI" },
            { key: "nombre", label: "Funcionario" },
            { key: "cargo", label: "Cargo" },
            { key: "secretaria", label: "Secretaría" },
            { key: "ingreso", label: "Ingreso" },
            {
              key: "estado", label: "Estado",
              render: (r) => <Badge tone={r.estado === "Activo" ? "primary" : "accent"}>{r.estado}</Badge>,
            },
          ]}
          rows={funcionarios}
        />
      </div>
    </AppShell>
  );
}
