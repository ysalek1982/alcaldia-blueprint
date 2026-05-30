import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { navConfiguracion } from "@/lib/module-navs";
import { Settings, Users, ShieldCheck, Database, Bell, KeyRound } from "lucide-react";

export const Route = createFileRoute("/configuracion")({
  head: () => ({ meta: [{ title: "Configuración — G.A.M. Buena Vista" }] }),
  component: () => (
    <ModuleShell title="Configuración" subtitle="Parámetros transversales del sistema municipal"
      subnav={navConfiguracion}
      breadcrumb={[{ label: "Módulos", to: "/dashboard" }, { label: "Configuración" }]}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { i: Users, t: "Usuarios y roles", d: "Cuentas, roles y permisos." },
          { i: ShieldCheck, t: "Auditoría", d: "Registro inmutable de cambios." },
          { i: KeyRound, t: "Seguridad", d: "Contraseñas, 2FA, bloqueos." },
          { i: Database, t: "Conexiones", d: "Cloud, bancos, firma digital." },
          { i: Bell, t: "Notificaciones", d: "Plantillas SMS / email." },
          { i: Settings, t: "Parámetros normativos", d: "Tasas, vigencias, fórmulas." },
        ].map((g) => {
          const Icon = g.i;
          return (
            <div key={g.t} className="bg-card border border-border rounded-lg p-5">
              <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center"><Icon className="h-5 w-5" /></div>
              <div className="mt-4 font-semibold">{g.t}</div>
              <p className="text-sm text-muted-foreground mt-1">{g.d}</p>
            </div>
          );
        })}
      </div>
    </ModuleShell>
  ),
});
