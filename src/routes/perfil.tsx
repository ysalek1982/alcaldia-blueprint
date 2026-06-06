import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/lib/auth";
import { User, Mail, Phone, Building2, Shield, Calendar, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/perfil")({
  head: () => ({ meta: [{ title: "Mi perfil — G.A.M. Buena Vista" }] }),
  component: PerfilPage,
});

function PerfilPage() {
  const { profile, user, roles, isDemo } = useAuth();
  const [tab, setTab] = useState<"datos" | "seguridad" | "sesiones">("datos");
  const [form, setForm] = useState({
    nombre: profile?.nombre_completo ?? "",
    email: user?.email ?? (isDemo ? "demo@buenavista.gob.bo" : ""),
    telefono: profile?.telefono ?? "",
    secretaria: profile?.secretaria ?? "",
    cargo: profile?.cargo ?? "",
  });
  const [saved, setSaved] = useState(false);

  const initials = form.nombre.split(" ").filter(Boolean).slice(0, 2).map((s) => s[0]?.toUpperCase()).join("") || "U";

  return (
    <AppShell title="Mi perfil" subtitle="Información personal y preferencias de cuenta">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="mx-auto h-24 w-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-semibold">
            {initials}
          </div>
          <div className="mt-4 font-semibold text-lg">{form.nombre || "—"}</div>
          <div className="text-sm text-muted-foreground">{form.cargo || "Sin cargo asignado"}</div>
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <Shield className="h-3 w-3" /> {roles[0] ?? "consulta"}
          </div>
          <div className="mt-6 space-y-2 text-left text-sm">
            <Row icon={Mail} label={form.email || "—"} />
            <Row icon={Phone} label={form.telefono || "Sin teléfono"} />
            <Row icon={Building2} label={form.secretaria || "Sin secretaría"} />
            <Row icon={Calendar} label="Ingreso: 2024-01-15" />
          </div>
          {isDemo && (
            <div className="mt-4 text-[11px] text-accent-foreground bg-accent/20 border border-accent/30 rounded-md px-3 py-2">
              Estás en modo demo. Los cambios no se persisten.
            </div>
          )}
        </div>

        <div className="lg:col-span-2 bg-card border border-border rounded-lg">
          <div className="border-b border-border flex">
            {[
              { id: "datos", label: "Datos personales" },
              { id: "seguridad", label: "Seguridad" },
              { id: "sesiones", label: "Sesiones activas" },
            ].map((t) => (
              <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                  tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}>{t.label}</button>
            ))}
          </div>
          <div className="p-6">
            {tab === "datos" && (
              <form onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2500); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Nombre completo"><Input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} /></Field>
                  <Field label="Email institucional"><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
                  <Field label="Teléfono"><Input value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} /></Field>
                  <Field label="Secretaría"><Input value={form.secretaria} onChange={(e) => setForm({ ...form, secretaria: e.target.value })} /></Field>
                  <Field label="Cargo"><Input value={form.cargo} onChange={(e) => setForm({ ...form, cargo: e.target.value })} /></Field>
                </div>
                <div className="mt-6 flex items-center justify-end gap-3">
                  {saved && <span className="inline-flex items-center gap-1 text-xs text-primary"><CheckCircle2 className="h-3.5 w-3.5" /> Cambios guardados</span>}
                  <button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">Guardar cambios</button>
                </div>
              </form>
            )}
            {tab === "seguridad" && (
              <div className="space-y-4 max-w-md">
                <Field label="Contraseña actual"><Input type="password" /></Field>
                <Field label="Nueva contraseña"><Input type="password" /></Field>
                <Field label="Confirmar nueva contraseña"><Input type="password" /></Field>
                <div className="flex justify-end"><button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">Actualizar contraseña</button></div>
                <div className="mt-6 p-4 rounded-md border border-border bg-muted/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Autenticación de dos factores</div>
                      <div className="text-xs text-muted-foreground">Refuerza el acceso con un código adicional.</div>
                    </div>
                    <button className="h-8 px-3 rounded-md border border-border text-xs">Activar</button>
                  </div>
                </div>
              </div>
            )}
            {tab === "sesiones" && (
              <ul className="divide-y divide-border">
                {[
                  { d: "Navegador actual · Chrome", l: "Santa Cruz, BO", h: "Activa ahora", cur: true },
                  { d: "Firefox · Windows", l: "Buena Vista, BO", h: "hace 2 días" },
                  { d: "Móvil · Safari", l: "Santa Cruz, BO", h: "hace 1 semana" },
                ].map((s, i) => (
                  <li key={i} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{s.d}{s.cur && <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary">Esta sesión</span>}</div>
                      <div className="text-xs text-muted-foreground">{s.l} · {s.h}</div>
                    </div>
                    {!s.cur && <button className="text-xs text-destructive hover:underline">Cerrar sesión</button>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Row({ icon: Icon, label }: { icon: typeof User; label: string }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon className="h-4 w-4 shrink-0" />
      <span className="truncate text-foreground/85">{label}</span>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-foreground">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-full h-10 px-3 rounded-md border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring" />;
}
