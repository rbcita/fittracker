import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RutinaScreen from './screens/RutinaScreen';
import EjercicioListScreen from './screens/EjercicioListScreen';
import EjercicioDetailScreen from './screens/EjercicioDetailScreen';

// Stack = pila de pantallas: navigate() agrega una, la flecha de atrás la quita
const Stack = createNativeStackNavigator();

export default function App() {
  // La lista de ejercicios vive aquí (en App.js) para poder compartirla
  const [ejercicios, setEjercicios] = useState([]);

  const agregar = (ejercicio) => setEjercicios([ejercicio, ...ejercicios]);
  const borrar = (id) => setEjercicios(ejercicios.filter((e) => e.id !== id));

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Pantalla 1: recibe la lista y las funciones como props */}
        <Stack.Screen name="Rutina" options={{ title: 'FitTracker' }}>
          {(props) => (
            <RutinaScreen {...props} ejercicios={ejercicios} onAgregar={agregar} onBorrar={borrar} />
          )}
        </Stack.Screen>
        {/* Pantallas 2 y 3: consumen la API pública de ejercicios (wger) */}
        <Stack.Screen name="EjercicioList" component={EjercicioListScreen} options={{ title: 'Catálogo' }} />
        <Stack.Screen name="EjercicioDetail" component={EjercicioDetailScreen} options={{ title: 'Detalle' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
