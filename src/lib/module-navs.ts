// Sub-navegación por módulo (subsistema). Cada sub-ruta usa esta lista al
// invocar <ModuleShell subnav={navRRHH} ...>.

import {
  LayoutGrid, Users, FileSignature, CalendarClock, Briefcase,
  Receipt, FileText, Tag, AlertTriangle,
  MapPinned, Map, Building2, ClipboardList,
  CreditCard, Wallet, ScrollText, Banknote,
  Globe, Search, MessageSquare, QrCode,
  ShieldCheck, Bell, Gavel,
  BarChart3, BookOpen,
  Folder, FilePlus,
  Settings, Key, History, Plug,
} from "lucide-react";
import type { SubNavItem } from "@/components/ModuleShell";

export const navRRHH: SubNavItem[] = [
  { to: "/rrhh", label: "Resumen", icon: LayoutGrid },
  { to: "/rrhh/funcionarios", label: "Funcionarios", icon: Users },
  { to: "/rrhh/planillas", label: "Planillas", icon: FileSignature },
  { to: "/rrhh/solicitudes", label: "Solicitudes", icon: CalendarClock },
  { to: "/rrhh/organigrama", label: "Organigrama", icon: Briefcase },
];

export const navRecaudaciones: SubNavItem[] = [
  { to: "/recaudaciones", label: "Resumen", icon: LayoutGrid },
  { to: "/recaudaciones/contribuyentes", label: "Contribuyentes", icon: Users },
  { to: "/recaudaciones/deudas", label: "Deudas", icon: Receipt },
  { to: "/recaudaciones/conceptos", label: "Conceptos", icon: Tag },
  { to: "/recaudaciones/mora", label: "Mora", icon: AlertTriangle },
];

export const navCatastro: SubNavItem[] = [
  { to: "/catastro", label: "Resumen", icon: LayoutGrid },
  { to: "/catastro/predios", label: "Predios", icon: Building2 },
  { to: "/catastro/mapa", label: "Mapa", icon: Map },
  { to: "/catastro/zonas", label: "Zonas / UV", icon: MapPinned },
  { to: "/catastro/tramites", label: "Trámites técnicos", icon: ClipboardList },
];

export const navPagos: SubNavItem[] = [
  { to: "/pagos", label: "Resumen", icon: LayoutGrid },
  { to: "/pagos/ordenes", label: "Órdenes", icon: ScrollText },
  { to: "/pagos/movimientos", label: "Movimientos", icon: Wallet },
  { to: "/pagos/conciliacion", label: "Conciliación", icon: Banknote },
  { to: "/pagos/canales", label: "Canales", icon: CreditCard },
];

export const navPortal: SubNavItem[] = [
  { to: "/portal", label: "Inicio", icon: Globe },
  { to: "/portal/consulta", label: "Consulta de deuda", icon: Search },
  { to: "/portal/reclamos", label: "Reclamos", icon: MessageSquare },
  { to: "/portal/pagar", label: "Pagar en línea", icon: QrCode },
];

export const navFiscalizacion: SubNavItem[] = [
  { to: "/fiscalizacion", label: "Resumen", icon: LayoutGrid },
  { to: "/fiscalizacion/notificaciones", label: "Notificaciones", icon: Bell },
  { to: "/fiscalizacion/casos", label: "Casos", icon: ShieldCheck },
  { to: "/fiscalizacion/coactivo", label: "Coactivo", icon: Gavel },
];

export const navReportes: SubNavItem[] = [
  { to: "/reportes", label: "Tablero", icon: BarChart3 },
  { to: "/reportes/catalogo", label: "Catálogo", icon: BookOpen },
];

export const navExpedientes: SubNavItem[] = [
  { to: "/expedientes", label: "Resumen", icon: LayoutGrid },
  { to: "/expedientes/lista", label: "Expedientes", icon: Folder },
  { to: "/expedientes/plantillas", label: "Plantillas", icon: FilePlus },
];

export const navConfiguracion: SubNavItem[] = [
  { to: "/configuracion", label: "General", icon: Settings },
  { to: "/configuracion/usuarios", label: "Usuarios", icon: Users },
  { to: "/configuracion/roles", label: "Roles y permisos", icon: Key },
  { to: "/configuracion/auditoria", label: "Auditoría", icon: History },
  { to: "/configuracion/conexiones", label: "Conexiones", icon: Plug },
];
