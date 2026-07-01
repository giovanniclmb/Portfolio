import { CONTACT_LINKS } from "../data/contact";
import { SECTION_IDS } from "../lib/terminal";
import { TerminalSection } from "./TerminalSection";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  return (
    <TerminalSection command="cat contact.txt" id={SECTION_IDS.contact} srLabel="contact">
      <ul className={styles.list} role="list">
        {CONTACT_LINKS.map(({ label, value, href, Icon, external }) => (
          <li key={label}>
            <a
              className={styles.link}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <Icon className={styles.icon} aria-hidden="true" />
              <span className={`${styles.label} dim`} aria-hidden="true">
                {label}
              </span>
              <span className={styles.value}>{value}</span>
            </a>
          </li>
        ))}
      </ul>
    </TerminalSection>
  );
}
