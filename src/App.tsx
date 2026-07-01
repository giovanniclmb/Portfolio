import { useCallback, useState } from "react";
import { BootSequence } from "./components/BootSequence";
import { ContactSection } from "./components/ContactSection";
import { Hero } from "./components/Hero";
import { ProjectsSection } from "./components/ProjectsSection";
import { StackSection } from "./components/StackSection";
import { Terminal } from "./components/Terminal";
import { hasSeenBoot, markBootSeen } from "./lib/session";

export default function App() {
  const [booted, setBooted] = useState(() => hasSeenBoot());
  // Capturado en el primer render: el hero solo se tipea la vez que se vio el boot
  const [animateHero] = useState(() => !hasSeenBoot());

  const handleBootComplete = useCallback(() => {
    markBootSeen();
    setBooted(true);
  }, []);

  return (
    <div className="crt">
      <div className="container">
        {booted ? (
          <main>
            <Hero animate={animateHero} />
            <StackSection />
            <ProjectsSection />
            <ContactSection />
            <Terminal />
          </main>
        ) : (
          <BootSequence onComplete={handleBootComplete} />
        )}
      </div>
    </div>
  );
}
