import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/ModuleShell";
import { navRRHH } from "@/lib/module-navs";
import { useFuncionariosStore } from "@/lib/stores";
import { Users } from "lucide-react";

export const Route = createFileRoute("/rrhh/organigrama")({
  head: () => ({ meta: [{ title: "Organigrama — RRHH" }] }),
  component: OrganigramaPage,
});

function OrganigramaPage() {
  const funcionarios = useFuncionariosStore((s) => s.rows);
  const porSecretaria = funcionarios.reduce<Record<string, typeof funcionarios>>((acc, f) => {
    (acc[f.secretaria] ??= []).push(f); return acc;
  }, {});

  return (
    <ModuleShell title="Organigrama" subtitle="Catálogo organizacional por secretaría" subnav={navRRHH}
      breadcrumb={[{ label: "RRHH", to: "/rrhh" }, { label: "Organigrama" }]}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Object.entries(porSecretaria).map(([sec, fs]) => (
          <div key={sec} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center"><Users className="h-4 w-4" /></div>
              <div>
                <div className="font-semibold text-sm">{sec}</div>
                <div className="text-[11px] text-muted-foreground">{fs.length} funcionario{fs.length === 1 ? "" : "s"}</div>
              </div>
            </div>
            <ul className="space-y-1.5 text-sm">
              {fs.map((f) => (
                <li key={f.id} className="flex items-center justify-between border-l-2 border-primary/30 pl-2.5">
                  <div>
                    <div className="font-medium">{f.nombre}</div>
                    <div className="text-[11px] text-muted-foreground">{f.cargo}</div>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${f.estado === "Activo" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{f.estado}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ModuleShell>
  );
}
