import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useId, useState } from "react";
import type { TimelineStep } from "../data/scenario";

export function TopBar({ title, onBack }: { title: string; onBack?: () => void }) {
  return (
    <header className="topbar">
      {onBack ? (
        <button type="button" className="icon-button" onClick={onBack} aria-label="Go back">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : (
        <span className="icon-spacer" aria-hidden="true" />
      )}
      <h1 className="topbar-title">{title}</h1>
    </header>
  );
}

type ButtonVariant = "primary" | "secondary";

export function Button({
  variant = "primary",
  fullWidth = false,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; fullWidth?: boolean }) {
  const className = `btn btn-${variant}${fullWidth ? " btn-block" : ""}`;
  return <button type="button" className={className} {...rest} />;
}

export type PillTone = "pending" | "ok" | "neutral";

export function StatusPill({ tone, children }: { tone: PillTone; children: ReactNode }) {
  return <span className={`pill pill-${tone}`}>{children}</span>;
}

export function SummaryRows({ rows }: { rows: Array<{ label: string; value: string }> }) {
  return (
    <dl className="summary-rows">
      {rows.map((row) => (
        <div key={row.label} className="summary-row">
          <dt>{row.label}</dt>
          <dd>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

const STATE_WORD: Record<TimelineStep["state"], string> = {
  done: "Completed",
  current: "In progress",
  upcoming: "Not started",
};

export function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="timeline" aria-label="Return progress">
      {steps.map((step) => (
        <li key={step.id} className={`timeline-step timeline-${step.state}`}>
          <span className="timeline-marker" aria-hidden="true">
            {step.state === "done" ? (
              <svg viewBox="0 0 24 24" width="14" height="14">
                <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : null}
          </span>
          <div className="timeline-text">
            <p className="timeline-title">{step.title}</p>
            <p className="timeline-detail">{step.detail}</p>
          </div>
          <span className="visually-hidden">{STATE_WORD[step.state]}</span>
        </li>
      ))}
    </ol>
  );
}

export function Disclosure({
  closedLabel,
  openLabel,
  children,
}: {
  closedLabel: string;
  openLabel: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <div className="disclosure">
      <button
        type="button"
        className="disclosure-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? openLabel : closedLabel}
      </button>
      {open ? (
        <div id={panelId} className="disclosure-body">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function ProductPlaceholder({ size = 96 }: { size?: number }) {
  return (
    <div className="product-art" style={{ width: size, height: size }} role="img" aria-label="Product image placeholder">
      <svg viewBox="0 0 64 64" width="62%" height="62%" aria-hidden="true">
        <path d="M24 8h16l7 9-5 4v35H22V21l-5-4z" fill="#b8a2de" />
        <path d="M24 8c1.5 6 14.5 6 16 0" fill="none" stroke="#7c5cc0" strokeWidth="2" strokeLinecap="round" />
        <circle cx="27" cy="30" r="2" fill="#7c5cc0" />
        <circle cx="37" cy="38" r="2" fill="#7c5cc0" />
        <circle cx="30" cy="48" r="2" fill="#7c5cc0" />
      </svg>
    </div>
  );
}
