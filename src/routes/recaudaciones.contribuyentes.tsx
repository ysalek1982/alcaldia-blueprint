import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ModuleShell } from "@/components/ModuleShell";
import { CrudListPage, SelectFilter } from "@/components/CrudListPage";
import { Badge } from "@/components/DataTable";
import { Field, TextInput, Select } from "@/components/FormSheet";
import { navRecaudaciones } from "@/lib/module-navs";
import { useContribuyentesStore, type Contribuyente } from "@/lib/stores";

export const Route = createFileRoute("/recaudaciones/contribuyentes")({
  head: () => ({ meta: [{ title: "Contribuyentes — Recaudaciones" }] }),
  component: ContribPage,
});

const ESTADOS: Contribuyente["estado"][] = ["Al día", "Mora", "Notificado", "Plan de pago"];
const TIPOS: Contribuyente["tipo"][] = ["Natural", "Jurídico"];

function ContribPage() {
  return (
    <ModuleShell title="Contribuyentes" subtitle="Personas naturales y jurídicas registradas"
      subnav={navRecaudaciones}
      breadcrumb={[{ label: "Recaudaciones", to: "/recaudaciones" }, { label: "Contribuyentes" }]}>
      <CrudListPage
        store={useContribuyentesStore}
        searchPlaceholder="Buscar por NIT/CI o nombre…"
        createLabel="Nuevo contribuyente"
        filters={(s, set) => (
          <>
            <SelectFilter value={s.tipo ?? "all"} onChange={(v) => set("tipo", v)} placeholder="Todos los tipos" options={TIPOS.map((x) => ({ value: x, label: x }))} />
            <SelectFilter value={s.estado ?? "all"} onChange={(v) => set("estado", v)} placeholder="Todos los estados" options={ESTADOS.map((x) => ({ value: x, label: x }))} />
          </>
        )}
        columns={[
          { key: "nit", label: "NIT/CI" },
          { key: "nombre", label: "Contribuyente" },
          { key: "tipo", label: "Tipo" },
          { key: "predios", label: "Predios", className: "text-right" },
          { key: "deuda", label: "Deuda (Bs.)", className: "text-right", render: (r) => (
            <span className={r.deuda > 0 ? "text-destructive font-medium" : ""}>{r.deuda.toLocaleString("es-BO")}</span>
          )},
          { key: "estado", label: "Estado", render: (r) => (
            <Badge tone={r.estado === "Al día" ? "primary" : r.estado === "Mora" ? "destructive" : r.estado === "Notificado" ? "accent" : "secondary"}>{r.estado}</Badge>
          )},
        ]}
        renderForm={({ editing, close }) => <ContribForm editing={editing} close={close} />}
      />
    </ModuleShell>
  );
}

function ContribForm({ editing, close }: { editing: Contribuyente | null; close: () => void }) {
  const create = useContribuyentesStore((s) => s.create);
  const update = useContribuyentesStore((s) => s.update);
  const [f, setF] = useState<Partial<Contribuyente>>(editing ?? { nit: "", nombre: "", tipo: "Natural", deuda: 0, estado: "Al día", predios: 0 });
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (!f.nit || !f.nombre) return; editing ? update(editing.id, f) : create(f as Omit<Contribuyente, "id">); close(); }}>
      <div className="grid grid-cols-2 gap-x-4">
        <Field label="NIT / CI"><TextInput value={f.nit ?? ""} onChange={(e) => setF({ ...f, nit: e.target.value })} /></Field>
        <Field label="Nombre / Razón social"><TextInput value={f.nombre ?? ""} onChange={(e) => setF({ ...f, nombre: e.target.value })} /></Field>
        <Field label="Tipo">
          <Select value={f.tipo} onChange={(e) => setF({ ...f, tipo: e.target.value as Contribuyente["tipo"] })}>
            {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </Field>
        <Field label="Estado">
          <Select value={f.estado} onChange={(e) => setF({ ...f, estado: e.target.value as Contribuyente["estado"] })}>
            {ESTADOS.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </Field>
        <Field label="Predios"><TextInput type="number" value={f.predios ?? 0} onChange={(e) => setF({ ...f, predios: Number(e.target.value) })} /></Field>
        <Field label="Deuda actual (Bs.)"><TextInput type="number" value={f.deuda ?? 0} onChange={(e) => setF({ ...f, deuda: Number(e.target.value) })} /></Field>
        <Field label="Email"><TextInput type="email" value={f.email ?? ""} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
        <Field label="Teléfono"><TextInput value={f.telefono ?? ""} onChange={(e) => setF({ ...f, telefono: e.target.value })} /></Field>
      </div>
      <div className="flex justify-end gap-2 mt-2">
        <button type="button" onClick={close} className="h-9 px-4 rounded-md border border-border bg-card text-sm">Cancelar</button>
        <button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">{editing ? "Guardar" : "Crear"}</button>
      </div>
    </form>
  );
}
