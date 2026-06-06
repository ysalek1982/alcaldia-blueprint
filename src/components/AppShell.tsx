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
          <HeaderActions
            displayName={displayName}
            initials={initials}
            primaryRole={primaryRole}
            isAuthenticated={isAuthenticated}
            onSignOut={() => signOut().then(() => navigate({ to: "/" }))}
          />

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
