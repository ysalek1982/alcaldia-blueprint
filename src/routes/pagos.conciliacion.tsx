import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ModuleShell } from "@/components/ModuleShell";
import { Badge, DataTable } from "@/components/DataTable";
import { navPagos } from "@/lib/module-navs";
import { Banknote, CheckCircle2, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/pagos/conciliacion")({
  head: () => ({ meta: [{ title: "Conciliación bancaria" }] }),
  component: ConciliacionPage,
});

type Extracto = { id: string; fecha: string; banco: string; monto: number; referencia: string; conciliado: boolean };

const SEED: Extracto[] = [
  { id: "ex1", fecha: "2026-09-12", banco: "Banco Unión", monto: 1820, referencia: "REC-2026-04821", conciliado: true },
  { id: "ex2", fecha: "2026-09-12", banco: "Tigo Money", monto: 4250, referencia: "REC-2026-04820", conciliado: true },
  { id: "ex3", fecha: "2026-09-11", banco: "BCP", monto: 8900, referencia: "REC-2026-04817", conciliado: true },
  { id: "ex4", fecha: "2026-09-12", banco: "BCP", monto: 95, referencia: "—", conciliado: false },
  { id: "ex5", fecha: "2026-09-12", banco: "Banco Unión", monto: 320, referencia: "—", conciliado: false },
];

function ConciliacionPage() {
  const [rows, setRows] = useState(SEED);
  const conciliar = (id: string) => setRows(rows.map((r) => r.id === id ? { ...r, conciliado: true, referencia: `REC-2026-0${Math.floor(Math.random() * 9000)}` } : r));

  const totalConc = rows.filter((r) => r.conciliado).reduce((s, r) => s + r.monto, 0);
  const totalPend = rows.filter((r) => !r.conciliado).reduce((s, r) => s + r.monto, 0);

  return (
    <ModuleShell title="Conciliación bancaria" subtitle="Cruce automático contra extractos bancarios — diferencias manuales"
      subnav={navPagos}
      breadcrumb={[{ label: "Pagos", to: "/pagos" }, { label: "Conciliación" }]}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card label="Conciliado" value={`Bs. ${totalConc.toLocaleString("es-BO")}`} icon={<CheckCircle2 className="h-5 w-5" />} tone="primary" />
        <Card label="Por conciliar" value={`Bs. ${totalPend.toLocaleString("es-BO")}`} icon={<AlertCircle className="h-5 w-5" />} tone="accent" />
        <Card label="Diferencia" value="Bs. 0" icon={<Banknote className="h-5 w-5" />} tone="secondary" />
      </div>
      <DataTable
        columns={[
          { key: "fecha", label: "Fecha" },
          { key: "banco", label: "Banco / Canal" },
          { key: "monto", label: "Monto (Bs.)", className: "text-right font-medium", render: (r) => r.monto.toLocaleString("es-BO") },
          { key: "referencia", label: "Referencia" },
          { key: "conciliado", label: "Estado", render: (r) => r.conciliado ? <Badge tone="primary">Conciliado</Badge> : <Badge tone="accent">Por conciliar</Badge> },
          { key: "__a", label: "", className: "text-right", render: (r) => !r.conciliado && <button onClick={() => conciliar(r.id)} className="text-xs text-primary hover:underline">Conciliar manualmente</button> },
        ]}
        rows={rows}
      />
    </ModuleShell>
  );
}

function Card({ label, value, icon, tone }: { label: string; value: string; icon: React.ReactNode; tone: "primary" | "accent" | "secondary" }) {
  const map = { primary: "bg-primary/10 text-primary", accent: "bg-accent/30 text-accent-foreground", secondary: "bg-secondary/10 text-secondary" };
  return (
    <div className="bg-card border border-border rounded-lg p-5 flex items-center gap-4">
      <div className={`h-10 w-10 rounded-md flex items-center justify-center ${map[tone]}`}>{icon}</div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  );
}
