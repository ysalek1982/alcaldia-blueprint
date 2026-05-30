import type { ComponentType, ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AppShell } from "./AppShell";
import { ChevronRight } from "lucide-react";

export type SubNavItem = {
  to: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
  badge?: string | number;
};

export function ModuleShell({
  title,
  subtitle,
  subnav,
  actions,
  children,
  breadcrumb,
}: {
  title: string;
  subtitle?: string;
  subnav: SubNavItem[];
  actions?: ReactNode;
  children: ReactNode;
  breadcrumb?: { label: string; to?: string }[];
}) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <AppShell title={title} subtitle={subtitle} actions={actions}>
      <div className="-mx-6 -mt-6 mb-6 px-6 py-3 border-b border-border bg-card/40">
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-2">
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {b.to ? <Link to={b.to} className="hover:text-foreground">{b.label}</Link> : <span>{b.label}</span>}
                {i < breadcrumb.length - 1 && <ChevronRight className="h-3 w-3" />}
              </span>
            ))}
          </div>
        )}
        <nav className="flex flex-wrap gap-1">
          {subnav.map((it) => {
            const active = path === it.to || (it.to !== subnav[0]?.to && path.startsWith(it.to + "/"));
            const Icon = it.icon;
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`inline-flex items-center gap-2 h-8 px-3 rounded-md text-xs font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                <span>{it.label}</span>
                {it.badge !== undefined && (
                  <span className={`ml-1 px-1.5 py-0 rounded-full text-[10px] ${active ? "bg-primary-foreground/20" : "bg-muted-foreground/15"}`}>
                    {it.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      {children}
    </AppShell>
  );
}
