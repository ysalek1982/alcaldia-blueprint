import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Settings, Users, ShieldCheck, Database, Bell, KeyRound } from "lucide-react";

export const Route = createFileRoute("/configuracion")({
  head: () => ({ meta: [{ title: "Configuración — G.A.M. Buena Vista" }] }),
  component: Configuracion,
});

const grupos = [
  { i: Users, t: "Usuarios y roles", d: "Administra cuentas, roles y permisos del sistema." },
  { i: ShieldCheck, t: "Auditoría", d: "Registro inmutable de cambios y acciones críticas." },
  { i: KeyRound, t: "Seguridad", d: "Política de contraseñas, 2FA y bloqueo por intentos." },
  { i: Database, t: "Conexiones", d: "Lovable Cloud / Supabase, bancos, firma digital, SRI." },
  { i: Bell, t: "Notificaciones", d: "Plantillas SMS, email y avisos del portal ciudadano." },
  { i: Settings, t: "Parámetros normativos", d: "Tasas, vigencias y fórmulas versionadas por gestión." },
];

function Configuracion() {
  return (
    <AppShell title="Configuración" subtitle="Parámetros transversales del sistema municipal">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {grupos.map((g) => {
          const Icon = g.i;
          return (
            <button key={g.t} className="text-left bg-card border border-border rounded-lg p-5 hover:border-primary hover:shadow-sm transition-all">
              <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-4 font-semibold text-foreground">{g.t}</div>
              <p className="text-sm text-muted-foreground mt-1">{g.d}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 bg-card border border-border rounded-lg p-5">
        <h3 className="font-semibold text-foreground">Conexión con Lovable Cloud (Supabase)</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Este prototipo está diseñado para conectarse a Postgres con RLS. Tablas previstas: usuarios, roles, permisos,
          auditoría, contribuyentes, predios, deudas, pagos, planillas, expedientes y notificaciones.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-muted">
            <span className="h-2 w-2 rounded-full bg-accent" /> Sin conexión activa
          </span>
          <button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
            Activar Lovable Cloud
          </button>
        </div>
      </div>
    </AppShell>
  );
}
