import { useRef, useState, type FormEvent } from "react";
import { PROMPT } from "../data/profile";
import { runCommand, type CommandResult } from "../lib/terminal";
import styles from "./Terminal.module.css";

type VisibleResult = Exclude<CommandResult, { kind: "clear" }>;

interface HistoryEntry {
  id: number;
  input: string;
  result: VisibleResult;
}

export function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [value, setValue] = useState("");
  const nextIdRef = useRef(0);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = runCommand(value);

    if (result.kind === "clear") {
      setHistory([]);
    } else {
      const id = nextIdRef.current++;
      setHistory((current) => [...current, { id, input: value, result }]);
    }

    if (result.kind === "scroll") {
      // El smooth scroll lo gobierna CSS (respetando prefers-reduced-motion)
      document.getElementById(result.targetId)?.scrollIntoView();
    }

    setValue("");
  }

  return (
    <section aria-label="interactive terminal" className={`term-section ${styles.terminal}`}>
      <p className={`dim ${styles.hint}`}>— interactive shell · type 'help' to explore —</p>
      <div role="log" aria-label="terminal output" className={styles.log} translate="no">
        {history.map((entry) => (
          <div key={entry.id} className={styles.entry}>
            <p className="output-line">
              <span className="prompt-prefix">{PROMPT} </span>
              {entry.input}
            </p>
            {entry.result.kind === "not-found" ? (
              <>
                <p className="output-line err">command not found: {entry.result.input}</p>
                <p className="output-line dim">type 'help' to see available commands</p>
              </>
            ) : (
              entry.result.lines.map((line, index) => (
                <p
                  key={index}
                  className={`output-line${entry.result.kind === "scroll" ? " ok" : ""}`}
                >
                  {line}
                </p>
              ))
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className={styles.inputRow} translate="no">
        <label htmlFor="terminal-input" className="prompt-prefix" aria-hidden="true">
          {PROMPT}
        </label>
        <span className={styles.inputWrap}>
          <input
            id="terminal-input"
            name="command"
            className={`${styles.input}${value === "" ? ` ${styles.caretHidden}` : ""}`}
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            aria-label="Terminal command — type help for available commands"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="send"
          />
          {value === "" ? (
            <span className={`cursor ${styles.restCursor}`} aria-hidden="true">
              █
            </span>
          ) : null}
        </span>
      </form>
    </section>
  );
}
