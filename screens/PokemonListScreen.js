import { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Para probar la pantalla de error, cambiar temporalmente a:
// const URL_LISTA = "https://pokeapi.co/api/v2/pokemon/invalid-url";
const URL_LISTA = "https://pokeapi.co/api/v2/pokemon?limit=30";

function obtenerId(url) {
  return url.split("/").filter(Boolean).pop();
}

export default function PokemonListScreen({ navigation }) {
  const [pokemones, setPokemones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  async function cargarPokemones() {
    setCargando(true);
    setError("");
    try {
      const respuesta = await fetch(URL_LISTA);
      if (!respuesta.ok) {
        throw new Error("Error " + respuesta.status);
      }
      const datos = await respuesta.json();
      setPokemones(datos.results);
    } catch (e) {
      setError("No se pudo cargar la lista (" + e.message + ")");
    } finally {
      setCargando(false);
    }
  }

  // Se ejecuta una sola vez, al montar la pantalla
  useEffect(() => {
    cargarPokemones();
  }, []);

  function abrirDetalle(name) {
    navigation.navigate("PokemonDetail", { name });
  }

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#1565C0" />
        <Text style={styles.texto}>Cargando...</Text>
      </View>
    );
  }

  if (error !== "") {
    return (
      <View style={styles.centro}>
        <Text style={styles.error}>{error}</Text>
        <Pressable style={styles.boton} onPress={cargarPokemones}>
          <Text style={styles.botonTexto}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={pokemones}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.lista}
      ListEmptyComponent={
        <Text style={styles.vacio}>No hay Pokémon para mostrar.</Text>
      }
      renderItem={({ item }) => (
        <Pressable
          style={styles.tarjeta}
          onPress={() => abrirDetalle(item.name)}
        >
          <Image
            style={styles.sprite}
            source={{
              uri:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                obtenerId(item.url) +
                ".png",
            }}
          />
          <Text style={styles.nombre}>{item.name}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  texto: { marginTop: 10, color: "gray" },
  error: { color: "#c62828", textAlign: "center", marginBottom: 16 },
  boton: {
    backgroundColor: "#1565C0",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  botonTexto: { color: "#fff", fontWeight: "bold" },
  vacio: { textAlign: "center", color: "gray", marginTop: 30 },
  lista: { padding: 16 },
  tarjeta: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f6fb",
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
  },
  sprite: { width: 44, height: 44, marginRight: 16 },
  nombre: { fontSize: 18, textTransform: "capitalize" },
});
