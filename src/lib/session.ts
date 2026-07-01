const BOOT_SEEN_KEY = "portfolio:boot-seen";

export function hasSeenBoot(): boolean {
  try {
    return window.sessionStorage.getItem(BOOT_SEEN_KEY) === "1";
  } catch {
    // sessionStorage puede estar bloqueado (modo privado estricto): el boot se repite y listo
    return false;
  }
}

export function markBootSeen(): void {
  try {
    window.sessionStorage.setItem(BOOT_SEEN_KEY, "1");
  } catch {
    // misma degradación que arriba: sin persistencia, el boot vuelve a verse
  }
}
