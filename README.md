# FitTracker

App móvil de seguimiento de entrenamientos, hecha con React Native + Expo.
Proyecto integrador del curso Desarrollo de Aplicaciones Móviles con React Native (CIT FPUNA–KOICA).

## Hitos
- **Semana 3:** formulario controlado (`TextInput` + `useState`), validación con mensaje de error, alta y baja de ejercicios en una lista de estado.
- **Semana 4:** navegación con Tabs (Rutina / Pokédex) y Stack (lista → detalle), una pantalla por archivo en `screens/`, paso de parámetros (`name`) y estado de la rutina compartido desde `App.js`.
- **Semana 5:** consumo de una API REST pública (PokéAPI) con `fetch`, `async/await` y `try/catch/finally`; `FlatList` con `keyExtractor` y `ListEmptyComponent`; estados de carga y error con botón **Reintentar**.

## Estructura
- `App.js`: Tab Navigator, Stack de la Pokédex y estado compartido de la rutina
- `screens/RutinaScreen.js`: formulario y lista de ejercicios
- `screens/PokemonListScreen.js`: lista de Pokémon (`GET /pokemon?limit=30`)
- `screens/PokemonDetailScreen.js`: detalle (`GET /pokemon/{name}`)

## Cómo ejecutarla
```bash
npm install
npx expo install --fix
npx expo start
```
Presioná `a` para abrir el emulador Android.
