import type { ReactNode } from "react";
import { PROMPT } from "../data/profile";

interface TerminalSectionProps {
  command: string;
  id: string;
  /** Aclaración para lectores de pantalla: el heading visible es el comando. */
  srLabel: string;
  children: ReactNode;
}

export function TerminalSection({ command, id, srLabel, children }: TerminalSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="term-section">
      <h2 id={`${id}-heading`} className="prompt-line" translate="no">
        <span className="prompt-prefix" aria-hidden="true">
          {PROMPT}{" "}
        </span>
        <span className="prompt-cmd">{command}</span>
        <span className="sr-only"> — {srLabel}</span>
      </h2>
      {children}
    </section>
  );
}
