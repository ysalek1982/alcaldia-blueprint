import { useEffect, type ReactNode } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { AppSidebar } from "./AppSidebar";
import { HeaderActions } from "./HeaderActions";
import { useAuth } from "@/lib/auth";


const PUBLIC_PREFIXES = ["/portal"];

function isPublic(path: string) {
  return PUBLIC_PREFIXES.some((p) => path === p || path.startsWith(p + "/"));
}

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { isAuthenticated, loading, profile, roles, signOut, user } = useAuth();

  const requiresAuth = !isPublic(path);

  useEffect(() => {
    if (requiresAuth && !loading && !isAuthenticated) {
      navigate({ to: "/", replace: true });
    }
  }, [requiresAuth, loading, isAuthenticated, navigate]);

  if (requiresAuth && (loading || !isAuthenticated)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-sm text-muted-foreground">Verificando sesión…</div>
      </div>
    );
  }

  const displayName = profile?.nombre_completo || user?.email || "Invitado";
  const initials = displayName
    .split(" ").filter(Boolean).slice(0, 2).map((s) => s[0]?.toUpperCase()).join("") || "U";
  const primaryRole = roles[0] ?? (isAuthenticated ? "consulta" : "ciudadano");

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar onSignOut={signOut} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center px-6 gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-foreground truncate">{title}</h1>
            {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
          </div>
          <div className="hidden lg:flex items-center gap-2 px-3 h-9 rounded-md bg-muted text-muted-foreground text-sm w-72">
            <Search className="h-4 w-4" />
            <span className="text-xs">Buscar contribuyente, predio, expediente…</span>
          </div>
          <button className="relative h-9 w-9 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
          </button>
          <div className="flex items-center gap-2 pl-3 border-l border-border">
            <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
              {initials}
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="text-xs font-medium truncate max-w-[160px]">{displayName}</div>
              <div className="text-[10px] text-muted-foreground capitalize">{primaryRole}</div>
            </div>
            {isAuthenticated && (
              <button
                onClick={() => signOut().then(() => navigate({ to: "/" }))}
                title="Cerrar sesión"
                className="h-9 w-9 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground ml-1"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </header>
        {actions && (
          <div className="px-6 py-3 border-b border-border bg-card/50 flex flex-wrap gap-2">
            {actions}
          </div>
        )}
        <main className="flex-1 p-6 overflow-x-auto">{children}</main>
      </div>
    </div>
  );
}
