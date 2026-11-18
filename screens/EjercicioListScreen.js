import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

// API pública de ejercicios (wger). Devuelve { results: [ ... ] }
// language=2 pide los nombres en inglés. Para probar el error, cambiar
// temporalmente por: https://wger.de/api/v2/exerciseinfo/invalid-url/
const API_URL = 'https://wger.de/api/v2/exerciseinfo/?language=2&limit=20';

export default function EjercicioListScreen({ navigation }) {
  const [ejercicios, setEjercicios] = useState([]); // datos
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
      setEjercicios(json.results);
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
      data={ejercicios}
      keyExtractor={(item) => String(item.id)}
      ListEmptyComponent={<Text style={styles.vacio}>No hay ejercicios para mostrar.</Text>}
      renderItem={({ item }) => (
        // Se envía solo el id; el detalle hace su propia consulta
        <Pressable style={styles.fila} onPress={() => navigation.navigate('EjercicioDetail', { id: item.id })}>
          {/* El nombre está dentro de translations */}
          <Text style={styles.nombre}>{item.translations?.[0]?.name ?? 'Sin nombre'}</Text>
          <Text style={styles.categoria}>{item.category?.name}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  fila: { padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  nombre: { fontSize: 16, fontWeight: 'bold' },
  categoria: { color: 'gray', marginTop: 2 },
  error: { color: '#c62828', textAlign: 'center', marginBottom: 12 },
  boton: { backgroundColor: '#1565C0', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20 },
  botonTexto: { color: '#fff', fontWeight: 'bold' },
  vacio: { textAlign: 'center', marginTop: 30, color: 'gray' },
});
