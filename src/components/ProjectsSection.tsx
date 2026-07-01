import { PROJECTS, type Project } from "../data/projects";
import { SECTION_IDS } from "../lib/terminal";
import { TerminalSection } from "./TerminalSection";
import styles from "./ProjectsSection.module.css";

function ProjectEntry({ project }: { project: Project }) {
  const fileName = `${project.name}.md`;
  const hasLinks = Boolean(project.repoUrl ?? project.liveUrl);

  return (
    <details className={styles.entry}>
      <summary className={styles.summary}>
        <span className={styles.marker} aria-hidden="true" />
        <span className={`${styles.meta} dim`} aria-hidden="true">
          -rw-r--r--
        </span>
        <span className={styles.fileName}>{fileName}</span>
      </summary>
      <div className={styles.body}>
        <p className={styles.description}>{project.description}</p>
        <p className="dim">tech: {project.tech.join(" · ")}</p>
        {hasLinks ? (
          <p className={styles.links}>
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} — repositorio`}
              >
                [ repo ↗ ]
              </a>
            ) : null}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} — demo en vivo`}
              >
                [ live ↗ ]
              </a>
            ) : null}
          </p>
        ) : (
          <p className="dim">links: coming soon</p>
        )}
      </div>
    </details>
  );
}

export function ProjectsSection() {
  return (
    <TerminalSection command="ls ./projects" id={SECTION_IDS.projects} srLabel="projects">
      {PROJECTS.length === 0 ? (
        <p className="output-line dim">ls: ./projects is empty — coming soon</p>
      ) : (
        <>
          <p className={`output-line dim ${styles.total}`} aria-hidden="true">
            total {PROJECTS.length}
          </p>
          <div>
            {PROJECTS.map((project) => (
              <ProjectEntry key={project.name} project={project} />
            ))}
          </div>
        </>
      )}
    </TerminalSection>
  );
}
