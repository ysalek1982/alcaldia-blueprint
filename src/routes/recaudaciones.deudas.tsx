import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ModuleShell } from "@/components/ModuleShell";
import { CrudListPage, SelectFilter } from "@/components/CrudListPage";
import { Badge } from "@/components/DataTable";
import { Field, TextInput, Select } from "@/components/FormSheet";
import { navRecaudaciones } from "@/lib/module-navs";
import { useDeudasStore, useContribuyentesStore, useConceptosStore, type Deuda } from "@/lib/stores";

export const Route = createFileRoute("/recaudaciones/deudas")({
  head: () => ({ meta: [{ title: "Deudas — Recaudaciones" }] }),
  component: DeudasPage,
});

const ESTADOS: Deuda["estado"][] = ["Vigente", "Vencida", "En plan", "Pagada"];

function DeudasPage() {
  return (
    <ModuleShell title="Deudas" subtitle="Obligaciones tributarias por contribuyente y concepto"
      subnav={navRecaudaciones}
      breadcrumb={[{ label: "Recaudaciones", to: "/recaudaciones" }, { label: "Deudas" }]}>
      <CrudListPage
        store={useDeudasStore}
        searchPlaceholder="Buscar por contribuyente o concepto…"
        createLabel="Generar deuda"
        filters={(s, set) => (
          <SelectFilter value={s.estado ?? "all"} onChange={(v) => set("estado", v)} placeholder="Todos los estados" options={ESTADOS.map((x) => ({ value: x, label: x }))} />
        )}
        columns={[
          { key: "contribuyente", label: "Contribuyente" },
          { key: "concepto", label: "Concepto" },
          { key: "gestion", label: "Gestión", className: "text-right" },
          { key: "monto", label: "Monto", className: "text-right", render: (r) => r.monto.toLocaleString("es-BO") },
          { key: "saldo", label: "Saldo", className: "text-right font-medium", render: (r) => (
            <span className={r.saldo > 0 ? "text-destructive" : ""}>{r.saldo.toLocaleString("es-BO")}</span>
          )},
          { key: "vencimiento", label: "Vencimiento" },
          { key: "estado", label: "Estado", render: (r) => (
            <Badge tone={r.estado === "Pagada" ? "primary" : r.estado === "Vencida" ? "destructive" : r.estado === "En plan" ? "accent" : "secondary"}>{r.estado}</Badge>
          )},
        ]}
        renderForm={({ editing, close }) => <DeudaForm editing={editing} close={close} />}
      />
    </ModuleShell>
  );
}

function DeudaForm({ editing, close }: { editing: Deuda | null; close: () => void }) {
  const contribs = useContribuyentesStore((s) => s.rows);
  const conceptos = useConceptosStore((s) => s.rows);
  const create = useDeudasStore((s) => s.create);
  const update = useDeudasStore((s) => s.update);
  const [f, setF] = useState<Partial<Deuda>>(editing ?? {
    contribuyente: contribs[0]?.nombre ?? "", concepto: conceptos[0]?.nombre ?? "", gestion: 2026, monto: 0, saldo: 0, vencimiento: "", estado: "Vigente",
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); editing ? update(editing.id, f) : create({ ...f, saldo: f.saldo ?? f.monto } as Omit<Deuda, "id">); close(); }}>
      <Field label="Contribuyente">
        <Select value={f.contribuyente} onChange={(e) => setF({ ...f, contribuyente: e.target.value })}>
          {contribs.map((c) => <option key={c.id}>{c.nombre}</option>)}
        </Select>
      </Field>
      <Field label="Concepto">
        <Select value={f.concepto} onChange={(e) => setF({ ...f, concepto: e.target.value })}>
          {conceptos.map((c) => <option key={c.id}>{c.nombre}</option>)}
        </Select>
      </Field>
      <div className="grid grid-cols-3 gap-x-3">
        <Field label="Gestión"><TextInput type="number" value={f.gestion ?? 2026} onChange={(e) => setF({ ...f, gestion: Number(e.target.value) })} /></Field>
        <Field label="Monto (Bs.)"><TextInput type="number" value={f.monto ?? 0} onChange={(e) => { const v = Number(e.target.value); setF({ ...f, monto: v, saldo: v }); }} /></Field>
        <Field label="Vencimiento"><TextInput type="date" value={f.vencimiento ?? ""} onChange={(e) => setF({ ...f, vencimiento: e.target.value })} /></Field>
      </div>
      <Field label="Estado">
        <Select value={f.estado} onChange={(e) => setF({ ...f, estado: e.target.value as Deuda["estado"] })}>
          {ESTADOS.map((x) => <option key={x}>{x}</option>)}
        </Select>
      </Field>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={close} className="h-9 px-4 rounded-md border border-border bg-card text-sm">Cancelar</button>
        <button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">{editing ? "Guardar" : "Generar"}</button>
      </div>
    </form>
  );
}
