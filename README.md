# ⚽ TRIKICUKI — Tres en raya futbolístico

Un **tres en raya** con alma de álbum Panini. Para conquistar una casilla no basta con marcarla: tienes que nombrar a un **futbolista que cumpla la categoría de su fila y la de su columna** a la vez. Por ejemplo, cruce de *Argentina* × *Ganó el Mundial* → **Messi**, **Di María**, **Dibu Martínez**… El primero que hace **tres en línea** gana.

![niveles](https://img.shields.io/badge/niveles-4-ffce4a) ![pwa](https://img.shields.io/badge/PWA-offline-4ad0ec) ![sin dependencias](https://img.shields.io/badge/dependencias-0-5fd873)

## Cómo se juega
- Por turnos, eliges una casilla vacía y escribes un jugador.
- Si cumple **fila + columna**, la casilla es tuya. Si fallas, **pierdes el turno**.
- Cada turno tiene un límite de **60 segundos** (**45 en Ultimate**); si se agota, pierdes el turno.
- Ganas con **tres en raya**. Si el tablero se bloquea sin línea, gana quien tenga más casillas.
- Puedes jugar **al mejor de 3** o a una sola partida.
- **Efectos de sonido** con botón de silencio, y tema claro/oscuro.

## Modos
- **Contra la máquina** — tú (equipo Local) contra una IA con 4 niveles de astucia.
- **Dos jugadores** — en el mismo dispositivo, pasando el móvil.
- **Online (a distancia)** — crea una sala, comparte el código o el enlace, y juega con un amigo desde otro teléfono en tiempo real (requiere configurar Firebase; ver abajo).

## Online con Firebase
El multijugador usa **Firebase Realtime Database**. Para activarlo, pon las claves de tu proyecto en `firebase-config.js`. Las claves web de Firebase son públicas por diseño (la seguridad se controla con las reglas de la base de datos), así que es seguro subirlas. Reglas recomendadas para la Realtime Database:
```json
{ "rules": { "rooms": { "$code": { ".read": true, ".write": true } } } }
```

## Categorías
Se combinan **nacionalidades**, **clubes**, **ligas** (Premier, LaLiga, Serie A, Bundesliga, Ligue 1, Eredivisie, Primeira Liga, MLS), **posiciones** (portero, defensa, medio, delantero) y **logros** (Mundial, Champions, Balón de Oro).

## Niveles
| Nivel | Categorías | Ayuda al escribir | Máquina |
|-------|-----------|-------------------|---------|
| **Fácil** | comunes, muchas respuestas por casilla | autocompletado | juega al azar |
| **Medio** | algo más cerradas | autocompletado | bloquea y remata |
| **Difícil** | cruces exigentes | autocompletado limitado (3+ letras) | casi óptima |
| **Ultimate** | brutal: varias casillas con **una única respuesta** en toda la base | **sin autocompletado** + solo **45 s** | **imbatible** (minimax) |

## Tecnología
- HTML + CSS + JavaScript **sin frameworks ni dependencias**.
- **PWA**: instalable y jugable **sin conexión** (service worker + manifest).
- Sonido sintetizado con **Web Audio** (sin archivos externos).
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
