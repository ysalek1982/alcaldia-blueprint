import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ModuleShell } from "@/components/ModuleShell";
import { CrudListPage } from "@/components/CrudListPage";
import { Field, TextInput } from "@/components/FormSheet";
import { navCatastro } from "@/lib/module-navs";
import { useZonasStore, type Zona } from "@/lib/stores";

export const Route = createFileRoute("/catastro/zonas")({
  head: () => ({ meta: [{ title: "Zonas / UV — Catastro" }] }),
  component: ZonasPage,
});

function ZonasPage() {
  return (
    <ModuleShell title="Zonas y UV" subtitle="Valores oficiales por unidad vecinal"
      subnav={navCatastro}
      breadcrumb={[{ label: "Catastro", to: "/catastro" }, { label: "Zonas" }]}>
      <CrudListPage
        store={useZonasStore}
        searchPlaceholder="Buscar por código o nombre…"
        createLabel="Nueva zona"
        columns={[
          { key: "codigo", label: "Código" },
          { key: "nombre", label: "Nombre" },
          { key: "valorM2", label: "Valor m² (Bs.)", className: "text-right", render: (r) => r.valorM2.toLocaleString("es-BO") },
          { key: "coeficiente", label: "Coeficiente", className: "text-right" },
          { key: "predios", label: "Predios", className: "text-right" },
        ]}
        renderForm={({ editing, close }) => <ZonaForm editing={editing} close={close} />}
      />
    </ModuleShell>
  );
}

function ZonaForm({ editing, close }: { editing: Zona | null; close: () => void }) {
  const create = useZonasStore((s) => s.create);
  const update = useZonasStore((s) => s.update);
  const [f, setF] = useState<Partial<Zona>>(editing ?? { codigo: "UV-", nombre: "", valorM2: 0, coeficiente: 1, predios: 0 });
  return (
    <form onSubmit={(e) => { e.preventDefault(); editing ? update(editing.id, f) : create(f as Omit<Zona, "id">); close(); }}>
      <div className="grid grid-cols-2 gap-x-3">
        <Field label="Código"><TextInput value={f.codigo ?? ""} onChange={(e) => setF({ ...f, codigo: e.target.value })} /></Field>
        <Field label="Nombre"><TextInput value={f.nombre ?? ""} onChange={(e) => setF({ ...f, nombre: e.target.value })} /></Field>
        <Field label="Valor m² (Bs.)"><TextInput type="number" value={f.valorM2 ?? 0} onChange={(e) => setF({ ...f, valorM2: Number(e.target.value) })} /></Field>
        <Field label="Coeficiente"><TextInput type="number" step="0.1" value={f.coeficiente ?? 1} onChange={(e) => setF({ ...f, coeficiente: Number(e.target.value) })} /></Field>
        <Field label="Predios"><TextInput type="number" value={f.predios ?? 0} onChange={(e) => setF({ ...f, predios: Number(e.target.value) })} /></Field>
      </div>
      <div className="flex justify-end gap-2"><button type="button" onClick={close} className="h-9 px-4 rounded-md border border-border bg-card text-sm">Cancelar</button><button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">{editing ? "Guardar" : "Crear"}</button></div>
    </form>
  );
}
