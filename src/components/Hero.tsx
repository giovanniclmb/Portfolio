import { useState } from "react";
import { PROFILE, PROMPT } from "../data/profile";
import { SECTION_IDS } from "../lib/terminal";
import { TypedLine } from "./TypedLine";
import styles from "./Hero.module.css";

const LAST_LOGIN = new Date().toDateString();

interface HeroProps {
  animate: boolean;
}

export function Hero({ animate }: HeroProps) {
  const [nameDone, setNameDone] = useState(!animate);

  return (
    <section
      id={SECTION_IDS.whoami}
      aria-labelledby="whoami-heading"
      className="term-section"
    >
      <p className={`${styles.lastLogin} dim`} aria-hidden="true">
        Last login: {LAST_LOGIN} on ttys001
      </p>
      <p className="prompt-line" aria-hidden="true" translate="no">
        <span className="prompt-prefix">{PROMPT} </span>
        <span className="prompt-cmd">whoami</span>
      </p>
      <h1 id="whoami-heading" className={styles.name}>
        {animate ? (
          <TypedLine
            text={PROFILE.name}
            speedMs={55}
            withCursor
            onDone={() => setNameDone(true)}
          />
        ) : (
          PROFILE.name
        )}
      </h1>
      <p className={styles.role}>
        {nameDone ? (
          <>
            <span className="dim" aria-hidden="true">
              {"> "}
            </span>
            {animate ? <TypedLine text={PROFILE.role} speedMs={30} withCursor /> : PROFILE.role}
          </>
        ) : (
          " "
        )}
      </p>
    </section>
  );
}
