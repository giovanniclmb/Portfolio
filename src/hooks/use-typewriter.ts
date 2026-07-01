import { useEffect, useState } from "react";

interface TypewriterOptions {
  speedMs?: number;
  startDelayMs?: number;
  /** Con false (p. ej. prefers-reduced-motion) el texto aparece completo al instante. */
  enabled?: boolean;
}

interface TypewriterState {
  output: string;
  done: boolean;
}

export function useTypewriter(
  text: string,
  { speedMs = 28, startDelayMs = 0, enabled = true }: TypewriterOptions = {},
): TypewriterState {
  const [charCount, setCharCount] = useState(enabled ? 0 : text.length);

  useEffect(() => {
    if (!enabled) {
      setCharCount(text.length);
      return;
    }

    setCharCount(0);
    let intervalId: number | undefined;

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setCharCount((current) => {
          if (current >= text.length) {
            window.clearInterval(intervalId);
            return current;
          }
          return current + 1;
        });
      }, speedMs);
    }, startDelayMs);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, [text, enabled, speedMs, startDelayMs]);

  return { output: text.slice(0, charCount), done: charCount >= text.length };
}
