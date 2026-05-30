import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ModuleShell } from "@/components/ModuleShell";
import { CrudListPage, SelectFilter } from "@/components/CrudListPage";
import { Badge } from "@/components/DataTable";
import { FormSheet, Field, TextInput, Select } from "@/components/FormSheet";
import { navPagos } from "@/lib/module-navs";
import { useOrdenesStore, useContribuyentesStore, type OrdenPago } from "@/lib/stores";
import { QrCode } from "lucide-react";

export const Route = createFileRoute("/pagos/ordenes")({
  head: () => ({ meta: [{ title: "Órdenes de pago" }] }),
  component: OrdenesPage,
});

const ESTADOS: OrdenPago["estado"][] = ["Pendiente", "Pagada", "Vencida", "Anulada"];

function OrdenesPage() {
  const [qr, setQr] = useState<OrdenPago | null>(null);
  return (
    <ModuleShell title="Órdenes de pago" subtitle="Generación de orden con QR y vencimiento"
      subnav={navPagos}
      breadcrumb={[{ label: "Pagos", to: "/pagos" }, { label: "Órdenes" }]}>
      <CrudListPage
        store={useOrdenesStore}
        searchPlaceholder="Buscar por nº o contribuyente…"
        createLabel="Generar orden"
        filters={(s, set) => (
          <SelectFilter value={s.estado ?? "all"} onChange={(v) => set("estado", v)} placeholder="Todos los estados" options={ESTADOS.map((x) => ({ value: x, label: x }))} />
        )}
        columns={[
          { key: "numero", label: "Nº orden" },
          { key: "contribuyente", label: "Contribuyente" },
          { key: "concepto", label: "Concepto" },
          { key: "monto", label: "Monto (Bs.)", className: "text-right font-medium", render: (r) => r.monto.toLocaleString("es-BO") },
          { key: "vencimiento", label: "Vence" },
          { key: "estado", label: "Estado", render: (r) => (
            <Badge tone={r.estado === "Pagada" ? "primary" : r.estado === "Vencida" ? "destructive" : r.estado === "Anulada" ? "muted" : "accent"}>{r.estado}</Badge>
          )},
          { key: "__qr", label: "", render: (r) => (
            <button onClick={(e) => { e.stopPropagation(); setQr(r); }} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-muted hover:bg-muted/70">
              <QrCode className="h-3 w-3" /> QR
            </button>
          )},
        ]}
        renderForm={({ editing, close }) => <OrdenForm editing={editing} close={close} />}
      />

      <FormSheet open={!!qr} onClose={() => setQr(null)} title={`QR · ${qr?.numero ?? ""}`}>
        {qr && (
          <div className="text-center">
            <div className="mx-auto w-56 h-56 bg-white border-4 border-foreground rounded-md grid grid-cols-12 grid-rows-12 gap-px p-3">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className={Math.random() > 0.5 ? "bg-foreground rounded-[2px]" : ""} />
              ))}
            </div>
            <div className="mt-4 font-mono text-xs">{qr.numero}</div>
            <div className="text-lg font-bold">Bs. {qr.monto.toLocaleString("es-BO")}</div>
            <div className="text-xs text-muted-foreground">Vence {qr.vencimiento}</div>
            <p className="mt-3 text-[11px] text-muted-foreground">QR demo. En producción genera EMVCo Bolivia compatible con Tigo Money, BCP, BNB y Unión.</p>
          </div>
        )}
      </FormSheet>
    </ModuleShell>
  );
}

function OrdenForm({ editing, close }: { editing: OrdenPago | null; close: () => void }) {
  const contribs = useContribuyentesStore((s) => s.rows);
  const create = useOrdenesStore((s) => s.create);
  const update = useOrdenesStore((s) => s.update);
  const [f, setF] = useState<Partial<OrdenPago>>(editing ?? {
    numero: `ORD-2026-${Math.floor(Math.random() * 9000) + 1000}`, contribuyente: contribs[0]?.nombre ?? "", concepto: "", monto: 0,
    vencimiento: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10), estado: "Pendiente",
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); editing ? update(editing.id, f) : create(f as Omit<OrdenPago, "id">); close(); }}>
      <div className="grid grid-cols-2 gap-x-3">
        <Field label="Nº de orden"><TextInput value={f.numero ?? ""} onChange={(e) => setF({ ...f, numero: e.target.value })} /></Field>
        <Field label="Contribuyente">
          <Select value={f.contribuyente} onChange={(e) => setF({ ...f, contribuyente: e.target.value })}>
            {contribs.map((c) => <option key={c.id}>{c.nombre}</option>)}
          </Select>
        </Field>
      </div>
      <Field label="Concepto"><TextInput value={f.concepto ?? ""} onChange={(e) => setF({ ...f, concepto: e.target.value })} /></Field>
      <div className="grid grid-cols-3 gap-x-3">
        <Field label="Monto (Bs.)"><TextInput type="number" value={f.monto ?? 0} onChange={(e) => setF({ ...f, monto: Number(e.target.value) })} /></Field>
        <Field label="Vencimiento"><TextInput type="date" value={f.vencimiento ?? ""} onChange={(e) => setF({ ...f, vencimiento: e.target.value })} /></Field>
        <Field label="Estado">
          <Select value={f.estado} onChange={(e) => setF({ ...f, estado: e.target.value as OrdenPago["estado"] })}>
            {ESTADOS.map((x) => <option key={x}>{x}</option>)}
          </Select>
        </Field>
      </div>
      <div className="flex justify-end gap-2"><button type="button" onClick={close} className="h-9 px-4 rounded-md border border-border bg-card text-sm">Cancelar</button><button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">{editing ? "Guardar" : "Generar"}</button></div>
    </form>
  );
}
