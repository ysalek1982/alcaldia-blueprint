import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { CrudListPage, SelectFilter } from "@/components/CrudListPage";
import { Badge } from "@/components/DataTable";
import { Field, TextInput, Select } from "@/components/FormSheet";
import { navPortal } from "@/lib/module-navs";
import { useReclamosStore, type Reclamo } from "@/lib/stores";
import { useState } from "react";

export const Route = createFileRoute("/portal/reclamos")({
  head: () => ({ meta: [{ title: "Reclamos ciudadanos" }] }),
  component: () => (
    <ModuleShell title="Reclamos ciudadanos" subtitle="Reportes de alumbrado, aseo, vías y áreas verdes"
      subnav={navPortal}
      breadcrumb={[{ label: "Portal", to: "/portal" }, { label: "Reclamos" }]}>
      <CrudListPage
        store={useReclamosStore}
        searchPlaceholder="Buscar por código o ciudadano…"
        createLabel="Nuevo reclamo"
        filters={(s, set) => (
          <SelectFilter value={s.estado ?? "all"} onChange={(v) => set("estado", v)} placeholder="Todos los estados" options={["Recibido", "En atención", "Resuelto", "Rechazado"].map((x) => ({ value: x, label: x }))} />
        )}
        columns={[
          { key: "codigo", label: "Código" },
          { key: "ciudadano", label: "Ciudadano" },
          { key: "categoria", label: "Categoría", render: (r) => <Badge tone="secondary">{r.categoria}</Badge> },
          { key: "zona", label: "Zona" },
          { key: "fecha", label: "Fecha" },
          { key: "estado", label: "Estado", render: (r) => <Badge tone={r.estado === "Resuelto" ? "primary" : r.estado === "Rechazado" ? "destructive" : "accent"}>{r.estado}</Badge> },
        ]}
        renderForm={({ editing, close }) => <RecForm editing={editing} close={close} />}
      />
    </ModuleShell>
  ),
});

function RecForm({ editing, close }: { editing: Reclamo | null; close: () => void }) {
  const create = useReclamosStore((s) => s.create);
  const update = useReclamosStore((s) => s.update);
  const [f, setF] = useState<Partial<Reclamo>>(editing ?? {
    codigo: `REC-2026-${String(Math.floor(Math.random() * 9000) + 100).padStart(4, "0")}`,
    ciudadano: "", categoria: "Alumbrado", zona: "", estado: "Recibido", fecha: new Date().toISOString().slice(0, 10),
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); editing ? update(editing.id, f) : create(f as Omit<Reclamo, "id">); close(); }}>
      <div className="grid grid-cols-2 gap-x-3">
        <Field label="Ciudadano"><TextInput value={f.ciudadano ?? ""} onChange={(e) => setF({ ...f, ciudadano: e.target.value })} /></Field>
        <Field label="Zona"><TextInput value={f.zona ?? ""} onChange={(e) => setF({ ...f, zona: e.target.value })} placeholder="UV-08" /></Field>
        <Field label="Categoría">
          <Select value={f.categoria} onChange={(e) => setF({ ...f, categoria: e.target.value as Reclamo["categoria"] })}>
            {["Alumbrado", "Aseo", "Vías", "Áreas verdes", "Otros"].map((x) => <option key={x}>{x}</option>)}
          </Select>
        </Field>
        <Field label="Estado">
          <Select value={f.estado} onChange={(e) => setF({ ...f, estado: e.target.value as Reclamo["estado"] })}>
            {["Recibido", "En atención", "Resuelto", "Rechazado"].map((x) => <option key={x}>{x}</option>)}
          </Select>
        </Field>
      </div>
      <div className="flex justify-end gap-2"><button type="button" onClick={close} className="h-9 px-4 rounded-md border border-border bg-card text-sm">Cancelar</button><button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">{editing ? "Guardar" : "Crear"}</button></div>
    </form>
  );
}
