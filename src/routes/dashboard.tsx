import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { StatCard } from "@/components/StatCard";
import {
  Users, Receipt, MapPinned, CreditCard, AlertTriangle,
  CheckCircle2, ArrowRight, FileText, Globe,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — G.A.M. Buena Vista" }] }),
  component: Dashboard,
});

const recaudacionMensual = [
  { m: "Ene", v: 45 }, { m: "Feb", v: 62 }, { m: "Mar", v: 58 },
  { m: "Abr", v: 71 }, { m: "May", v: 83 }, { m: "Jun", v: 79 },
  { m: "Jul", v: 92 }, { m: "Ago", v: 88 }, { m: "Sep", v: 95 },
];

const actividad = [
  { t: "Pago aplicado", d: "Impuesto inmueble · Cód. 24-0312", u: "Cajera 02", h: "hace 4 min", c: "primary" },
  { t: "Planilla aprobada", d: "Septiembre 2026 · Secretaría de Obras", u: "Jefe RRHH", h: "hace 22 min", c: "secondary" },
  { t: "Predio actualizado", d: "Zona UV-12 · Mz 4 · Lt 7", u: "Catastro", h: "hace 1 h", c: "accent" },
  { t: "Trámite ciudadano", d: "Licencia de funcionamiento · #BV-2026-0481", u: "Portal", h: "hace 2 h", c: "primary" },
  { t: "Notificación de mora", d: "5 contribuyentes — Patente 2025", u: "Fiscalización", h: "hace 3 h", c: "destructive" },
];

function Dashboard() {
  const max = Math.max(...recaudacionMensual.map((d) => d.v));
  return (
    <AppShell
      title="Panel gerencial"
      subtitle="Visión consolidada del Sistema Integral Municipal · Gestión 2026"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Recaudación del mes" value="Bs. 1.284.500" hint="Meta: Bs. 1.500.000" icon={Receipt} trend={12} accent="primary" />
        <StatCard label="Funcionarios activos" value="218" hint="14 secretarías" icon={Users} trend={2} accent="secondary" />
        <StatCard label="Predios catastrados" value="9.482" hint="78% del total estimado" icon={MapPinned} trend={4} accent="accent" />
        <StatCard label="Mora acumulada" value="Bs. 612.300" hint="421 contribuyentes" icon={AlertTriangle} trend={-6} accent="destructive" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        {/* Recaudación */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Recaudación mensual</h3>
              <p className="text-xs text-muted-foreground">Bs. (miles) · enero – septiembre</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Recaudado</div>
              <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent" /> Meta</div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-9 gap-2 items-end h-48">
            {recaudacionMensual.map((d) => (
              <div key={d.m} className="flex flex-col items-center gap-1.5">
                <div className="w-full flex flex-col justify-end h-40 relative">
                  <div className="absolute inset-x-1 top-1 border-t border-dashed border-accent/60" style={{ bottom: `${(100 / max) * 100}%` }} />
                  <div className="bg-primary rounded-t-sm hover:bg-primary/90 transition-colors" style={{ height: `${(d.v / max) * 100}%` }} />
                </div>
                <div className="text-[10px] text-muted-foreground">{d.m}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mix por concepto */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground">Mix de recaudación</h3>
          <p className="text-xs text-muted-foreground">Por concepto · mes actual</p>
          <div className="mt-5 space-y-4">
            {[
              { k: "Impuesto a inmuebles", v: 42, c: "bg-primary" },
              { k: "Patentes municipales", v: 26, c: "bg-secondary" },
              { k: "Vehículos", v: 18, c: "bg-accent" },
              { k: "Tasas y servicios", v: 9, c: "bg-chart-4" },
              { k: "Otros", v: 5, c: "bg-muted-foreground" },
            ].map((r) => (
              <div key={r.k}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-foreground">{r.k}</span>
                  <span className="text-muted-foreground font-medium">{r.v}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full ${r.c}`} style={{ width: `${r.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { to: "/recaudaciones", t: "Generar deuda", i: Receipt },
          { to: "/pagos", t: "Registrar pago", i: CreditCard },
          { to: "/catastro", t: "Nuevo predio", i: MapPinned },
          { to: "/expedientes", t: "Abrir expediente", i: FileText },
        ].map((a) => {
          const Icon = a.i;
          return (
            <Link key={a.to} to={a.to} className="group bg-card border border-border rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all flex items-center gap-3">
              <div className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center"><Icon className="h-4 w-4" /></div>
              <div className="flex-1 text-sm font-medium text-foreground">{a.t}</div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        {/* Actividad */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Actividad reciente</h3>
            <span className="text-xs text-muted-foreground">Auditoría en vivo</span>
          </div>
          <ul className="divide-y divide-border">
            {actividad.map((a, i) => (
              <li key={i} className="px-5 py-3 flex items-start gap-3">
                <div className={`mt-1 h-2 w-2 rounded-full bg-${a.c}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-foreground">{a.t}</span>
                    <span className="text-[11px] text-muted-foreground">{a.h}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{a.d} · <span className="text-foreground/70">{a.u}</span></div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Salud del sistema */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground">Salud del sistema</h3>
          <p className="text-xs text-muted-foreground">Servicios e integraciones</p>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { k: "Conciliación bancaria", s: "Operativo" },
              { k: "Portal ciudadano", s: "Operativo" },
              { k: "Pasarela de pagos", s: "Operativo" },
              { k: "Firma digital", s: "Operativo" },
              { k: "Notificaciones SMS", s: "Degradado" },
            ].map((r) => (
              <li key={r.k} className="flex items-center justify-between">
                <span className="text-foreground">{r.k}</span>
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${r.s === "Operativo" ? "text-primary" : "text-accent-foreground"}`}>
                  <CheckCircle2 className="h-3.5 w-3.5" /> {r.s}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5 p-3 rounded-md bg-secondary/10 border border-secondary/20 flex items-start gap-2 text-xs">
            <Globe className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-foreground">Backend listo para Lovable Cloud</div>
              <div className="text-muted-foreground">Esquema diseñado para Postgres + RLS. Conecte cuando esté listo.</div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
