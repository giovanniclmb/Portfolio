import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/use-prefers-reduced-motion";
import { TypedLine } from "./TypedLine";
import styles from "./BootSequence.module.css";

const BOOT_LINES = [
  "GIOVANNI-OS BIOS v5.0 — 640K RAM OK",
  "Loading /usr/bin/portfolio ......... OK",
  "Starting session as giovanni@portfolio",
];

const COMPLETE_PAUSE_MS = 400;
const TYPE_SPEED_MS = 14;

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const allTyped = lineIndex >= BOOT_LINES.length;

  // Cualquier tecla o click saltea el boot
  useEffect(() => {
    const skip = () => onComplete();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [onComplete]);

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
    }
  }, [reducedMotion, onComplete]);

  useEffect(() => {
    if (!allTyped) {
      return;
    }
    const timeoutId = window.setTimeout(onComplete, COMPLETE_PAUSE_MS);
    return () => window.clearTimeout(timeoutId);
  }, [allTyped, onComplete]);

  return (
    <div className={styles.boot} role="status" aria-label="Loading portfolio">
      <div aria-hidden="true">
        {BOOT_LINES.slice(0, lineIndex + 1).map((line, index) =>
          index < lineIndex ? (
            <p key={line} className="output-line">
              {line}
            </p>
          ) : (
            <p key={line} className="output-line">
              <TypedLine
                text={line}
                speedMs={TYPE_SPEED_MS}
                enabled={!reducedMotion}
                withCursor
                onDone={() => setLineIndex((current) => current + 1)}
              />
            </p>
          ),
        )}
        <p className={styles.skipHint}>[ press any key to skip ]</p>
      </div>
    </div>
  );
}
