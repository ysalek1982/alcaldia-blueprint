import { createFileRoute, Link } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { navPortal } from "@/lib/module-navs";
import { Search, MessageSquare, QrCode } from "lucide-react";

export const Route = createFileRoute("/portal")({
  head: () => ({ meta: [{ title: "Portal Ciudadano — Buena Vista" }] }),
  component: () => (
    <ModuleShell title="Portal del ciudadano" subtitle="Servicios públicos en línea para vecinos de Buena Vista"
      subnav={navPortal}
      breadcrumb={[{ label: "Módulos", to: "/dashboard" }, { label: "Portal" }]}>
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Bienvenido a Buena Vista</h2>
        <p className="text-muted-foreground mt-2">Consulta tus deudas, paga en línea o registra un reclamo sin venir a la alcaldía.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { to: "/portal/consulta", i: Search, t: "Consultar deuda", d: "Ingresa tu NIT o CI para ver tus obligaciones." },
          { to: "/portal/pagar", i: QrCode, t: "Pagar en línea", d: "Genera tu QR y paga desde tu banco o billetera." },
          { to: "/portal/reclamos", i: MessageSquare, t: "Reclamos", d: "Reporta problemas de alumbrado, aseo o vías." },
        ].map((s) => {
          const Icon = s.i;
          return (
            <Link key={s.to} to={s.to} className="bg-card border border-border rounded-lg p-5 hover:border-primary hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-md bg-primary/10 text-primary flex items-center justify-center"><Icon className="h-6 w-6" /></div>
              <div className="mt-4 font-semibold">{s.t}</div>
              <p className="text-sm text-muted-foreground mt-1">{s.d}</p>
            </Link>
          );
        })}
      </div>
    </ModuleShell>
  ),
});
