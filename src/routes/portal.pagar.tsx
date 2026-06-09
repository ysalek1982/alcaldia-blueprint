import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ModuleShell } from "@/components/ModuleShell";
import { Field, TextInput } from "@/components/FormSheet";
import { navPortal } from "@/lib/module-navs";
import { usePagosStore } from "@/lib/stores";
import { QrCode, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";


export const Route = createFileRoute("/portal/pagar")({
  head: () => ({ meta: [{ title: "Pagar en línea" }] }),
  component: () => {
    const [orden, setOrden] = useState("");
    const [monto, setMonto] = useState(0);
    const [generado, setGenerado] = useState(false);
    const [confirmado, setConfirmado] = useState(false);
    const createPago = usePagosStore((s) => s.create);

    const generar = () => {
      setGenerado(true);
      setConfirmado(false);
      toast.success("QR generado", { description: `Orden ${orden} · Bs. ${monto.toLocaleString("es-BO")}` });
    };

    const confirmar = () => {
      const recibo = `REC-2026-${String(Math.floor(Math.random() * 90000) + 10000)}`;
      createPago({
        fecha: new Date().toISOString().slice(0, 16).replace("T", " "),
        recibo, contribuyente: "Pago portal ciudadano", concepto: `Orden ${orden}`,
        canal: "QR Tigo Money", monto, estado: "Aplicado",
      });
      setConfirmado(true);
      toast.success(`Pago aplicado · ${recibo}`, { description: "Comprobante disponible en Pagos → Movimientos" });
    };

    return (
      <ModuleShell title="Pagar en línea" subtitle="Genera tu QR de pago para Tigo Money, BCP, BNB o Banco Unión"
        subnav={navPortal}
        breadcrumb={[{ label: "Portal", to: "/portal" }, { label: "Pagar" }]}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <Field label="Nº de orden / Recibo"><TextInput value={orden} onChange={(e) => setOrden(e.target.value)} placeholder="ORD-2026-9821" /></Field>
            <Field label="Monto a pagar (Bs.)"><TextInput type="number" value={monto} onChange={(e) => setMonto(Number(e.target.value))} /></Field>
            <button onClick={generar} disabled={!orden || !monto} className="mt-2 w-full h-10 rounded-md bg-primary text-primary-foreground font-medium inline-flex items-center justify-center gap-2 disabled:opacity-50">
              <QrCode className="h-4 w-4" /> Generar QR
            </button>
            {generado && !confirmado && (
              <button onClick={confirmar} className="mt-2 w-full h-10 rounded-md bg-secondary text-secondary-foreground font-medium inline-flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Simular confirmación de pago
              </button>
            )}
          </div>
          <div className="bg-card border border-border rounded-lg p-6 flex flex-col items-center justify-center">
            {generado ? (
              <>
                <div className={`w-56 h-56 bg-white border-4 rounded-md grid grid-cols-12 grid-rows-12 gap-px p-3 ${confirmado ? "border-primary opacity-50" : "border-foreground"}`}>
                  {Array.from({ length: 144 }).map((_, i) => <div key={i} className={Math.random() > 0.5 ? (confirmado ? "bg-primary rounded-[2px]" : "bg-foreground rounded-[2px]") : ""} />)}
                </div>
                <div className="mt-4 text-center">
                  <div className="font-mono text-xs">{orden}</div>
                  <div className="text-2xl font-bold">Bs. {monto.toLocaleString("es-BO")}</div>
                  {confirmado ? (
                    <p className="text-[11px] text-primary mt-2 inline-flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Pago confirmado</p>
                  ) : (
                    <p className="text-[11px] text-muted-foreground mt-2">Escanea con la app de tu banco o billetera.</p>
                  )}
                </div>
              </>
            ) : (
              <div className="text-sm text-muted-foreground text-center">Ingresa los datos para generar el QR.</div>
            )}
          </div>
        </div>
      </ModuleShell>
    );
  },
});

