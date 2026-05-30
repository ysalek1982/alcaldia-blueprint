import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge, DataTable } from "@/components/DataTable";
import { tramites } from "@/lib/mock-data";
import { Globe, FileSearch, CreditCard, Receipt, MapPinned, MessageSquare, ArrowRight } from "lucide-react";
import logo from "@/assets/logo-buenavista.svg";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Portal Ciudadano — Buena Vista" },
      { name: "description", content: "Consulta deudas, paga en línea, gestiona trámites y reporta incidencias en tu municipio." },
    ],
  }),
  component: Portal,
});

const servicios = [
  { i: Receipt, t: "Consultar mi deuda", d: "Impuestos, patentes, vehículos y tasas." },
  { i: CreditCard, t: "Pagar en línea", d: "QR, banca por internet o tarjeta." },
  { i: FileSearch, t: "Estado de trámite", d: "Seguimiento por código y CI." },
  { i: MapPinned, t: "Certificación catastral", d: "Solicita y descarga tu certificado." },
  { i: MessageSquare, t: "Reportar incidencia", d: "Alumbrado, basura, baches, seguridad." },
  { i: Globe, t: "Transparencia", d: "Presupuesto, contrataciones y obras." },
];

function Portal() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-md bg-white border border-border p-1 flex items-center justify-center">
              <img src={logo} alt="" className="h-full w-full object-contain" />
            </div>
            <div className="leading-tight">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Portal Ciudadano</div>
              <div className="font-semibold text-sm">G.A.M. Buena Vista</div>
            </div>
          </div>
          <Link to="/" className="text-xs text-primary font-medium hover:underline">Acceso institucional →</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, oklch(0.34 0.08 150) 0%, oklch(0.42 0.07 195) 100%)" }}>
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "22px 22px" }} />
        <div className="relative max-w-6xl mx-auto px-5 py-14 text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Atención 24/7
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-semibold max-w-3xl">
            Tu municipio en línea. Trámites simples, pagos seguros, información transparente.
          </h1>
          <p className="mt-3 text-white/80 max-w-2xl text-sm sm:text-base">
            Realiza consultas, paga tus tributos y haz seguimiento a tus solicitudes sin necesidad de ir a la alcaldía.
          </p>

          <div className="mt-7 bg-white rounded-xl p-3 shadow-lg flex flex-col sm:flex-row items-stretch gap-2 max-w-2xl">
            <div className="flex-1 px-3 py-2">
              <label className="text-[10px] uppercase tracking-wide text-muted-foreground">Consulta rápida</label>
              <input
                className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                placeholder="Ingresa tu CI / NIT o código de trámite…"
              />
            </div>
            <button className="h-11 px-5 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 flex items-center justify-center gap-2">
              Consultar <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="max-w-6xl mx-auto px-5 py-12">
        <h2 className="text-xl font-semibold text-foreground">¿Qué deseas hacer hoy?</h2>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {servicios.map((s) => {
            const Icon = s.i;
            return (
              <button key={s.t} className="text-left bg-card border border-border rounded-lg p-5 hover:border-primary hover:shadow-sm transition-all group">
                <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-semibold text-foreground">{s.t}</div>
                <p className="text-sm text-muted-foreground mt-1">{s.d}</p>
                <div className="mt-3 text-xs text-primary font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Iniciar <ArrowRight className="h-3 w-3" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Estado de tramites */}
      <section className="max-w-6xl mx-auto px-5 pb-16">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-foreground">Trámites recientes</h2>
          <span className="text-xs text-muted-foreground">Demostración con datos de muestra</span>
        </div>
        <DataTable
          columns={[
            { key: "codigo", label: "Código" },
            { key: "tipo", label: "Trámite" },
            { key: "ciudadano", label: "Solicitante" },
            { key: "dias", label: "Días", className: "text-right" },
            {
              key: "estado", label: "Estado",
              render: (r) => {
                const tone =
                  r.estado === "Aprobado" ? "primary" :
                  r.estado === "Observado" ? "destructive" :
                  r.estado === "En revisión" ? "accent" : "secondary";
                return <Badge tone={tone}>{r.estado}</Badge>;
              },
            },
          ]}
          rows={tramites}
        />
      </section>

      <footer className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Gobierno Autónomo Municipal de Buena Vista · Santa Cruz, Bolivia</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Transparencia</a>
            <a href="#" className="hover:text-foreground">Atención</a>
            <a href="#" className="hover:text-foreground">Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
