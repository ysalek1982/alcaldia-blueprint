import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { CrudListPage, SelectFilter } from "@/components/CrudListPage";
import { Badge } from "@/components/DataTable";
import { Field, TextInput, Select } from "@/components/FormSheet";
import { navPagos } from "@/lib/module-navs";
import { usePagosStore, useContribuyentesStore, type Pago } from "@/lib/stores";
import { useState } from "react";

export const Route = createFileRoute("/pagos/movimientos")({
  head: () => ({ meta: [{ title: "Movimientos — Pagos" }] }),
  component: MovimientosPage,
});

const CANALES: Pago["canal"][] = ["Banco Unión", "BCP", "BNB", "QR Tigo Money", "Caja municipal", "Web", "Transferencia BCP"];

function MovimientosPage() {
  return (
    <ModuleShell title="Movimientos" subtitle="Libro de caja — todos los pagos aplicados, observados o anulados"
      subnav={navPagos}
      breadcrumb={[{ label: "Pagos", to: "/pagos" }, { label: "Movimientos" }]}>
      <CrudListPage
        store={usePagosStore}
        searchPlaceholder="Buscar por recibo, contribuyente, concepto…"
        createLabel="Registrar pago"
        filters={(s, set) => (
          <>
            <SelectFilter value={s.canal ?? "all"} onChange={(v) => set("canal", v)} placeholder="Todos los canales" options={CANALES.map((c) => ({ value: c, label: c }))} />
            <SelectFilter value={s.estado ?? "all"} onChange={(v) => set("estado", v)} placeholder="Todos los estados" options={[{ value: "Aplicado", label: "Aplicado" }, { value: "Observado", label: "Observado" }, { value: "Anulado", label: "Anulado" }]} />
          </>
        )}
        columns={[
          { key: "fecha", label: "Fecha" },
          { key: "recibo", label: "Recibo" },
          { key: "contribuyente", label: "Contribuyente" },
          { key: "concepto", label: "Concepto" },
          { key: "canal", label: "Canal" },
          { key: "monto", label: "Monto (Bs.)", className: "text-right font-medium", render: (r) => r.monto.toLocaleString("es-BO") },
          { key: "estado", label: "Estado", render: (r) => (
            <Badge tone={r.estado === "Aplicado" ? "primary" : r.estado === "Anulado" ? "destructive" : "accent"}>{r.estado}</Badge>
          )},
        ]}
        renderForm={({ editing, close }) => <PagoForm editing={editing} close={close} />}
      />
    </ModuleShell>
  );
}

function PagoForm({ editing, close }: { editing: Pago | null; close: () => void }) {
  const contribs = useContribuyentesStore((s) => s.rows);
  const create = usePagosStore((s) => s.create);
  const update = usePagosStore((s) => s.update);
  const [f, setF] = useState<Partial<Pago>>(editing ?? {
    fecha: new Date().toISOString().slice(0, 16).replace("T", " "),
    recibo: `REC-2026-${Math.floor(Math.random() * 90000) + 10000}`,
    contribuyente: contribs[0]?.nombre ?? "", concepto: "", canal: "Caja municipal", monto: 0, estado: "Aplicado",
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); editing ? update(editing.id, f) : create(f as Omit<Pago, "id">); close(); }}>
      <div className="grid grid-cols-2 gap-x-3">
        <Field label="Recibo"><TextInput value={f.recibo ?? ""} onChange={(e) => setF({ ...f, recibo: e.target.value })} /></Field>
        <Field label="Fecha"><TextInput value={f.fecha ?? ""} onChange={(e) => setF({ ...f, fecha: e.target.value })} /></Field>
        <Field label="Contribuyente">
          <Select value={f.contribuyente} onChange={(e) => setF({ ...f, contribuyente: e.target.value })}>
            {contribs.map((c) => <option key={c.id}>{c.nombre}</option>)}
          </Select>
        </Field>
        <Field label="Canal">
          <Select value={f.canal} onChange={(e) => setF({ ...f, canal: e.target.value as Pago["canal"] })}>
            {CANALES.map((c) => <option key={c}>{c}</option>)}
          </Select>
        </Field>
      </div>
      <Field label="Concepto"><TextInput value={f.concepto ?? ""} onChange={(e) => setF({ ...f, concepto: e.target.value })} /></Field>
      <div className="grid grid-cols-2 gap-x-3">
        <Field label="Monto (Bs.)"><TextInput type="number" value={f.monto ?? 0} onChange={(e) => setF({ ...f, monto: Number(e.target.value) })} /></Field>
        <Field label="Estado">
          <Select value={f.estado} onChange={(e) => setF({ ...f, estado: e.target.value as Pago["estado"] })}>
            <option>Aplicado</option><option>Observado</option><option>Anulado</option>
          </Select>
        </Field>
      </div>
      <div className="flex justify-end gap-2"><button type="button" onClick={close} className="h-9 px-4 rounded-md border border-border bg-card text-sm">Cancelar</button><button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">{editing ? "Guardar" : "Registrar"}</button></div>
    </form>
  );
}
