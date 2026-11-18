import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

// Endpoint de la API: devuelve { results: [{ name, url }, ...] }
// Para probar el error, cambiar temporalmente por: .../pokemon/invalid-url
const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=30';

export default function PokemonListScreen({ navigation }) {
  const [pokemon, setPokemon] = useState([]); // datos
  const [loading, setLoading] = useState(true); // cargando
  const [error, setError] = useState(''); // mensaje de error

  async function cargar() {
    setLoading(true);
    setError('');
    try {
      const respuesta = await fetch(API_URL);
      // fetch no falla con 404/500: hay que revisar response.ok
      if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
      const json = await respuesta.json();
      setPokemon(json.results);
    } catch (e) {
      setError(`No se pudo cargar: ${e.message}`);
    } finally {
      setLoading(false); // se ejecuta siempre, con éxito o con error
    }
  }

  // [] = se ejecuta una sola vez, al abrir la pantalla
  useEffect(() => {
    cargar();
  }, []);

  if (loading) {
    return <View style={styles.centro}><ActivityIndicator size="large" /><Text>Cargando...</Text></View>;
  }

  if (error) {
    return (
      <View style={styles.centro}>
        <Text style={styles.error}>{error}</Text>
        <Pressable style={styles.boton} onPress={cargar}>
          <Text style={styles.botonTexto}>REINTENTAR</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={pokemon}
      keyExtractor={(item) => item.name}
      ListEmptyComponent={<Text style={styles.vacio}>No hay Pokémon para mostrar.</Text>}
      renderItem={({ item }) => {
        // El id es lo último de la URL (…/pokemon/25/) y sirve para la imagen
        const id = item.url.split('/').filter(Boolean).pop();
        return (
          // Se envía solo el nombre; el detalle hace su propia consulta
          <Pressable style={styles.fila} onPress={() => navigation.navigate('PokemonDetail', { name: item.name })}>
            <Image style={styles.imagen} source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` }} />
            <Text style={styles.nombre}>{item.name}</Text>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  fila: { flexDirection: 'row', alignItems: 'center', padding: 8, paddingHorizontal: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  imagen: { width: 44, height: 44, marginRight: 16 },
  nombre: { fontSize: 16, fontWeight: 'bold', textTransform: 'capitalize' },
  error: { color: '#c62828', textAlign: 'center', marginBottom: 12 },
  boton: { backgroundColor: '#1565C0', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20 },
  botonTexto: { color: '#fff', fontWeight: 'bold' },
  vacio: { textAlign: 'center', marginTop: 30, color: 'gray' },
});
