import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { BookOpen, MessageCircle, Mail, Phone, ChevronDown, FileText, Video, LifeBuoy } from "lucide-react";

export const Route = createFileRoute("/ayuda")({
  head: () => ({ meta: [{ title: "Ayuda y soporte — G.A.M. Buena Vista" }] }),
  component: AyudaPage,
});

const FAQS = [
  { q: "¿Cómo registro un nuevo contribuyente?", a: "Vaya a Recaudaciones → Contribuyentes y pulse «Nuevo contribuyente». Complete NIT/CI, nombre, tipo y datos de contacto. El sistema valida el NIT y crea el registro al instante." },
  { q: "¿Cómo genero una deuda tributaria?", a: "En Recaudaciones → Deudas, pulse «Generar deuda», seleccione contribuyente y concepto, defina monto, gestión y vencimiento. La deuda queda en estado Vigente hasta su pago o vencimiento." },
  { q: "¿Cómo concilio movimientos bancarios?", a: "En Pagos → Conciliación, importe el extracto bancario o cargue movimientos manuales. El sistema empareja automáticamente por NIT/monto/fecha y deja para revisión los no emparejados." },
  { q: "¿Cómo aprueba o rechaza una solicitud de vacación?", a: "En RRHH → Solicitudes, filtre por estado «Pendiente» y use los botones Aprobar/Rechazar en la columna de acciones. La acción queda registrada en Auditoría." },
  { q: "¿Cómo notifico a un contribuyente moroso?", a: "Desde Recaudaciones → Mora pulse «Notificar» en el contribuyente; la notificación aparece en Fiscalización → Notificaciones con folio, canal y vencimiento." },
  { q: "¿Qué hago si pierdo mi contraseña?", a: "Use «¿Olvidé mi contraseña?» en el login o solicite al administrador del sistema (Configuración → Usuarios) que envíe un enlace de reseteo a su correo institucional." },
  { q: "¿Cómo exporto un reporte?", a: "Vaya a Reportes → Catálogo, abra el reporte deseado y use los botones de exportar (PDF, Excel, CSV) en la barra superior." },
];

const RECURSOS = [
  { i: BookOpen, t: "Manual de usuario", d: "Guía completa con capturas para cada módulo.", a: "Descargar PDF" },
  { i: Video, t: "Tutoriales en video", d: "12 videos cortos sobre flujos clave.", a: "Ver biblioteca" },
  { i: FileText, t: "Plan maestro técnico", d: "Arquitectura, RLS y modelo de datos.", a: "Abrir documento" },
];

function AyudaPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <AppShell title="Centro de ayuda" subtitle="Documentación, tutoriales y canales de soporte">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="font-semibold text-foreground flex items-center gap-2"><LifeBuoy className="h-4 w-4 text-primary" /> Preguntas frecuentes</h3>
            <ul className="mt-4 divide-y divide-border">
              {FAQS.map((f, i) => (
                <li key={i}>
                  <button onClick={() => setOpen(open === i ? null : i)} className="w-full py-3 flex items-center justify-between gap-3 text-left">
                    <span className="text-sm font-medium">{f.q}</span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  {open === i && <div className="pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</div>}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {RECURSOS.map((r) => {
              const Icon = r.i;
              return (
                <div key={r.t} className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors">
                  <div className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center"><Icon className="h-4 w-4" /></div>
                  <div className="mt-3 font-medium text-sm">{r.t}</div>
                  <div className="text-xs text-muted-foreground mt-1">{r.d}</div>
                  <button className="mt-3 text-xs text-primary font-medium hover:underline">{r.a} →</button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="font-semibold">Soporte técnico</h3>
            <p className="text-xs text-muted-foreground mt-1">Lunes a viernes · 08:00 – 18:00</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +591 3 932 2100 int. 105</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> soporte@buenavista.gob.bo</li>
              <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-primary" /> Chat institucional (Teams)</li>
            </ul>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert("Ticket enviado (mock). Recibirá respuesta en su correo."); }}
            className="bg-card border border-border rounded-lg p-5">
            <h3 className="font-semibold">Abrir un ticket</h3>
            <p className="text-xs text-muted-foreground mt-1">Describa el problema y se asignará a un agente.</p>
            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="text-xs font-medium">Asunto</span>
                <input required className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm" placeholder="Resumen del problema" />
              </label>
              <label className="block">
                <span className="text-xs font-medium">Prioridad</span>
                <select className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                  <option>Baja</option><option>Media</option><option>Alta</option><option>Crítica</option>
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-medium">Descripción</span>
                <textarea required rows={4} className="mt-1 w-full px-3 py-2 rounded-md border border-input bg-background text-sm" placeholder="Detalle lo que está intentando hacer y el resultado actual" />
              </label>
              <button className="w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium">Enviar ticket</button>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
