import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ModuleShell } from "@/components/ModuleShell";
import { Badge, DataTable } from "@/components/DataTable";
import { EntityToolbar } from "@/components/EntityToolbar";
import { FormSheet, Field, TextInput, Select } from "@/components/FormSheet";
import { navRRHH } from "@/lib/module-navs";
import { usePlanillasStore, useFuncionariosStore, type Planilla } from "@/lib/stores";
import { CheckCircle2, FileSignature } from "lucide-react";
import { downloadCSV } from "@/lib/csv";
import { toast } from "sonner";


export const Route = createFileRoute("/rrhh/planillas")({
  head: () => ({ meta: [{ title: "Planillas — RRHH" }] }),
  component: PlanillasPage,
});

function PlanillasPage() {
  const planillas = usePlanillasStore((s) => s.rows);
  const create = usePlanillasStore((s) => s.create);
  const update = usePlanillasStore((s) => s.update);
  const funcionarios = useFuncionariosStore((s) => s.rows);
  const [open, setOpen] = useState(false);
  const [detalle, setDetalle] = useState<Planilla | null>(null);

  const generar = (periodo: string) => {
    const activos = funcionarios.filter((f) => f.estado === "Activo");
    const total = activos.reduce((s, f) => s + f.salario, 0);
    create({ periodo, total, funcionarios: activos.length, estado: "Borrador", generada: new Date().toISOString().slice(0, 10) });
    setOpen(false);
    toast.success(`Planilla ${periodo} generada`, { description: `${activos.length} funcionarios · Bs. ${total.toLocaleString("es-BO")}` });
  };

  const exportar = () => {
    downloadCSV(`planillas_${new Date().toISOString().slice(0, 10)}`, planillas);
    toast.success(`Exportadas ${planillas.length} planillas a CSV`);
  };


  return (
    <ModuleShell
      title="Planillas"
      subtitle="Generación, aprobación y pago de planillas mensuales"
      subnav={navRRHH}
      breadcrumb={[{ label: "RRHH", to: "/rrhh" }, { label: "Planillas" }]}
    >
      <EntityToolbar onCreate={() => setOpen(true)} createLabel="Generar planilla" onExport={() => alert("Exportar planilla CSV (mock)")} />
      <DataTable
        columns={[
          { key: "periodo", label: "Período" },
          { key: "funcionarios", label: "Funcionarios", className: "text-right" },
          { key: "total", label: "Total (Bs.)", className: "text-right font-medium", render: (r) => r.total.toLocaleString("es-BO") },
          { key: "generada", label: "Generada" },
          { key: "estado", label: "Estado", render: (r) => (
            <Badge tone={r.estado === "Pagada" ? "primary" : r.estado === "Aprobada" ? "secondary" : "accent"}>{r.estado}</Badge>
          )},
          { key: "__a", label: "", className: "text-right", render: (r) => (
            <div className="flex justify-end gap-1">
              <button onClick={() => setDetalle(r)} className="text-xs text-primary hover:underline">Ver detalle</button>
              {r.estado === "Borrador" && (
                <button onClick={() => update(r.id, { estado: "Aprobada" })} className="ml-2 inline-flex items-center gap-1 text-xs text-secondary hover:underline">
                  <CheckCircle2 className="h-3 w-3" /> Aprobar
                </button>
              )}
              {r.estado === "Aprobada" && (
                <button onClick={() => update(r.id, { estado: "Pagada" })} className="ml-2 inline-flex items-center gap-1 text-xs text-primary hover:underline">
                  Marcar pagada
                </button>
              )}
            </div>
          )},
        ]}
        rows={planillas}
      />

      <FormSheet open={open} onClose={() => setOpen(false)} title="Generar nueva planilla" description="Toma los salarios actuales de funcionarios activos">
        <GenerarForm onGenerar={generar} />
      </FormSheet>

      <FormSheet open={!!detalle} onClose={() => setDetalle(null)} title={`Detalle planilla ${detalle?.periodo ?? ""}`} size="lg">
        {detalle && (
          <div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <Card label="Total" value={`Bs. ${detalle.total.toLocaleString("es-BO")}`} />
              <Card label="Funcionarios" value={detalle.funcionarios.toString()} />
              <Card label="Estado" value={detalle.estado} />
            </div>
            <h4 className="font-semibold text-sm mb-2">Líneas por funcionario</h4>
            <DataTable
              columns={[
                { key: "ci", label: "CI" },
                { key: "nombre", label: "Funcionario" },
                { key: "secretaria", label: "Secretaría" },
                { key: "salario", label: "Sueldo (Bs.)", className: "text-right", render: (r) => r.salario.toLocaleString("es-BO") },
                { key: "afp", label: "AFP 12.71%", className: "text-right", render: (r) => (r.salario * 0.1271).toFixed(0) },
                { key: "neto", label: "Neto (Bs.)", className: "text-right font-medium", render: (r) => (r.salario * (1 - 0.1271)).toFixed(0) },
              ]}
              rows={funcionarios.filter((f) => f.estado === "Activo")}
            />
          </div>
        )}
      </FormSheet>
    </ModuleShell>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted/40 rounded-md p-3">
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold mt-1">{value}</div>
    </div>
  );
}

function GenerarForm({ onGenerar }: { onGenerar: (p: string) => void }) {
  const [periodo, setPeriodo] = useState(new Date().toISOString().slice(0, 7));
  return (
    <div>
      <Field label="Período (YYYY-MM)">
        <TextInput value={periodo} onChange={(e) => setPeriodo(e.target.value)} placeholder="2026-10" />
      </Field>
      <Field label="Origen">
        <Select defaultValue="actual"><option value="actual">Funcionarios activos actuales</option></Select>
      </Field>
      <div className="flex justify-end">
        <button onClick={() => onGenerar(periodo)} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium inline-flex items-center gap-2">
          <FileSignature className="h-4 w-4" /> Generar
        </button>
      </div>
    </div>
  );
}
