# Portfolio — Giovanni Colombo

Portfolio personal de una sola página con estética de terminal retro (fósforo ámbar P3 sobre CRT). Construido con **React 19 + TypeScript estricto + Vite**, sin backend: 100 % estático.

## Desarrollo

Requisitos: Node.js 20.19+ (recomendado 22 o superior).

```bash
npm install
npm run dev       
npm run build     
npm run preview   
npm test          
npm run lint      
```

## Editar contenido

Todo el contenido vive en `src/data/` y se edita sin tocar componentes:

| Archivo | Contenido |
|---|---|
| `src/data/profile.ts` | Nombre, rol y prompt de la sesión |
| `src/data/stack.ts` | Tecnologías de la grilla (ícono + etiqueta) |
| `src/data/projects.ts` | Proyectos — **son placeholders, reemplazar** |
| `src/data/contact.ts` | Links de contacto |

Si `PROJECTS` queda vacío, la sección muestra el estado vacío diseñado: `ls: ./projects is empty — coming soon`.

## Terminal interactiva

Al pie de la página hay un prompt real. Comandos disponibles: `help`, `whoami`, `stack`, `projects`, `contact`, `clear`. Los comandos desconocidos responden `command not found`.

## Deploy

- **Vercel:** importar el repositorio; detecta Vite automáticamente (build `npm run build`, output `dist/`).

## Diseño y accesibilidad

- Design tokens centralizados en `src/styles/tokens.css` (paleta ámbar, tipografía, espaciado): cambiar el tema completo se hace ahí.
- Tipografías: VT323 (display) + IBM Plex Mono (cuerpo), self-hosted vía `@fontsource` — sin CDNs externas.
- Los efectos CRT (scanlines, viñeta, flicker, tipeo) se desactivan con `prefers-reduced-motion` y se simplifican en pantallas chicas.
- Contraste AA/AAA verificado sobre el fondo, foco visible por teclado y textos completos para lectores de pantalla durante las animaciones de tipeo.
