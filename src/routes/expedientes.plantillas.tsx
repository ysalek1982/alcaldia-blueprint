import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { CrudListPage } from "@/components/CrudListPage";
import { Badge } from "@/components/DataTable";
import { Field, TextInput, Select } from "@/components/FormSheet";
import { navExpedientes } from "@/lib/module-navs";
import { usePlantillasStore, type Plantilla } from "@/lib/stores";
import { useState } from "react";

export const Route = createFileRoute("/expedientes/plantillas")({
  head: () => ({ meta: [{ title: "Plantillas" }] }),
  component: () => (
    <ModuleShell title="Plantillas documentales" subtitle="Maestro de documentos versionados"
      subnav={navExpedientes}
      breadcrumb={[{ label: "Expedientes", to: "/expedientes" }, { label: "Plantillas" }]}>
      <CrudListPage
        store={usePlantillasStore}
        searchPlaceholder="Buscar por código o nombre…"
        createLabel="Nueva plantilla"
        columns={[
          { key: "codigo", label: "Código" },
          { key: "nombre", label: "Nombre" },
          { key: "area", label: "Área" },
          { key: "version", label: "Versión" },
          { key: "estado", label: "Estado", render: (r) => <Badge tone={r.estado === "Activa" ? "primary" : "muted"}>{r.estado}</Badge> },
        ]}
        renderForm={({ editing, close }) => <PlantillaForm editing={editing} close={close} />}
      />
    </ModuleShell>
  ),
});

function PlantillaForm({ editing, close }: { editing: Plantilla | null; close: () => void }) {
  const create = usePlantillasStore((s) => s.create);
  const update = usePlantillasStore((s) => s.update);
  const [f, setF] = useState<Partial<Plantilla>>(editing ?? { codigo: "PT-", nombre: "", area: "", version: "v1.0", estado: "Borrador" });
  return (
    <form onSubmit={(e) => { e.preventDefault(); editing ? update(editing.id, f) : create(f as Omit<Plantilla, "id">); close(); }}>
      <div className="grid grid-cols-2 gap-x-3">
        <Field label="Código"><TextInput value={f.codigo ?? ""} onChange={(e) => setF({ ...f, codigo: e.target.value })} /></Field>
        <Field label="Versión"><TextInput value={f.version ?? ""} onChange={(e) => setF({ ...f, version: e.target.value })} /></Field>
      </div>
      <Field label="Nombre"><TextInput value={f.nombre ?? ""} onChange={(e) => setF({ ...f, nombre: e.target.value })} /></Field>
      <Field label="Área"><TextInput value={f.area ?? ""} onChange={(e) => setF({ ...f, area: e.target.value })} /></Field>
      <Field label="Estado"><Select value={f.estado} onChange={(e) => setF({ ...f, estado: e.target.value as Plantilla["estado"] })}><option>Activa</option><option>Borrador</option></Select></Field>
      <div className="flex justify-end gap-2"><button type="button" onClick={close} className="h-9 px-4 rounded-md border border-border bg-card text-sm">Cancelar</button><button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">{editing ? "Guardar" : "Crear"}</button></div>
    </form>
  );
}
