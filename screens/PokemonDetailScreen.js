import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function PokemonDetailScreen({ route }) {
  // route.params trae lo que envió la lista con navigate()
  const { name } = route.params;
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function cargar() {
    setLoading(true);
    setError('');
    try {
      // Segunda consulta: un solo Pokémon por su nombre
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
      setPokemon(await respuesta.json());
    } catch (e) {
      setError(`No se pudo cargar: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  // Se ejecuta al abrir la pantalla y si cambia name
  useEffect(() => {
    cargar();
  }, [name]);

  if (loading) {
    return <View style={styles.centro}><ActivityIndicator size="large" /></View>;
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
    <View style={styles.centro}>
      <Image style={styles.imagen} source={{ uri: pokemon.sprites.front_default }} />
      <Text style={styles.titulo}>{pokemon.name}</Text>
      <Text>Tipos: {pokemon.types.map((t) => t.type.name).join(', ')}</Text>
      {/* La API da altura en decímetros y peso en hectogramos: /10 */}
      <Text>Altura: {pokemon.height / 10} m</Text>
      <Text>Peso: {pokemon.weight / 10} kg</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  imagen: { width: 200, height: 200 },
  titulo: { fontSize: 26, fontWeight: 'bold', textTransform: 'capitalize', marginBottom: 8 },
  error: { color: '#c62828', textAlign: 'center', marginBottom: 12 },
  boton: { backgroundColor: '#1565C0', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20 },
  botonTexto: { color: '#fff', fontWeight: 'bold' },
});
