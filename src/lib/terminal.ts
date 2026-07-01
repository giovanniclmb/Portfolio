import { PROFILE } from "../data/profile";

export const SECTION_IDS = {
  whoami: "whoami",
  stack: "stack",
  projects: "projects",
  contact: "contact",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export type CommandResult =
  | { kind: "output"; lines: string[] }
  | { kind: "scroll"; targetId: SectionId; lines: string[] }
  | { kind: "not-found"; input: string }
  | { kind: "clear" };

const HELP_LINES = [
  "available commands:",
  "  help      show this list",
  "  whoami    who is behind this terminal",
  "  stack     jump to the tech stack",
  "  projects  jump to the project listing",
  "  contact   jump to contact channels",
  "  clear     clear this terminal",
];

export function runCommand(rawInput: string): CommandResult {
  const input = rawInput.trim();
  const [command = ""] = input.toLowerCase().split(/\s+/);

  switch (command) {
    case "":
      return { kind: "output", lines: [] };
    case "help":
      return { kind: "output", lines: HELP_LINES };
    case "clear":
      return { kind: "clear" };
    case "whoami":
      return {
        kind: "scroll",
        targetId: SECTION_IDS.whoami,
        lines: [
          `${PROFILE.name.toLowerCase()} — ${PROFILE.role.toLowerCase()}`,
          "→ jumping to #whoami",
        ],
      };
    case "stack":
      return {
        kind: "scroll",
        targetId: SECTION_IDS.stack,
        lines: ["→ jumping to #stack"],
      };
    case "projects":
      return {
        kind: "scroll",
        targetId: SECTION_IDS.projects,
        lines: ["→ jumping to #projects"],
      };
    case "contact":
      return {
        kind: "scroll",
        targetId: SECTION_IDS.contact,
        lines: ["→ jumping to #contact"],
      };
    default:
      return { kind: "not-found", input };
  }
}
