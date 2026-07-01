import { useEffect, useRef } from "react";
import { useTypewriter } from "../hooks/use-typewriter";

interface TypedLineProps {
  text: string;
  speedMs?: number;
  startDelayMs?: number;
  enabled?: boolean;
  withCursor?: boolean;
  onDone?: () => void;
}

/**
 * Texto con efecto de tipeo. Los lectores de pantalla reciben el texto
 * completo de entrada (sr-only); la animación queda aria-hidden.
 */
export function TypedLine({
  text,
  speedMs,
  startDelayMs,
  enabled = true,
  withCursor = false,
  onDone,
}: TypedLineProps) {
  const { output, done } = useTypewriter(text, { speedMs, startDelayMs, enabled });
  const onDoneRef = useRef(onDone);
  const firedRef = useRef(false);

  useEffect(() => {
    onDoneRef.current = onDone;
  });

  useEffect(() => {
    if (done && !firedRef.current) {
      firedRef.current = true;
      onDoneRef.current?.();
    }
    if (!done) {
      firedRef.current = false;
    }
  }, [done]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {output}
        {withCursor && !done ? <span className="cursor">█</span> : null}
      </span>
    </>
  );
}
