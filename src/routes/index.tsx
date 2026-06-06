import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Building2, ShieldCheck, ArrowRight, AlertCircle } from "lucide-react";
import logo from "@/assets/logo-buenavista.svg";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sistema Integral Municipal — G.A.M. Buena Vista" },
      { name: "description", content: "Plataforma de gestión municipal: RRHH, recaudaciones, catastro digital y pagos electrónicos del Gobierno Autónomo Municipal de Buena Vista." },
      { property: "og:title", content: "Sistema Integral Municipal — Buena Vista" },
      { property: "og:description", content: "Gestión modular, auditable y escalable para la alcaldía de Buena Vista, Santa Cruz, Bolivia." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const { signIn, isAuthenticated, loading: authLoading, enterDemo } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate({ to: "/dashboard", replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await signIn(email.trim(), password);
    setLoading(false);
    if (err) {
      setError(err === "Invalid login credentials" ? "Credenciales incorrectas." : err);
      return;
    }
    navigate({ to: "/dashboard", replace: true });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="relative hidden lg:flex flex-col justify-between p-12 text-sidebar-foreground overflow-hidden"
        style={{ background: "linear-gradient(135deg, oklch(0.34 0.08 150) 0%, oklch(0.42 0.07 195) 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        <div className="relative flex items-center gap-3">
          <div className="h-14 w-14 rounded-md bg-white/95 p-1.5 flex items-center justify-center shadow">
            <img src={logo} alt="Escudo Buena Vista" className="h-full w-full object-contain" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/70">Gobierno Autónomo Municipal</div>
            <div className="text-xl font-semibold">Buena Vista</div>
            <div className="text-[11px] text-white/60">Santa Cruz · Bolivia</div>
          </div>
        </div>

        <div className="relative space-y-4 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Sistema Integral Municipal · v1.0
          </div>
          <h2 className="text-3xl font-semibold leading-tight">
            Una columna vertebral institucional para una alcaldía de excelencia.
          </h2>
          <p className="text-white/75 text-sm leading-relaxed">
            Recursos humanos, recaudaciones, catastro digital, pagos electrónicos,
            fiscalización y atención ciudadana — con trazabilidad completa,
            auditoría y reportes gerenciales en tiempo real.
          </p>
          <div className="grid grid-cols-3 gap-3 pt-4">
            {[{ k: "28", v: "Módulos" }, { k: "100%", v: "Auditable" }, { k: "24/7", v: "Disponible" }].map((s) => (
              <div key={s.v} className="rounded-md bg-white/5 border border-white/10 p-3">
                <div className="text-xl font-semibold text-accent">{s.k}</div>
                <div className="text-[11px] text-white/70">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-[11px] text-white/55">
          © {new Date().getFullYear()} G.A.M. Buena Vista · Prototipo técnico
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-md bg-card border border-border p-1 flex items-center justify-center">
              <img src={logo} alt="" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">G.A.M.</div>
              <div className="font-semibold">Buena Vista</div>
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-foreground">Ingreso al sistema</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Acceso restringido al personal autorizado del municipio.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            {error && (
              <div className="flex items-start gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-xs">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            <div>
              <label className="text-xs font-medium text-foreground">Correo institucional</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full h-11 px-3 rounded-md border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="nombre.apellido@buenavista.gob.bo"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground">Contraseña</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full h-11 px-3 rounded-md border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? "Validando…" : <>Ingresar <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>

          <div className="mt-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">o</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            onClick={() => { enterDemo(); navigate({ to: "/dashboard", replace: true }); }}
            className="mt-4 w-full h-11 rounded-md border border-dashed border-primary/50 text-primary text-sm font-medium hover:bg-primary/5 transition-colors"
          >
            Explorar como demo (sin registro)
          </button>

          <div className="mt-4 text-xs text-center text-muted-foreground">
            ¿No tiene cuenta?{" "}
            <Link to="/registro" className="text-primary font-medium hover:underline">
              Solicitar registro
            </Link>
          </div>


          <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2 p-3 rounded-md bg-muted/60">
              <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div><div className="font-medium text-foreground">Auditoría</div><div className="text-muted-foreground">Cada acción queda registrada.</div></div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-md bg-muted/60">
              <Building2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
              <div><div className="font-medium text-foreground">Institucional</div><div className="text-muted-foreground">Normativa vigente del municipio.</div></div>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            ¿Es ciudadano? <Link to="/portal" className="text-primary font-medium hover:underline">Acceder al Portal Ciudadano</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
