import { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function PokemonDetailScreen({ route }) {
  // El name llega como parámetro desde la lista
  const { name } = route.params;

  const [pokemon, setPokemon] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  async function cargarDetalle() {
    setCargando(true);
    setError("");
    try {
      const respuesta = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + name
      );
      if (!respuesta.ok) {
        throw new Error("Error " + respuesta.status);
      }
      setPokemon(await respuesta.json());
    } catch (e) {
      setError("No se pudo cargar el detalle (" + e.message + ")");
    } finally {
      setCargando(false);
    }
  }

  // Se ejecuta al montar y cada vez que cambia name
  useEffect(() => {
    cargarDetalle();
  }, [name]);

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#1565C0" />
      </View>
    );
  }

  if (error !== "") {
    return (
      <View style={styles.centro}>
        <Text style={styles.error}>{error}</Text>
        <Pressable style={styles.boton} onPress={cargarDetalle}>
          <Text style={styles.botonTexto}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  const imagen =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;
  const tipos = pokemon.types.map((t) => t.type.name).join(", ");

  return (
    <View style={styles.contenedor}>
      <Image source={{ uri: imagen }} style={styles.imagen} />
      <Text style={styles.nombre}>{pokemon.name}</Text>
      <Text style={styles.dato}>Tipo: {tipos}</Text>
      <Text style={styles.dato}>Altura: {pokemon.height / 10} m</Text>
      <Text style={styles.dato}>Peso: {pokemon.weight / 10} kg</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  error: { color: "#c62828", textAlign: "center", marginBottom: 16 },
  boton: {
    backgroundColor: "#1565C0",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  botonTexto: { color: "#fff", fontWeight: "bold" },
  contenedor: { flex: 1, alignItems: "center", padding: 24 },
  imagen: { width: 220, height: 220 },
  nombre: {
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginVertical: 12,
  },
  dato: { fontSize: 18, marginBottom: 6, textTransform: "capitalize" },
});
