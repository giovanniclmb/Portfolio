import { describe, expect, it } from "vitest";
import { runCommand } from "./terminal";

const DOCUMENTED_COMMANDS = ["help", "whoami", "stack", "projects", "contact", "clear"];

describe("runCommand", () => {
  it("documenta todos los comandos disponibles en help", () => {
    const result = runCommand("help");
    expect(result.kind).toBe("output");
    const text = result.kind === "output" ? result.lines.join("\n") : "";
    for (const command of DOCUMENTED_COMMANDS) {
      expect(text).toContain(command);
    }
  });

  it("normaliza mayúsculas y espacios alrededor", () => {
    expect(runCommand("  HELP  ").kind).toBe("output");
  });

  it("matchea por primer token, tolerando flags", () => {
    expect(runCommand("stack --icons")).toMatchObject({
      kind: "scroll",
      targetId: "stack",
    });
  });

  it("señala clear para que el caller limpie el historial", () => {
    expect(runCommand("clear")).toEqual({ kind: "clear" });
  });

  it("reporta comandos desconocidos con el input original", () => {
    expect(runCommand("ping example.com")).toEqual({
      kind: "not-found",
      input: "ping example.com",
    });
  });

  it("devuelve salida vacía para un envío en blanco", () => {
    expect(runCommand("   ")).toEqual({ kind: "output", lines: [] });
  });

  it("cada comando de sección scrollea a su ancla", () => {
    for (const section of ["whoami", "stack", "projects", "contact"]) {
      expect(runCommand(section)).toMatchObject({ kind: "scroll", targetId: section });
    }
  });
});
