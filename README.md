# ⚽ TRIKICUKI — Tres en raya futbolístico

Un **tres en raya** con alma de álbum Panini. Para conquistar una casilla no basta con marcarla: tienes que nombrar a un **futbolista que cumpla la categoría de su fila y la de su columna** a la vez. Por ejemplo, cruce de *Argentina* × *Ganó el Mundial* → **Messi**, **Di María**, **Dibu Martínez**… El primero que hace **tres en línea** gana.

![niveles](https://img.shields.io/badge/niveles-4-ffce4a) ![pwa](https://img.shields.io/badge/PWA-offline-4ad0ec) ![sin dependencias](https://img.shields.io/badge/dependencias-0-5fd873)

## Cómo se juega
- Por turnos, eliges una casilla vacía y escribes un jugador.
- Si cumple **fila + columna**, la casilla es tuya. Si fallas, **pierdes el turno**.
- Cada turno tiene un **máximo de 60 segundos**; si se agota, pierdes el turno.
- Ganas con **tres en raya**. Si el tablero se bloquea sin línea, gana quien tenga más casillas.
- Puedes jugar **al mejor de 3** o a una sola partida.

## Modos
- **Contra la máquina** — tú (equipo Local) contra una IA con 4 niveles de astucia.
- **Dos jugadores** — en el mismo dispositivo, pasando el móvil.

## Categorías
Se combinan **nacionalidades**, **clubes**, **ligas** (Premier, LaLiga, Serie A, Bundesliga, Ligue 1), **posiciones** (portero, defensa, medio, delantero) y **logros** (Mundial, Champions, Balón de Oro).

## Niveles
| Nivel | Categorías | Ayuda al escribir | Máquina |
|-------|-----------|-------------------|---------|
| **Fácil** | comunes, muchas respuestas por casilla | autocompletado + pista con iniciales | juega al azar |
| **Medio** | algo más cerradas | autocompletado | bloquea y remata |
| **Difícil** | cruces exigentes (varias casillas de ≤3) | autocompletado limitado | casi óptima |
| **Ultimate** | cruces muy cerrados (5+ casillas de ≤2) | **sin autocompletado** | **imbatible** (minimax) |

## Tecnología
- HTML + CSS + JavaScript **sin frameworks ni dependencias**.
- **PWA**: instalable y jugable **sin conexión** (service worker + manifest).
- Diseño responsive, tema claro/oscuro automático, base de datos de +150 futbolistas.

## Estructura
```
index.html        interfaz, estilos y lógica de la app
core.js           base de datos de jugadores + lógica pura (grid, validación, IA)
manifest.webmanifest / service-worker.js / icon*.svg   PWA
```

## Publicar en GitHub Pages
1. Crea un repositorio en GitHub, por ejemplo `trikicuki`.
2. Sube estos archivos.
3. En **Settings → Pages**, elige la rama `main` y carpeta `/root`.
4. Tu juego quedará en `https://<tu-usuario>.github.io/trikicuki/`.

---
Aplicación hecha por **cuki** ⚽ · Los datos de jugadores se basan en hechos ampliamente reconocidos.
