import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { StatCard } from "@/components/StatCard";
import { navRRHH } from "@/lib/module-navs";
import { useFuncionariosStore, usePlanillasStore, useSolicitudesStore } from "@/lib/stores";
import { Users, UserPlus, Clock, FileSignature } from "lucide-react";

export const Route = createFileRoute("/rrhh")({
  head: () => ({ meta: [{ title: "Recursos Humanos — G.A.M. Buena Vista" }] }),
  component: RRHHResumen,
});

function RRHHResumen() {
  const funcionarios = useFuncionariosStore((s) => s.rows);
  const planillas = usePlanillasStore((s) => s.rows);
  const solicitudes = useSolicitudesStore((s) => s.rows);

  const activos = funcionarios.filter((f) => f.estado === "Activo").length;
  const planillaActual = planillas.find((p) => p.estado === "Borrador") ?? planillas[0];
  const pendientes = solicitudes.filter((s) => s.estado === "Pendiente").length;

  return (
    <ModuleShell
      title="Recursos Humanos"
      subtitle="Subsistema de personal, planillas y movimientos"
      subnav={navRRHH}
      breadcrumb={[{ label: "Módulos", to: "/dashboard" }, { label: "RRHH" }]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Funcionarios totales" value={funcionarios.length.toString()} hint={`${activos} activos`} icon={Users} accent="primary" />
        <StatCard label="Altas del mes" value="4" hint="2 contratos eventuales" icon={UserPlus} accent="secondary" />
        <StatCard label="Solicitudes pendientes" value={pendientes.toString()} hint="Requieren aprobación" icon={Clock} accent="accent" />
        <StatCard label={`Planilla ${planillaActual?.periodo ?? ""}`} value={`Bs. ${(planillaActual?.total ?? 0).toLocaleString("es-BO")}`} hint={planillaActual?.estado} icon={FileSignature} accent="primary" />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground">Solicitudes recientes</h3>
          <ul className="mt-3 divide-y divide-border">
            {solicitudes.slice(0, 5).map((s) => (
              <li key={s.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{s.funcionario}</div>
                  <div className="text-[11px] text-muted-foreground">{s.tipo} · {s.desde} → {s.hasta} · {s.dias}d</div>
                </div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                  s.estado === "Aprobada" ? "bg-primary/10 text-primary"
                  : s.estado === "Pendiente" ? "bg-accent/40 text-accent-foreground"
                  : "bg-destructive/10 text-destructive"
                }`}>{s.estado}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground">Distribución por secretaría</h3>
          <ul className="mt-3 space-y-2">
            {Object.entries(funcionarios.reduce<Record<string, number>>((acc, f) => {
              acc[f.secretaria] = (acc[f.secretaria] ?? 0) + 1; return acc;
            }, {})).map(([sec, n]) => (
              <li key={sec}>
                <div className="flex justify-between text-xs mb-1"><span>{sec}</span><span className="text-muted-foreground">{n}</span></div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden"><div className="h-full bg-primary" style={{ width: `${(n / funcionarios.length) * 100}%` }} /></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ModuleShell>
  );
}
