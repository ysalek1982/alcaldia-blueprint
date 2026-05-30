import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { CrudListPage, SelectFilter } from "@/components/CrudListPage";
import { Badge } from "@/components/DataTable";
import { Field, TextInput, Select } from "@/components/FormSheet";
import { navExpedientes } from "@/lib/module-navs";
import { useExpedientesStore, type Expediente } from "@/lib/stores";
import { useState } from "react";

export const Route = createFileRoute("/expedientes/lista")({
  head: () => ({ meta: [{ title: "Expedientes" }] }),
  component: () => (
    <ModuleShell title="Expedientes" subtitle="Trámites con trazabilidad y firma digital"
      subnav={navExpedientes}
      breadcrumb={[{ label: "Expedientes", to: "/expedientes" }, { label: "Lista" }]}>
      <CrudListPage
        store={useExpedientesStore}
        searchPlaceholder="Buscar por código, tipo o ciudadano…"
        createLabel="Abrir expediente"
        filters={(s, set) => (
          <SelectFilter value={s.estado ?? "all"} onChange={(v) => set("estado", v)} placeholder="Todos los estados" options={["En revisión", "Aprobado", "Observado", "Derivado", "Archivado"].map((x) => ({ value: x, label: x }))} />
        )}
        columns={[
          { key: "codigo", label: "Código" },
          { key: "tipo", label: "Tipo" },
          { key: "ciudadano", label: "Solicitante" },
          { key: "responsable", label: "Responsable" },
          { key: "dias", label: "Días", className: "text-right" },
          { key: "estado", label: "Estado", render: (r) => (
            <Badge tone={r.estado === "Aprobado" ? "primary" : r.estado === "Observado" ? "destructive" : "accent"}>{r.estado}</Badge>
          )},
        ]}
        renderForm={({ editing, close }) => <ExpForm editing={editing} close={close} />}
      />
    </ModuleShell>
  ),
});

function ExpForm({ editing, close }: { editing: Expediente | null; close: () => void }) {
  const create = useExpedientesStore((s) => s.create);
  const update = useExpedientesStore((s) => s.update);
  const [f, setF] = useState<Partial<Expediente>>(editing ?? {
    codigo: `BV-2026-${Math.floor(Math.random() * 9000) + 100}`, tipo: "", ciudadano: "", estado: "En revisión", dias: 0,
    abierto: new Date().toISOString().slice(0, 10), responsable: "",
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); editing ? update(editing.id, f) : create(f as Omit<Expediente, "id">); close(); }}>
      <div className="grid grid-cols-2 gap-x-3">
        <Field label="Código"><TextInput value={f.codigo ?? ""} onChange={(e) => setF({ ...f, codigo: e.target.value })} /></Field>
        <Field label="Tipo de trámite"><TextInput value={f.tipo ?? ""} onChange={(e) => setF({ ...f, tipo: e.target.value })} /></Field>
        <Field label="Solicitante"><TextInput value={f.ciudadano ?? ""} onChange={(e) => setF({ ...f, ciudadano: e.target.value })} /></Field>
        <Field label="Responsable"><TextInput value={f.responsable ?? ""} onChange={(e) => setF({ ...f, responsable: e.target.value })} /></Field>
        <Field label="Estado"><Select value={f.estado} onChange={(e) => setF({ ...f, estado: e.target.value as Expediente["estado"] })}>
          {["En revisión", "Aprobado", "Observado", "Derivado", "Archivado"].map((x) => <option key={x}>{x}</option>)}
        </Select></Field>
        <Field label="Abierto"><TextInput type="date" value={f.abierto ?? ""} onChange={(e) => setF({ ...f, abierto: e.target.value })} /></Field>
      </div>
      <div className="flex justify-end gap-2"><button type="button" onClick={close} className="h-9 px-4 rounded-md border border-border bg-card text-sm">Cancelar</button><button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">{editing ? "Guardar" : "Abrir"}</button></div>
    </form>
  );
}
