import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ModuleShell } from "@/components/ModuleShell";
import { Badge, DataTable } from "@/components/DataTable";
import { EntityToolbar, SelectFilter } from "@/components/EntityToolbar";
import { FormSheet, Field, TextInput, Select } from "@/components/FormSheet";
import { navRRHH } from "@/lib/module-navs";
import { useSolicitudesStore, useFuncionariosStore, type Solicitud } from "@/lib/stores";
import { CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/rrhh/solicitudes")({
  head: () => ({ meta: [{ title: "Solicitudes — RRHH" }] }),
  component: SolicitudesPage,
});

function SolicitudesPage() {
  const list = useSolicitudesStore((s) => s.list);
  const update = useSolicitudesStore((s) => s.update);
  const create = useSolicitudesStore((s) => s.create);
  useSolicitudesStore((s) => s.rows);
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);

  const rows = list({ estado: filter === "all" ? undefined : filter }).rows;

  return (
    <ModuleShell title="Solicitudes" subtitle="Vacaciones, permisos y licencias — workflow de aprobación" subnav={navRRHH}
      breadcrumb={[{ label: "RRHH", to: "/rrhh" }, { label: "Solicitudes" }]}>
      <EntityToolbar
        onCreate={() => setOpen(true)} createLabel="Nueva solicitud"
        filters={<SelectFilter value={filter} onChange={setFilter} placeholder="Todos los estados" options={[
          { value: "Pendiente", label: "Pendiente" },
          { value: "Aprobada", label: "Aprobada" },
          { value: "Rechazada", label: "Rechazada" },
        ]} />}
      />
      <DataTable
        columns={[
          { key: "funcionario", label: "Funcionario" },
          { key: "tipo", label: "Tipo" },
          { key: "desde", label: "Desde" },
          { key: "hasta", label: "Hasta" },
          { key: "dias", label: "Días", className: "text-right" },
          { key: "estado", label: "Estado", render: (r) => (
            <Badge tone={r.estado === "Aprobada" ? "primary" : r.estado === "Pendiente" ? "accent" : "destructive"}>{r.estado}</Badge>
          )},
          { key: "__a", label: "", className: "text-right", render: (r) => r.estado === "Pendiente" ? (
            <div className="flex justify-end gap-1">
              <button onClick={() => update(r.id, { estado: "Aprobada" })} className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                <CheckCircle2 className="h-3 w-3" /> Aprobar
              </button>
              <button onClick={() => update(r.id, { estado: "Rechazada" })} className="ml-2 inline-flex items-center gap-1 text-xs text-destructive hover:underline">
                <XCircle className="h-3 w-3" /> Rechazar
              </button>
            </div>
          ) : <span className="text-[11px] text-muted-foreground">—</span>},
        ]}
        rows={rows}
      />

      <FormSheet open={open} onClose={() => setOpen(false)} title="Nueva solicitud">
        <NuevaSolicitud onSave={(s) => { create(s); setOpen(false); }} />
      </FormSheet>
    </ModuleShell>
  );
}

function NuevaSolicitud({ onSave }: { onSave: (s: Omit<Solicitud, "id">) => void }) {
  const funcionarios = useFuncionariosStore((s) => s.rows);
  const [form, setForm] = useState<Omit<Solicitud, "id">>({
    funcionario: funcionarios[0]?.nombre ?? "", tipo: "Vacación", desde: "", hasta: "", dias: 1, estado: "Pendiente",
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
      <Field label="Funcionario">
        <Select value={form.funcionario} onChange={(e) => setForm({ ...form, funcionario: e.target.value })}>
          {funcionarios.map((f) => <option key={f.id} value={f.nombre}>{f.nombre}</option>)}
        </Select>
      </Field>
      <Field label="Tipo">
        <Select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value as Solicitud["tipo"] })}>
          <option>Vacación</option><option>Permiso</option><option>Licencia médica</option>
        </Select>
      </Field>
      <div className="grid grid-cols-3 gap-x-3">
        <Field label="Desde"><TextInput type="date" value={form.desde} onChange={(e) => setForm({ ...form, desde: e.target.value })} /></Field>
        <Field label="Hasta"><TextInput type="date" value={form.hasta} onChange={(e) => setForm({ ...form, hasta: e.target.value })} /></Field>
        <Field label="Días"><TextInput type="number" value={form.dias} onChange={(e) => setForm({ ...form, dias: Number(e.target.value) })} /></Field>
      </div>
      <div className="flex justify-end"><button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">Crear solicitud</button></div>
    </form>
  );
}
