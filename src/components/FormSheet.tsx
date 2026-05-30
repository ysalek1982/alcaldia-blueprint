import type { ReactNode } from "react";
import { X } from "lucide-react";

export function FormSheet({
  open, onClose, title, description, children, footer, size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "md" | "lg";
}) {
  if (!open) return null;
  const widths = { md: "max-w-md", lg: "max-w-2xl" };
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={`relative ml-auto h-full w-full ${widths[size]} bg-card border-l border-border shadow-xl flex flex-col`}>
        <div className="px-5 py-4 border-b border-border flex items-start justify-between">
          <div>
            <h2 className="font-semibold text-foreground">{title}</h2>
            {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          </div>
          <button onClick={onClose} className="h-8 w-8 rounded-md hover:bg-muted flex items-center justify-center">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
        {footer && <div className="px-5 py-3 border-t border-border bg-card flex items-center justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}

export function Field({
  label, hint, error, children,
}: { label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <label className="block mb-4">
      <div className="text-xs font-medium text-foreground mb-1.5">{label}</div>
      {children}
      {hint && !error && <div className="text-[11px] text-muted-foreground mt-1">{hint}</div>}
      {error && <div className="text-[11px] text-destructive mt-1">{error}</div>}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`h-9 w-full px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring ${props.className ?? ""}`}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`h-9 w-full px-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring ${props.className ?? ""}`}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full p-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-[80px] ${props.className ?? ""}`}
    />
  );
}
