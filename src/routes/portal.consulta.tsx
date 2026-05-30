import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ModuleShell } from "@/components/ModuleShell";
import { Badge, DataTable } from "@/components/DataTable";
import { Field, TextInput } from "@/components/FormSheet";
import { navPortal } from "@/lib/module-navs";
import { useContribuyentesStore, useDeudasStore } from "@/lib/stores";
import { Search } from "lucide-react";

export const Route = createFileRoute("/portal/consulta")({
  head: () => ({ meta: [{ title: "Consulta de deuda" }] }),
  component: () => {
    const [nit, setNit] = useState("");
    const [found, setFound] = useState<{ nombre: string; deuda: number } | null>(null);
    const contribs = useContribuyentesStore((s) => s.rows);
    const deudas = useDeudasStore((s) => s.rows);

    const buscar = () => {
      const c = contribs.find((c) => c.nit === nit.trim());
      setFound(c ? { nombre: c.nombre, deuda: c.deuda } : null);
    };
    const detalle = found ? deudas.filter((d) => d.contribuyente === found.nombre) : [];

    return (
      <ModuleShell title="Consulta de deuda" subtitle="Sin login — público para todo ciudadano"
        subnav={navPortal}
        breadcrumb={[{ label: "Portal", to: "/portal" }, { label: "Consulta" }]}>
        <div className="bg-card border border-border rounded-lg p-6 max-w-xl">
          <Field label="Ingresa tu NIT o número de CI" hint="Prueba con: 1234567019, 5123488, 7894561">
            <div className="flex gap-2">
              <TextInput value={nit} onChange={(e) => setNit(e.target.value)} placeholder="Ej: 1234567" />
              <button onClick={buscar} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium inline-flex items-center gap-2"><Search className="h-4 w-4" /> Buscar</button>
            </div>
          </Field>
          {found === null && nit && <div className="text-sm text-destructive mt-2">No encontramos contribuyentes con ese identificador.</div>}
        </div>

        {found && (
          <div className="mt-6">
            <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg p-6">
              <div className="text-xs uppercase tracking-wide opacity-80">Contribuyente</div>
              <div className="text-xl font-bold">{found.nombre}</div>
              <div className="mt-3 text-sm opacity-80">Saldo total</div>
              <div className="text-3xl font-bold">Bs. {found.deuda.toLocaleString("es-BO")}</div>
              <Badge tone={found.deuda > 0 ? "destructive" : "primary"}>{found.deuda > 0 ? "Tienes deuda" : "Estás al día"}</Badge>
            </div>
            {detalle.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Detalle</h3>
                <DataTable
                  columns={[
                    { key: "concepto", label: "Concepto" },
                    { key: "gestion", label: "Gestión", className: "text-right" },
                    { key: "saldo", label: "Saldo (Bs.)", className: "text-right font-medium", render: (r) => r.saldo.toLocaleString("es-BO") },
                    { key: "vencimiento", label: "Vence" },
                  ]}
                  rows={detalle}
                />
              </div>
            )}
          </div>
        )}
      </ModuleShell>
    );
  },
});
