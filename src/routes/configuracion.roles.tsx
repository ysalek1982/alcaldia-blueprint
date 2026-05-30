import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { navConfiguracion } from "@/lib/module-navs";
import { Check } from "lucide-react";

export const Route = createFileRoute("/configuracion/roles")({
  head: () => ({ meta: [{ title: "Roles y permisos" }] }),
  component: () => {
    const roles = ["Administrador", "Cajero", "Fiscalizador", "Catastro", "RRHH", "Consulta"];
    const permisos = ["Ver dashboard", "Recaudar", "Anular pagos", "Editar predios", "Aprobar planillas", "Notificar mora", "Coactivo", "Config sistema"];
    const matriz: Record<string, boolean[]> = {
      Administrador: [true, true, true, true, true, true, true, true],
      Cajero: [true, true, false, false, false, false, false, false],
      Fiscalizador: [true, false, false, false, false, true, true, false],
      Catastro: [true, false, false, true, false, false, false, false],
      RRHH: [true, false, false, false, true, false, false, false],
      Consulta: [true, false, false, false, false, false, false, false],
    };
    return (
      <ModuleShell title="Roles y permisos" subtitle="Matriz de permisos por rol"
        subnav={navConfiguracion}
        breadcrumb={[{ label: "Configuración", to: "/configuracion" }, { label: "Roles" }]}>
        <div className="bg-card border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60"><tr><th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-muted-foreground">Permiso</th>{roles.map((r) => <th key={r} className="px-4 py-3 text-center text-xs uppercase tracking-wide text-muted-foreground">{r}</th>)}</tr></thead>
            <tbody className="divide-y divide-border">{permisos.map((p, i) => (
              <tr key={p}><td className="px-4 py-3 font-medium">{p}</td>
                {roles.map((r) => (
                  <td key={r} className="px-4 py-3 text-center">{matriz[r][i] ? <Check className="h-4 w-4 inline text-primary" /> : <span className="text-muted-foreground">—</span>}</td>
                ))}
              </tr>
            ))}</tbody>
          </table>
        </div>
      </ModuleShell>
    );
  },
});
