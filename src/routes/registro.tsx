import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import logo from "@/assets/logo-buenavista.svg";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/registro")({
  head: () => ({ meta: [{ title: "Solicitar registro — Buena Vista" }] }),
  component: Registro,
});

const SECRETARIAS = [
  "Despacho Municipal", "Secretaría Administrativa Financiera", "Secretaría Técnica",
  "Secretaría de Desarrollo Humano", "Secretaría de Desarrollo Productivo",
  "Recaudaciones", "Catastro", "RRHH", "Fiscalización", "Comunicación",
];

function Registro() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [f, setF] = useState({ nombre_completo: "", email: "", password: "", secretaria: SECRETARIAS[0], cargo: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (f.password.length < 6) { setError("La contraseña debe tener al menos 6 caracteres."); return; }
    setLoading(true);
    const { error: err } = await signUp(f);
    setLoading(false);
    if (err) {
      setError(err.includes("already registered") ? "Este correo ya está registrado." : err);
      return;
    }
    setSuccess(true);
    setTimeout(() => navigate({ to: "/" }), 2500);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="max-w-md w-full bg-card border border-border rounded-lg p-8 text-center">
          <div className="h-14 w-14 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-lg font-semibold">Solicitud registrada</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Hemos enviado un correo de verificación a <span className="font-medium text-foreground">{f.email}</span>.
            Confirma tu correo para activar el acceso. Un administrador deberá asignarte el rol correspondiente.
          </p>
          <Link to="/" className="mt-6 inline-block text-sm text-primary font-medium hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-md bg-card border border-border p-1 flex items-center justify-center">
            <img src={logo} alt="" className="h-full w-full object-contain" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">G.A.M. Buena Vista</div>
            <div className="font-semibold">Solicitar registro</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h1 className="text-xl font-semibold">Cuenta de funcionario</h1>
          <p className="text-xs text-muted-foreground mt-1">
            El alta inicial te asigna el rol <strong>Consulta</strong>. Un administrador debe elevar tu rol.
          </p>

          <form onSubmit={submit} className="mt-5 space-y-3">
            {error && (
              <div className="flex items-start gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-xs">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            <Input label="Nombre completo" value={f.nombre_completo} onChange={(v) => setF({ ...f, nombre_completo: v })} required />
            <Input label="Correo institucional" type="email" value={f.email} onChange={(v) => setF({ ...f, email: v })} required />
            <Input label="Contraseña" type="password" value={f.password} onChange={(v) => setF({ ...f, password: v })} required minLength={6} hint="Mínimo 6 caracteres" />
            <div>
              <label className="text-xs font-medium">Secretaría / Área</label>
              <select value={f.secretaria} onChange={(e) => setF({ ...f, secretaria: e.target.value })}
                className="mt-1 w-full h-10 px-2 rounded-md border border-input bg-background text-sm">
                {SECRETARIAS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <Input label="Cargo" value={f.cargo} onChange={(v) => setF({ ...f, cargo: v })} placeholder="ej. Analista, Jefe de Unidad" />
            <button type="submit" disabled={loading}
              className="w-full h-10 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 flex items-center justify-center gap-2 disabled:opacity-70">
              {loading ? "Enviando…" : <>Crear cuenta <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>
        </div>

        <div className="text-center text-xs text-muted-foreground mt-4">
          ¿Ya tienes cuenta? <Link to="/" className="text-primary font-medium hover:underline">Iniciar sesión</Link>
        </div>
      </div>
    </div>
  );
}

function Input({ label, hint, value, onChange, ...rest }: {
  label: string; hint?: string; value: string; onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <label className="block">
      <div className="text-xs font-medium">{label}</div>
      <input {...rest} value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
      {hint && <div className="text-[11px] text-muted-foreground mt-1">{hint}</div>}
    </label>
  );
}
