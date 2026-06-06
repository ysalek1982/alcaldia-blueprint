import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, Search, LogOut, User, HelpCircle, Settings as SettingsIcon, ChevronDown, X } from "lucide-react";

type NavTarget = { to: string; label: string; group: string };

const TARGETS: NavTarget[] = [
  { to: "/dashboard", label: "Dashboard", group: "General" },
  { to: "/perfil", label: "Mi perfil", group: "General" },
  { to: "/ayuda", label: "Ayuda / Soporte", group: "General" },
  { to: "/rrhh", label: "RRHH · Resumen", group: "RRHH" },
  { to: "/rrhh/funcionarios", label: "Funcionarios", group: "RRHH" },
  { to: "/rrhh/planillas", label: "Planillas", group: "RRHH" },
  { to: "/rrhh/solicitudes", label: "Solicitudes", group: "RRHH" },
  { to: "/rrhh/organigrama", label: "Organigrama", group: "RRHH" },
  { to: "/recaudaciones", label: "Recaudaciones · Resumen", group: "Recaudaciones" },
  { to: "/recaudaciones/contribuyentes", label: "Contribuyentes", group: "Recaudaciones" },
  { to: "/recaudaciones/deudas", label: "Deudas", group: "Recaudaciones" },
  { to: "/recaudaciones/conceptos", label: "Conceptos tributarios", group: "Recaudaciones" },
  { to: "/recaudaciones/mora", label: "Mora", group: "Recaudaciones" },
  { to: "/catastro", label: "Catastro · Resumen", group: "Catastro" },
  { to: "/catastro/predios", label: "Predios", group: "Catastro" },
  { to: "/catastro/mapa", label: "Mapa catastral", group: "Catastro" },
  { to: "/catastro/zonas", label: "Zonas / UV", group: "Catastro" },
  { to: "/catastro/tramites", label: "Trámites técnicos", group: "Catastro" },
  { to: "/pagos", label: "Pagos · Resumen", group: "Pagos" },
  { to: "/pagos/ordenes", label: "Órdenes de pago", group: "Pagos" },
  { to: "/pagos/movimientos", label: "Movimientos", group: "Pagos" },
  { to: "/pagos/conciliacion", label: "Conciliación", group: "Pagos" },
  { to: "/pagos/canales", label: "Canales de cobro", group: "Pagos" },
  { to: "/portal", label: "Portal ciudadano", group: "Portal" },
  { to: "/portal/consulta", label: "Consulta de deuda", group: "Portal" },
  { to: "/portal/pagar", label: "Pagar en línea", group: "Portal" },
  { to: "/portal/reclamos", label: "Reclamos", group: "Portal" },
  { to: "/fiscalizacion", label: "Fiscalización · Resumen", group: "Fiscalización" },
  { to: "/fiscalizacion/notificaciones", label: "Notificaciones tributarias", group: "Fiscalización" },
  { to: "/fiscalizacion/casos", label: "Casos", group: "Fiscalización" },
  { to: "/fiscalizacion/coactivo", label: "Procesos coactivos", group: "Fiscalización" },
  { to: "/reportes", label: "Reportes / BI", group: "Reportes" },
  { to: "/reportes/catalogo", label: "Catálogo de reportes", group: "Reportes" },
  { to: "/expedientes", label: "Expedientes · Resumen", group: "Expedientes" },
  { to: "/expedientes/lista", label: "Lista de expedientes", group: "Expedientes" },
  { to: "/expedientes/plantillas", label: "Plantillas", group: "Expedientes" },
  { to: "/configuracion", label: "Configuración general", group: "Configuración" },
  { to: "/configuracion/usuarios", label: "Usuarios del sistema", group: "Configuración" },
  { to: "/configuracion/roles", label: "Roles y permisos", group: "Configuración" },
  { to: "/configuracion/auditoria", label: "Auditoría", group: "Configuración" },
  { to: "/configuracion/conexiones", label: "Conexiones / integraciones", group: "Configuración" },
];

const NOTIFICACIONES = [
  { t: "Pago recibido", d: "Bs. 1.240 · Imp. inmueble #BV-24-0312", h: "hace 4 min", c: "primary" as const },
  { t: "Solicitud pendiente", d: "Vacación · Luis Peña — 7 días", h: "hace 22 min", c: "accent" as const },
  { t: "Mora detectada", d: "5 contribuyentes superan 90 días", h: "hace 1 h", c: "destructive" as const },
  { t: "Conciliación bancaria", d: "12 movimientos sin emparejar", h: "hace 2 h", c: "secondary" as const },
  { t: "Nuevo predio registrado", d: "UV-12 · Mz 4 · Lt 7", h: "hace 3 h", c: "primary" as const },
];

export function HeaderActions({
  displayName, initials, primaryRole, isAuthenticated, onSignOut,
}: {
  displayName: string; initials: string; primaryRole: string;
  isAuthenticated: boolean; onSignOut: () => void;
}) {
  const navigate = useNavigate();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); setPaletteOpen(true);
      } else if (e.key === "Escape") {
        setPaletteOpen(false); setBellOpen(false); setUserOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => { if (paletteOpen) setTimeout(() => inputRef.current?.focus(), 30); }, [paletteOpen]);

  const filtered = q.trim()
    ? TARGETS.filter((t) => (t.label + " " + t.group).toLowerCase().includes(q.toLowerCase())).slice(0, 12)
    : TARGETS.slice(0, 10);

  const go = (to: string) => { setPaletteOpen(false); setQ(""); navigate({ to }); };
  const toneDot: Record<string, string> = {
    primary: "bg-primary", secondary: "bg-secondary", accent: "bg-accent", destructive: "bg-destructive",
  };

  return (
    <>
      <button
        onClick={() => setPaletteOpen(true)}
        className="hidden lg:flex items-center gap-2 px-3 h-9 rounded-md bg-muted text-muted-foreground text-sm w-72 hover:bg-muted/70 transition-colors"
        title="Buscar (Ctrl+K)"
      >
        <Search className="h-4 w-4" />
        <span className="text-xs flex-1 text-left">Buscar módulo, pantalla o sección…</span>
        <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-background border border-border">⌘K</kbd>
      </button>

      <button onClick={() => setPaletteOpen(true)} className="lg:hidden h-9 w-9 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground" title="Buscar">
        <Search className="h-4 w-4" />
      </button>

      <div className="relative">
        <button
          onClick={() => { setBellOpen((v) => !v); setUserOpen(false); }}
          className="relative h-9 w-9 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
        </button>
        {bellOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setBellOpen(false)} />
            <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <div className="font-semibold text-sm">Notificaciones</div>
                <button onClick={() => setBellOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
              </div>
              <ul className="max-h-80 overflow-y-auto divide-y divide-border">
                {NOTIFICACIONES.map((n, i) => (
                  <li key={i} className="px-4 py-3 hover:bg-muted/50">
                    <div className="flex items-start gap-2">
                      <span className={`mt-1.5 h-2 w-2 rounded-full ${toneDot[n.c]} shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium truncate">{n.t}</span>
                          <span className="text-[10px] text-muted-foreground">{n.h}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{n.d}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-2 border-t border-border text-center">
                <Link to="/configuracion/auditoria" onClick={() => setBellOpen(false)} className="text-xs text-primary hover:underline">Ver toda la actividad →</Link>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 pl-3 border-l border-border relative">
        <button
          onClick={() => { setUserOpen((v) => !v); setBellOpen(false); }}
          className="flex items-center gap-2 hover:bg-muted rounded-md px-1 py-1"
        >
          <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
            {initials}
          </div>
          <div className="hidden sm:block leading-tight text-left">
            <div className="text-xs font-medium truncate max-w-[160px]">{displayName}</div>
            <div className="text-[10px] text-muted-foreground capitalize">{primaryRole}</div>
          </div>
          <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:block" />
        </button>
        {userOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setUserOpen(false)} />
            <div className="absolute right-0 top-full mt-2 w-60 bg-card border border-border rounded-lg shadow-lg z-50 py-1">
              <div className="px-3 py-2 border-b border-border">
                <div className="text-sm font-medium truncate">{displayName}</div>
                <div className="text-[11px] text-muted-foreground capitalize">Rol: {primaryRole}</div>
              </div>
              <button onClick={() => { setUserOpen(false); navigate({ to: "/perfil" }); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted text-left">
                <User className="h-4 w-4 text-muted-foreground" /> Mi perfil
              </button>
              <button onClick={() => { setUserOpen(false); navigate({ to: "/configuracion" }); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted text-left">
                <SettingsIcon className="h-4 w-4 text-muted-foreground" /> Configuración
              </button>
              <button onClick={() => { setUserOpen(false); navigate({ to: "/ayuda" }); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted text-left">
                <HelpCircle className="h-4 w-4 text-muted-foreground" /> Ayuda
              </button>
              {isAuthenticated && (
                <>
                  <div className="my-1 h-px bg-border" />
                  <button onClick={() => { setUserOpen(false); onSignOut(); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-destructive/10 text-destructive text-left">
                    <LogOut className="h-4 w-4" /> Cerrar sesión
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {paletteOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-start justify-center pt-24 px-4" onClick={() => setPaletteOpen(false)}>
          <div className="w-full max-w-xl bg-card border border-border rounded-lg shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 px-4 h-12 border-b border-border">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar módulo, pantalla o sección…"
                className="flex-1 bg-transparent outline-none text-sm"
                onKeyDown={(e) => { if (e.key === "Enter" && filtered[0]) go(filtered[0].to); }}
              />
              <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-muted border border-border text-muted-foreground">esc</kbd>
            </div>
            <ul className="max-h-96 overflow-y-auto py-2">
              {filtered.length === 0 && <li className="px-4 py-6 text-center text-sm text-muted-foreground">Sin resultados</li>}
              {filtered.map((t) => (
                <li key={t.to}>
                  <button onClick={() => go(t.to)} className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-muted text-left">
                    <span className="truncate">{t.label}</span>
                    <span className="text-[10px] text-muted-foreground ml-3 shrink-0">{t.group}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="px-4 py-2 border-t border-border text-[11px] text-muted-foreground flex justify-between">
              <span>↵ para abrir</span>
              <span>⌘K para alternar</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
