import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function EjercicioDetailScreen({ route }) {
  // route.params trae lo que envió la lista con navigate()
  const { id } = route.params;
  const [ejercicio, setEjercicio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function cargar() {
    setLoading(true);
    setError('');
    try {
      // Segunda consulta: un solo ejercicio por su id
      const respuesta = await fetch(`https://wger.de/api/v2/exerciseinfo/${id}/`);
      if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
      setEjercicio(await respuesta.json());
    } catch (e) {
      setError(`No se pudo cargar: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  // Se ejecuta al abrir la pantalla y si cambia id
  useEffect(() => {
    cargar();
  }, [id]);

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

  const traduccion = ejercicio.translations?.[0];
  const musculos = ejercicio.muscles?.map((m) => m.name_en || m.name).join(', ');
  // La descripción viene con etiquetas HTML (<p>...): se quitan con una expresión regular
  const descripcion = (traduccion?.description ?? '').replace(/<[^>]*>/g, '');

  return (
    <ScrollView contentContainerStyle={styles.contenido}>
      <Text style={styles.titulo}>{traduccion?.name ?? 'Sin nombre'}</Text>
      <Text>Categoría: {ejercicio.category?.name}</Text>
      <Text>Músculos: {musculos || 'No indicado'}</Text>
      <Text style={styles.descripcion}>{descripcion || 'Sin descripción.'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  contenido: { padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  descripcion: { marginTop: 12 },
  error: { color: '#c62828', textAlign: 'center', marginBottom: 12 },
  boton: { backgroundColor: '#1565C0', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20 },
  botonTexto: { color: '#fff', fontWeight: 'bold' },
});
