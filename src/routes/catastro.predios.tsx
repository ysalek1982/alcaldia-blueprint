import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ModuleShell } from "@/components/ModuleShell";
import { CrudListPage, SelectFilter } from "@/components/CrudListPage";
import { Badge } from "@/components/DataTable";
import { Field, TextInput, Select } from "@/components/FormSheet";
import { navCatastro } from "@/lib/module-navs";
import { usePrediosStore, useZonasStore, type Predio } from "@/lib/stores";

export const Route = createFileRoute("/catastro/predios")({
  head: () => ({ meta: [{ title: "Predios — Catastro" }] }),
  component: PrediosPage,
});

const USOS: Predio["uso"][] = ["Residencial", "Comercial", "Industrial", "Mixto", "Baldío"];

function PrediosPage() {
  const zonas = useZonasStore((s) => s.rows);
  return (
    <ModuleShell title="Predios" subtitle="Padrón catastral — ficha técnica por predio"
      subnav={navCatastro}
      breadcrumb={[{ label: "Catastro", to: "/catastro" }, { label: "Predios" }]}>
      <CrudListPage
        store={usePrediosStore}
        searchPlaceholder="Buscar por código, dirección o propietario…"
        createLabel="Nuevo predio"
        filters={(s, set) => (
          <>
            <SelectFilter value={s.zona ?? "all"} onChange={(v) => set("zona", v)} placeholder="Todas las zonas" options={zonas.map((z) => ({ value: z.codigo, label: z.codigo }))} />
            <SelectFilter value={s.uso ?? "all"} onChange={(v) => set("uso", v)} placeholder="Todos los usos" options={USOS.map((u) => ({ value: u, label: u }))} />
          </>
        )}
        columns={[
          { key: "codigo", label: "Código catastral" },
          { key: "zona", label: "Zona / UV" },
          { key: "direccion", label: "Dirección" },
          { key: "propietario", label: "Propietario" },
          { key: "superficie", label: "Sup. (m²)", className: "text-right", render: (r) => r.superficie.toLocaleString("es-BO") },
          { key: "avaluo", label: "Avalúo (Bs.)", className: "text-right", render: (r) => r.avaluo.toLocaleString("es-BO") },
          { key: "uso", label: "Uso", render: (r) => <Badge tone="secondary">{r.uso}</Badge> },
          { key: "estado", label: "Estado", render: (r) => <Badge tone={r.estado === "Activo" ? "primary" : "accent"}>{r.estado}</Badge> },
        ]}
        renderForm={({ editing, close }) => <PredioForm editing={editing} close={close} />}
      />
    </ModuleShell>
  );
}

function PredioForm({ editing, close }: { editing: Predio | null; close: () => void }) {
  const create = usePrediosStore((s) => s.create);
  const update = usePrediosStore((s) => s.update);
  const zonas = useZonasStore((s) => s.rows);
  const [f, setF] = useState<Partial<Predio>>(editing ?? { codigo: "BV-", zona: zonas[0]?.codigo ?? "UV-03", direccion: "", propietario: "", superficie: 0, avaluo: 0, uso: "Residencial", estado: "Activo" });
  return (
    <form onSubmit={(e) => { e.preventDefault(); editing ? update(editing.id, f) : create(f as Omit<Predio, "id">); close(); }}>
      <div className="grid grid-cols-2 gap-x-3">
        <Field label="Código catastral"><TextInput value={f.codigo ?? ""} onChange={(e) => setF({ ...f, codigo: e.target.value })} /></Field>
        <Field label="Zona / UV">
          <Select value={f.zona} onChange={(e) => setF({ ...f, zona: e.target.value })}>
            {zonas.map((z) => <option key={z.id}>{z.codigo}</option>)}
          </Select>
        </Field>
      </div>
      <Field label="Dirección"><TextInput value={f.direccion ?? ""} onChange={(e) => setF({ ...f, direccion: e.target.value })} /></Field>
      <Field label="Propietario"><TextInput value={f.propietario ?? ""} onChange={(e) => setF({ ...f, propietario: e.target.value })} /></Field>
      <div className="grid grid-cols-3 gap-x-3">
        <Field label="Superficie (m²)"><TextInput type="number" value={f.superficie ?? 0} onChange={(e) => setF({ ...f, superficie: Number(e.target.value) })} /></Field>
        <Field label="Avalúo (Bs.)"><TextInput type="number" value={f.avaluo ?? 0} onChange={(e) => setF({ ...f, avaluo: Number(e.target.value) })} /></Field>
        <Field label="Uso">
          <Select value={f.uso} onChange={(e) => setF({ ...f, uso: e.target.value as Predio["uso"] })}>
            {USOS.map((u) => <option key={u}>{u}</option>)}
          </Select>
        </Field>
      </div>
      <Field label="Estado">
        <Select value={f.estado} onChange={(e) => setF({ ...f, estado: e.target.value as Predio["estado"] })}>
          <option>Activo</option><option>En revisión</option><option>Suspendido</option>
        </Select>
      </Field>
      <div className="flex justify-end gap-2"><button type="button" onClick={close} className="h-9 px-4 rounded-md border border-border bg-card text-sm">Cancelar</button><button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">{editing ? "Guardar" : "Crear"}</button></div>
    </form>
  );
}
