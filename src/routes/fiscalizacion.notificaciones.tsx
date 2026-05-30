import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { CrudListPage, SelectFilter } from "@/components/CrudListPage";
import { Badge } from "@/components/DataTable";
import { Field, TextInput, Select } from "@/components/FormSheet";
import { navFiscalizacion } from "@/lib/module-navs";
import { useNotificacionesStore, type Notificacion } from "@/lib/stores";
import { useState } from "react";

export const Route = createFileRoute("/fiscalizacion/notificaciones")({
  head: () => ({ meta: [{ title: "Notificaciones" }] }),
  component: NotsPage,
});

const TIPOS: Notificacion["tipo"][] = ["Mora — Patente", "Mora — Inmueble", "Observación catastral", "Vencimiento próximo", "Última intimación"];
const CANALES: Notificacion["canal"][] = ["Email", "SMS", "Carta", "Visita"];

function NotsPage() {
  return (
    <ModuleShell title="Notificaciones" subtitle="Emisión y seguimiento de notificaciones tributarias"
      subnav={navFiscalizacion}
      breadcrumb={[{ label: "Fiscalización", to: "/fiscalizacion" }, { label: "Notificaciones" }]}>
      <CrudListPage
        store={useNotificacionesStore}
        searchPlaceholder="Buscar por código o contribuyente…"
        createLabel="Emitir notificación"
        filters={(s, set) => (
          <SelectFilter value={s.estado ?? "all"} onChange={(v) => set("estado", v)} placeholder="Todos los estados" options={["Pendiente", "Notificado", "En gestión", "Reincidente", "Resuelto"].map((x) => ({ value: x, label: x }))} />
        )}
        columns={[
          { key: "codigo", label: "Código" },
          { key: "contribuyente", label: "Contribuyente" },
          { key: "tipo", label: "Tipo" },
          { key: "monto", label: "Monto (Bs.)", className: "text-right", render: (r) => r.monto.toLocaleString("es-BO") },
          { key: "vencimiento", label: "Vence" },
          { key: "canal", label: "Canal" },
          { key: "estado", label: "Estado", render: (r) => (
            <Badge tone={r.estado === "Resuelto" ? "primary" : r.estado === "Reincidente" ? "destructive" : "accent"}>{r.estado}</Badge>
          )},
        ]}
        renderForm={({ editing, close }) => <NotForm editing={editing} close={close} />}
      />
    </ModuleShell>
  );
}

function NotForm({ editing, close }: { editing: Notificacion | null; close: () => void }) {
  const create = useNotificacionesStore((s) => s.create);
  const update = useNotificacionesStore((s) => s.update);
  const [f, setF] = useState<Partial<Notificacion>>(editing ?? {
    codigo: `NOT-2026-${Math.floor(Math.random() * 9000) + 1000}`,
    contribuyente: "", tipo: "Mora — Patente", monto: 0, vencimiento: "", estado: "Pendiente", canal: "Email",
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); editing ? update(editing.id, f) : create(f as Omit<Notificacion, "id">); close(); }}>
      <div className="grid grid-cols-2 gap-x-3">
        <Field label="Código"><TextInput value={f.codigo ?? ""} onChange={(e) => setF({ ...f, codigo: e.target.value })} /></Field>
        <Field label="Contribuyente"><TextInput value={f.contribuyente ?? ""} onChange={(e) => setF({ ...f, contribuyente: e.target.value })} /></Field>
        <Field label="Tipo"><Select value={f.tipo} onChange={(e) => setF({ ...f, tipo: e.target.value as Notificacion["tipo"] })}>{TIPOS.map((t) => <option key={t}>{t}</option>)}</Select></Field>
        <Field label="Canal"><Select value={f.canal} onChange={(e) => setF({ ...f, canal: e.target.value as Notificacion["canal"] })}>{CANALES.map((t) => <option key={t}>{t}</option>)}</Select></Field>
        <Field label="Monto (Bs.)"><TextInput type="number" value={f.monto ?? 0} onChange={(e) => setF({ ...f, monto: Number(e.target.value) })} /></Field>
        <Field label="Vence"><TextInput type="date" value={f.vencimiento ?? ""} onChange={(e) => setF({ ...f, vencimiento: e.target.value })} /></Field>
      </div>
      <div className="flex justify-end gap-2"><button type="button" onClick={close} className="h-9 px-4 rounded-md border border-border bg-card text-sm">Cancelar</button><button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">{editing ? "Guardar" : "Emitir"}</button></div>
    </form>
  );
}
