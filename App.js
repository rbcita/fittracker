import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import RutinaScreen from "./screens/RutinaScreen";
import PokemonListScreen from "./screens/PokemonListScreen";
import PokemonDetailScreen from "./screens/PokemonDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack de la pestaña Pokédex: lista -> detalle
function PokedexStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PokemonList"
        component={PokemonListScreen}
        options={{ title: "Pokédex" }}
      />
      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetailScreen}
        options={{ title: "Detalle" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  // Estado compartido (Semana 3): la lista de ejercicios vive en App.js
  const [entrenamientos, setEntrenamientos] = useState([]);

  useEffect(() => {
    console.log("Entrenamientos registrados:", entrenamientos.length);
  }, [entrenamientos]);

  function agregarEntrenamiento(nuevo) {
    setEntrenamientos([nuevo, ...entrenamientos]);
  }

  function eliminarEntrenamiento(id) {
    setEntrenamientos(entrenamientos.filter((e) => e.id !== id));
  }

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "#1565C0" }}>
        <Tab.Screen name="Rutina" options={{ title: "FitTracker" }}>
          {(props) => (
            <RutinaScreen
              {...props}
              entrenamientos={entrenamientos}
              onAgregar={agregarEntrenamiento}
              onEliminar={eliminarEntrenamiento}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Pokedex"
          component={PokedexStack}
          options={{ headerShown: false, title: "Pokédex" }}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
