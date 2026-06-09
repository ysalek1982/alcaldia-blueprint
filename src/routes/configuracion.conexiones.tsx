import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { navConfiguracion } from "@/lib/module-navs";
import { Database, CreditCard, FileSignature, Mail } from "lucide-react";
import { toast } from "sonner";


export const Route = createFileRoute("/configuracion/conexiones")({
  head: () => ({ meta: [{ title: "Conexiones" }] }),
  component: () => (
    <ModuleShell title="Conexiones externas" subtitle="Integraciones del sistema con servicios externos"
      subnav={navConfiguracion}
      breadcrumb={[{ label: "Configuración", to: "/configuracion" }, { label: "Conexiones" }]}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { i: Database, t: "Lovable Cloud (Postgres)", e: "Sin conexión", d: "Activar para reemplazar mocks por datos reales con RLS." },
          { i: CreditCard, t: "Pasarela bancaria", e: "Pruebas", d: "Banco Unión / BCP / BNB / Tigo Money." },
          { i: FileSignature, t: "Firma digital ADSIB", e: "Sin conexión", d: "Firmar resoluciones y certificaciones." },
          { i: Mail, t: "SMTP / SMS", e: "Activo", d: "Envío de notificaciones a contribuyentes." },
        ].map((c) => {
          const Icon = c.i;
          return (
            <div key={c.t} className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center"><Icon className="h-5 w-5" /></div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${c.e === "Activo" ? "bg-primary/10 text-primary" : "bg-accent/30"}`}>{c.e}</span>
              </div>
              <div className="mt-4 font-semibold">{c.t}</div>
              <p className="text-sm text-muted-foreground mt-1">{c.d}</p>
              <button onClick={() => toast.info(`Configurar ${c.t}`, { description: "Diálogo de credenciales · disponible al activar backend." })} className="mt-4 h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">Configurar</button>
            </div>
          );
        })}
      </div>
    </ModuleShell>
  ),
});
