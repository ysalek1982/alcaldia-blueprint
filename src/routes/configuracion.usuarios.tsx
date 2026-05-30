import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { CrudListPage, SelectFilter } from "@/components/CrudListPage";
import { Badge } from "@/components/DataTable";
import { Field, TextInput, Select } from "@/components/FormSheet";
import { navConfiguracion } from "@/lib/module-navs";
import { useUsuariosStore, type Usuario } from "@/lib/stores";
import { useState } from "react";

export const Route = createFileRoute("/configuracion/usuarios")({
  head: () => ({ meta: [{ title: "Usuarios" }] }),
  component: () => (
    <ModuleShell title="Usuarios del sistema" subtitle="Cuentas con acceso al sistema integral"
      subnav={navConfiguracion}
      breadcrumb={[{ label: "Configuración", to: "/configuracion" }, { label: "Usuarios" }]}>
      <CrudListPage
        store={useUsuariosStore}
        searchPlaceholder="Buscar usuario…"
        createLabel="Nuevo usuario"
        filters={(s, set) => (
          <SelectFilter value={s.rol ?? "all"} onChange={(v) => set("rol", v)} placeholder="Todos los roles" options={["Administrador", "Cajero", "Fiscalizador", "Catastro", "RRHH", "Consulta"].map((x) => ({ value: x, label: x }))} />
        )}
        columns={[
          { key: "username", label: "Usuario" },
          { key: "nombre", label: "Nombre" },
          { key: "rol", label: "Rol", render: (r) => <Badge tone="secondary">{r.rol}</Badge> },
          { key: "email", label: "Email" },
          { key: "ultimoAcceso", label: "Último acceso" },
          { key: "estado", label: "Estado", render: (r) => <Badge tone={r.estado === "Activo" ? "primary" : "destructive"}>{r.estado}</Badge> },
        ]}
        renderForm={({ editing, close }) => <UserForm editing={editing} close={close} />}
      />
    </ModuleShell>
  ),
});

function UserForm({ editing, close }: { editing: Usuario | null; close: () => void }) {
  const create = useUsuariosStore((s) => s.create);
  const update = useUsuariosStore((s) => s.update);
  const [f, setF] = useState<Partial<Usuario>>(editing ?? { username: "", nombre: "", rol: "Consulta", email: "", estado: "Activo" });
  return (
    <form onSubmit={(e) => { e.preventDefault(); editing ? update(editing.id, f) : create(f as Omit<Usuario, "id">); close(); }}>
      <div className="grid grid-cols-2 gap-x-3">
        <Field label="Usuario"><TextInput value={f.username ?? ""} onChange={(e) => setF({ ...f, username: e.target.value })} /></Field>
        <Field label="Nombre"><TextInput value={f.nombre ?? ""} onChange={(e) => setF({ ...f, nombre: e.target.value })} /></Field>
        <Field label="Email"><TextInput type="email" value={f.email ?? ""} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
        <Field label="Rol"><Select value={f.rol} onChange={(e) => setF({ ...f, rol: e.target.value as Usuario["rol"] })}>
          {["Administrador", "Cajero", "Fiscalizador", "Catastro", "RRHH", "Consulta"].map((x) => <option key={x}>{x}</option>)}
        </Select></Field>
        <Field label="Estado"><Select value={f.estado} onChange={(e) => setF({ ...f, estado: e.target.value as Usuario["estado"] })}><option>Activo</option><option>Bloqueado</option></Select></Field>
      </div>
      <div className="flex justify-end gap-2"><button type="button" onClick={close} className="h-9 px-4 rounded-md border border-border bg-card text-sm">Cancelar</button><button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">{editing ? "Guardar" : "Crear"}</button></div>
    </form>
  );
}
