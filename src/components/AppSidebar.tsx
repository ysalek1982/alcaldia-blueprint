import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, Receipt, MapPinned, CreditCard,
  Globe, ShieldCheck, BarChart3, FileText, Settings, LogOut,
  User, HelpCircle,
} from "lucide-react";
import logo from "@/assets/logo-buenavista.svg";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/rrhh", label: "Recursos Humanos", icon: Users },
  { to: "/recaudaciones", label: "Recaudaciones", icon: Receipt },
  { to: "/catastro", label: "Catastro Digital", icon: MapPinned },
  { to: "/pagos", label: "Pagos Electrónicos", icon: CreditCard },
  { to: "/portal", label: "Portal Ciudadano", icon: Globe },
  { to: "/fiscalizacion", label: "Fiscalización", icon: ShieldCheck },
  { to: "/reportes", label: "Reportes / BI", icon: BarChart3 },
  { to: "/expedientes", label: "Expedientes", icon: FileText },
  { to: "/configuracion", label: "Configuración", icon: Settings },
] as const;

const navSecondary = [
  { to: "/perfil", label: "Mi perfil", icon: User },
  { to: "/ayuda", label: "Ayuda", icon: HelpCircle },
] as const;


export function AppSidebar({ onSignOut }: { onSignOut?: () => Promise<void> | void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden md:flex w-72 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="px-5 py-5 border-b border-sidebar-border flex items-center gap-3">
        <div className="h-12 w-12 rounded-md bg-white/95 p-1 flex items-center justify-center shadow-sm">
          <img src={logo} alt="G.A.M. Buena Vista" className="h-full w-full object-contain" />
        </div>
        <div className="leading-tight">
          <div className="text-[11px] uppercase tracking-wider text-sidebar-foreground/70">G.A.M.</div>
          <div className="font-semibold text-sm">Buena Vista</div>
          <div className="text-[10px] text-sidebar-foreground/60">Sistema Integral Municipal</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = path === item.to || path.startsWith(item.to + "/");
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-sm"
                  : "text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-2 py-2 border-t border-sidebar-border space-y-0.5">
        {navSecondary.map((item) => {
          const Icon = item.icon;
          const active = path === item.to || path.startsWith(item.to + "/");
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-sm"
                  : "text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => onSignOut?.()}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-sidebar-foreground/85 hover:bg-sidebar-accent"
        >
          <LogOut className="h-4 w-4" /> Cerrar sesión
        </button>
        <div className="mt-3 text-[10px] text-sidebar-foreground/55 px-3">
          v1.0 · Conectado a Lovable Cloud
        </div>
      </div>

    </aside>
  );
}
