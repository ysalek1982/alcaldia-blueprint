import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ModuleShell } from "@/components/ModuleShell";
import { CrudListPage } from "@/components/CrudListPage";
import { Badge } from "@/components/DataTable";
import { Field, TextInput, Select } from "@/components/FormSheet";
import { navRecaudaciones } from "@/lib/module-navs";
import { useConceptosStore, type Concepto } from "@/lib/stores";

export const Route = createFileRoute("/recaudaciones/conceptos")({
  head: () => ({ meta: [{ title: "Conceptos — Recaudaciones" }] }),
  component: ConceptosPage,
});

const CATS: Concepto["categoria"][] = ["Impuesto", "Tasa", "Patente", "Multa"];

function ConceptosPage() {
  return (
    <ModuleShell title="Conceptos tributarios" subtitle="Catálogo versionado de impuestos, tasas, patentes y multas"
      subnav={navRecaudaciones}
      breadcrumb={[{ label: "Recaudaciones", to: "/recaudaciones" }, { label: "Conceptos" }]}>
      <CrudListPage
        store={useConceptosStore}
        searchPlaceholder="Buscar por código o nombre…"
        createLabel="Nuevo concepto"
        columns={[
          { key: "codigo", label: "Código" },
          { key: "nombre", label: "Nombre" },
          { key: "categoria", label: "Categoría", render: (r) => <Badge tone="secondary">{r.categoria}</Badge> },
          { key: "formula", label: "Fórmula", render: (r) => <code className="text-[11px] bg-muted px-1.5 py-0.5 rounded">{r.formula}</code> },
          { key: "vigenciaDesde", label: "Vigente desde" },
          { key: "estado", label: "Estado", render: (r) => <Badge tone={r.estado === "Vigente" ? "primary" : "muted"}>{r.estado}</Badge> },
        ]}
        renderForm={({ editing, close }) => <ConceptoForm editing={editing} close={close} />}
      />
    </ModuleShell>
  );
}

function ConceptoForm({ editing, close }: { editing: Concepto | null; close: () => void }) {
  const create = useConceptosStore((s) => s.create);
  const update = useConceptosStore((s) => s.update);
  const [f, setF] = useState<Partial<Concepto>>(editing ?? { codigo: "", nombre: "", categoria: "Impuesto", formula: "", vigenciaDesde: new Date().toISOString().slice(0, 10), estado: "Vigente" });
  return (
    <form onSubmit={(e) => { e.preventDefault(); editing ? update(editing.id, f) : create(f as Omit<Concepto, "id">); close(); }}>
      <div className="grid grid-cols-2 gap-x-3">
        <Field label="Código"><TextInput value={f.codigo ?? ""} onChange={(e) => setF({ ...f, codigo: e.target.value })} /></Field>
        <Field label="Categoría">
          <Select value={f.categoria} onChange={(e) => setF({ ...f, categoria: e.target.value as Concepto["categoria"] })}>
            {CATS.map((c) => <option key={c}>{c}</option>)}
          </Select>
        </Field>
      </div>
      <Field label="Nombre"><TextInput value={f.nombre ?? ""} onChange={(e) => setF({ ...f, nombre: e.target.value })} /></Field>
      <Field label="Fórmula de cálculo" hint="Lenguaje libre — se versiona en cada cambio."><TextInput value={f.formula ?? ""} onChange={(e) => setF({ ...f, formula: e.target.value })} /></Field>
      <div className="grid grid-cols-2 gap-x-3">
        <Field label="Vigente desde"><TextInput type="date" value={f.vigenciaDesde ?? ""} onChange={(e) => setF({ ...f, vigenciaDesde: e.target.value })} /></Field>
        <Field label="Estado">
          <Select value={f.estado} onChange={(e) => setF({ ...f, estado: e.target.value as Concepto["estado"] })}>
            <option>Vigente</option><option>Histórico</option>
          </Select>
        </Field>
      </div>
      <div className="flex justify-end gap-2"><button type="button" onClick={close} className="h-9 px-4 rounded-md border border-border bg-card text-sm">Cancelar</button><button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">{editing ? "Guardar" : "Crear"}</button></div>
    </form>
  );
}
