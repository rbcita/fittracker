import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function RutinaScreen({ navigation, ejercicios, onAgregar, onBorrar }) {
  // Formulario controlado: un useState por campo
  const [nombre, setNombre] = useState('');
  const [series, setSeries] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(''); // mensaje de validación

  function agregar() {
    // Validación: trim() descarta campos vacíos o con solo espacios
    if (!nombre.trim() || !series.trim() || !reps.trim()) {
      setError('Completá todos los campos.');
      return;
    }
    if (Number(series) <= 0 || Number(reps) <= 0) {
      setError('Series y repeticiones deben ser mayores a 0.');
      return;
    }
    setError('');
    onAgregar({ id: Date.now().toString(), nombre: nombre.trim(), series, reps });
    // Se limpia el formulario
    setNombre('');
    setSeries('');
    setReps('');
  }

  return (
    <View style={styles.container}>
      {/* value + onChangeText = componente controlado */}
      <TextInput style={styles.input} placeholder="Ejercicio" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Series" value={series} onChangeText={setSeries} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Repeticiones" value={reps} onChangeText={setReps} keyboardType="numeric" />

      {/* El error se muestra solo si existe */}
      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <Pressable style={styles.boton} onPress={agregar}>
        <Text style={styles.botonTexto}>Agregar ejercicio</Text>
      </Pressable>

      {/* Lista del estado: alta (arriba) y baja (botón Borrar) */}
      <FlatList
        data={ejercicios}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.vacio}>Todavía no agregaste ejercicios.</Text>}
        renderItem={({ item }) => (
          <View style={styles.fila}>
            <Text style={styles.texto}>{item.nombre}: {item.series} x {item.reps}</Text>
            <Pressable onPress={() => onBorrar(item.id)}>
              <Text style={styles.borrar}>Borrar</Text>
            </Pressable>
          </View>
        )}
      />

      {/* Navega a otra pantalla del Stack */}
      <Pressable style={styles.boton} onPress={() => navigation.navigate('PokemonList')}>
        <Text style={styles.botonTexto}>Ver Pokédex</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 8 },
  error: { color: '#c62828', marginBottom: 8 },
  boton: { backgroundColor: '#1565C0', borderRadius: 8, padding: 12, alignItems: 'center', marginVertical: 8 },
  botonTexto: { color: '#fff', fontWeight: 'bold' },
  fila: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: '#f3f6fb', borderRadius: 8, marginBottom: 6 },
  texto: { flex: 1 },
  borrar: { color: '#c62828', fontWeight: 'bold' },
  vacio: { textAlign: 'center', color: 'gray', marginTop: 16 },
});
