import { STACK } from "../data/stack";
import { SECTION_IDS } from "../lib/terminal";
import { TerminalSection } from "./TerminalSection";
import styles from "./StackSection.module.css";

export function StackSection() {
  return (
    <TerminalSection command="stack --icons" id={SECTION_IDS.stack} srLabel="tech stack">
      <p className={`output-line dim ${styles.flavor}`} aria-hidden="true">
        {STACK.length} modules loaded
      </p>
      <ul className={styles.grid} role="list">
        {STACK.map(({ label, Icon }) => (
          <li key={label} className={styles.item}>
            <Icon className={styles.icon} aria-hidden="true" />
            <span className={styles.label}>{label}</span>
          </li>
        ))}
      </ul>
    </TerminalSection>
  );
}
