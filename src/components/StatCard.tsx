import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

export function StatCard({
  label, value, hint, icon: Icon, trend, accent = "primary",
}: {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  trend?: number;
  accent?: "primary" | "secondary" | "accent" | "destructive";
}) {
  const tones: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/30 text-accent-foreground",
    destructive: "bg-destructive/10 text-destructive",
  };
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</div>
          <div className="mt-2 text-2xl font-semibold text-foreground">{value}</div>
          {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
        </div>
        <div className={`h-10 w-10 rounded-md flex items-center justify-center ${tones[accent]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {typeof trend === "number" && (
        <div className={`mt-3 flex items-center gap-1 text-xs font-medium ${trend >= 0 ? "text-primary" : "text-destructive"}`}>
          {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {Math.abs(trend)}% vs. mes anterior
        </div>
      )}
    </div>
  );
}
