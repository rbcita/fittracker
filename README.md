# FitTracker

App móvil de seguimiento de entrenamientos (React Native + Expo).
Proyecto integrador del curso Desarrollo de Aplicaciones Móviles con React Native (CIT FPUNA–KOICA).

## Qué incluye
- **Semana 3:** formulario controlado, validación con mensaje de error, alta y baja de ejercicios en una lista de estado.
- **Semana 4:** navegación con Stack (3 pantallas en `screens/`), paso de parámetros (`id`) y estado compartido desde `App.js`.
- **Semana 5:** consumo de una API pública de ejercicios (wger) con `fetch`, `FlatList`, estados de carga y error con botón **REINTENTAR**, y pantalla de detalle.

## Estructura
- `App.js`: Stack Navigator y estado de la rutina
- `screens/RutinaScreen.js`: formulario y lista de ejercicios
- `screens/EjercicioListScreen.js`: catálogo de ejercicios (API wger)
- `screens/EjercicioDetailScreen.js`: detalle de un ejercicio (API wger)

## Ejecutar
```bash
npm install
npx expo install --fix
npx expo start
```
Presioná `a` para abrir el emulador Android.
