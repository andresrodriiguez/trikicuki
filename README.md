# ⚽ TRIKITAKA — Tres en raya futbolístico

Un **tres en raya** con alma de álbum Panini. Para conquistar una casilla no basta con marcarla: tienes que nombrar a un **futbolista que cumpla la categoría de su fila y la de su columna** a la vez. Por ejemplo, cruce de *Argentina* × *Ganó el Mundial* → **Messi**, **Di María**, **Dibu Martínez**… El primero que hace **tres en línea** gana.

![nivel](https://img.shields.io/badge/niveles-4-ffce4a) ![pwa](https://img.shields.io/badge/PWA-offline-4ad0ec) ![sin dependencias](https://img.shields.io/badge/dependencias-0-5fd873)

## Cómo se juega
- Por turnos, eliges una casilla vacía y escribes un jugador (hay **autocompletado**).
- Si cumple **fila + columna**, la casilla es tuya. Si fallas, **pierdes el turno**.
- Ganas con **tres en raya**. Si el tablero se bloquea sin línea, gana quien tenga más casillas.

## Modos
- **Contra la máquina** — tú (equipo Local) contra una IA con 4 niveles de astucia.
- **Dos jugadores** — en el mismo dispositivo, pasando el móvil.

## Niveles
| Nivel | Categorías | Máquina |
|-------|-----------|---------|
| **Fácil** | comunes, muchas respuestas por casilla | juega al azar |
| **Medio** | algo más cerradas | bloquea y remata |
| **Difícil** | cruces exigentes | casi óptima |
| **Ultimate** | cruces con muy pocas respuestas | **imbatible** (minimax) |

## Tecnología
- HTML + CSS + JavaScript **sin frameworks ni dependencias**.
- **PWA**: instalable y jugable **sin conexión** (service worker + manifest).
- Diseño responsive, tema claro/oscuro automático, base de datos de +130 futbolistas.

## Estructura
```
index.html        interfaz, estilos y lógica de la app
core.js           base de datos de jugadores + lógica pura (grid, validación, IA)
manifest.webmanifest / service-worker.js / icon*.svg   PWA
```

## Publicar en GitHub Pages
1. Crea un repositorio en GitHub, por ejemplo `trikitaka`.
2. Sube estos archivos (ver comandos abajo).
3. En **Settings → Pages**, elige la rama `main` y carpeta `/root`.
4. Tu juego quedará en `https://<tu-usuario>.github.io/trikitaka/`.

---
Hecho con ⚽. Los datos de jugadores se basan en hechos ampliamente reconocidos; si detectas alguno discutible, se corrige en `core.js`.
