import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ModuleShell } from "@/components/ModuleShell";
import { CrudListPage, SelectFilter } from "@/components/CrudListPage";
import { Badge } from "@/components/DataTable";
import { Field, TextInput, Select } from "@/components/FormSheet";
import { navRRHH } from "@/lib/module-navs";
import { useFuncionariosStore, type Funcionario } from "@/lib/stores";

export const Route = createFileRoute("/rrhh/funcionarios")({
  head: () => ({ meta: [{ title: "Funcionarios — RRHH" }] }),
  component: FuncionariosPage,
});

const SECRETARIAS = ["Administrativa", "Finanzas", "Planificación", "Recaudaciones", "Obras Públicas", "Despacho", "Servicios"];
const ESTADOS: Funcionario["estado"][] = ["Activo", "Vacaciones", "Licencia", "Baja"];

function FuncionariosPage() {
  return (
    <ModuleShell
      title="Funcionarios"
      subtitle="Legajo de personal · alta, edición y baja"
      subnav={navRRHH}
      breadcrumb={[{ label: "RRHH", to: "/rrhh" }, { label: "Funcionarios" }]}
    >
      <CrudListPage
        store={useFuncionariosStore}
        searchPlaceholder="Buscar por CI, nombre o cargo…"
        createLabel="Nuevo funcionario"
        columns={[
          { key: "ci", label: "CI" },
          { key: "nombre", label: "Funcionario" },
          { key: "cargo", label: "Cargo" },
          { key: "secretaria", label: "Secretaría" },
          { key: "salario", label: "Salario (Bs.)", className: "text-right", render: (r) => r.salario.toLocaleString("es-BO") },
          { key: "estado", label: "Estado", render: (r) => (
            <Badge tone={r.estado === "Activo" ? "primary" : r.estado === "Baja" ? "destructive" : "accent"}>{r.estado}</Badge>
          )},
        ]}
        filters={(state, set) => (
          <>
            <SelectFilter value={state.secretaria ?? "all"} onChange={(v) => set("secretaria", v)} placeholder="Todas las secretarías" options={SECRETARIAS.map((s) => ({ value: s, label: s }))} />
            <SelectFilter value={state.estado ?? "all"} onChange={(v) => set("estado", v)} placeholder="Todos los estados" options={ESTADOS.map((s) => ({ value: s, label: s }))} />
          </>
        )}
        renderForm={({ editing, close }) => <FuncionarioForm editing={editing} close={close} />}
      />
    </ModuleShell>
  );
}

function FuncionarioForm({ editing, close }: { editing: Funcionario | null; close: () => void }) {
  const create = useFuncionariosStore((s) => s.create);
  const update = useFuncionariosStore((s) => s.update);
  const [form, setForm] = useState<Partial<Funcionario>>(editing ?? {
    ci: "", nombre: "", cargo: "", secretaria: SECRETARIAS[0], estado: "Activo", ingreso: new Date().toISOString().slice(0, 10), salario: 0,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ci || !form.nombre || !form.cargo) { alert("CI, nombre y cargo son obligatorios"); return; }
    if (editing) update(editing.id, form);
    else create(form as Omit<Funcionario, "id">);
    close();
  };

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-2 gap-x-4">
        <Field label="CI">
          <TextInput value={form.ci ?? ""} onChange={(e) => setForm({ ...form, ci: e.target.value })} placeholder="1234567" />
        </Field>
        <Field label="Nombre completo">
          <TextInput value={form.nombre ?? ""} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
        </Field>
        <Field label="Cargo">
          <TextInput value={form.cargo ?? ""} onChange={(e) => setForm({ ...form, cargo: e.target.value })} />
        </Field>
        <Field label="Secretaría">
          <Select value={form.secretaria} onChange={(e) => setForm({ ...form, secretaria: e.target.value })}>
            {SECRETARIAS.map((s) => <option key={s} value={s}>{s}</option>)}
          </Select>
        </Field>
        <Field label="Fecha de ingreso">
          <TextInput type="date" value={form.ingreso ?? ""} onChange={(e) => setForm({ ...form, ingreso: e.target.value })} />
        </Field>
        <Field label="Salario básico (Bs.)">
          <TextInput type="number" value={form.salario ?? 0} onChange={(e) => setForm({ ...form, salario: Number(e.target.value) })} />
        </Field>
        <Field label="Email">
          <TextInput type="email" value={form.email ?? ""} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </Field>
        <Field label="Teléfono">
          <TextInput value={form.telefono ?? ""} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
        </Field>
        <Field label="Estado">
          <Select value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value as Funcionario["estado"] })}>
            {ESTADOS.map((s) => <option key={s} value={s}>{s}</option>)}
          </Select>
        </Field>
      </div>
      <div className="flex justify-end gap-2 mt-2">
        <button type="button" onClick={close} className="h-9 px-4 rounded-md border border-border bg-card text-sm">Cancelar</button>
        <button type="submit" className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">{editing ? "Guardar cambios" : "Crear funcionario"}</button>
      </div>
    </form>
  );
}
