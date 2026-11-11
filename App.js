import { useState, useEffect } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  // Un useState por campo (formulario controlado)
  const [ejercicio, setEjercicio] = useState("");
  const [series, setSeries] = useState("");
  const [repeticiones, setRepeticiones] = useState("");
  const [peso, setPeso] = useState("");

  // Estado de la lista y del mensaje de error
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [error, setError] = useState("");

  // useEffect: se ejecuta al montar y cada vez que cambia la lista
  useEffect(() => {
    console.log("Entrenamientos registrados:", entrenamientos.length);
  }, [entrenamientos]);

  function validar() {
    if (!ejercicio.trim() || !series.trim() || !repeticiones.trim()) {
      setError("Completá ejercicio, series y repeticiones.");
      return false;
    }
    if (Number(series) <= 0 || Number(repeticiones) <= 0) {
      setError("Series y repeticiones deben ser mayores a 0.");
      return false;
    }
    if (peso.trim() !== "" && Number(peso) < 0) {
      setError("El peso no puede ser negativo.");
      return false;
    }
    setError("");
    return true;
  }

  function limpiarFormulario() {
    setEjercicio("");
    setSeries("");
    setRepeticiones("");
    setPeso("");
  }

  function manejarAgregar() {
    if (!validar()) return;

    const nuevo = {
      id: Date.now().toString(),
      ejercicio: ejercicio.trim(),
      series: Number(series),
      repeticiones: Number(repeticiones),
      peso: peso.trim() === "" ? 0 : Number(peso),
    };

    setEntrenamientos([nuevo, ...entrenamientos]);
    limpiarFormulario();
  }

  function eliminar(id) {
    Alert.alert("Eliminar", "¿Querés borrar este ejercicio?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Borrar",
        style: "destructive",
        onPress: () =>
          setEntrenamientos(entrenamientos.filter((e) => e.id !== id)),
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>FitTracker</Text>
      <Text style={styles.subtitulo}>Registrá tu entrenamiento</Text>

      <TextInput
        style={styles.input}
        placeholder="Ejercicio (ej. Sentadilla)"
        value={ejercicio}
        onChangeText={setEjercicio}
      />
      <View style={styles.fila}>
        <TextInput
          style={[styles.input, styles.mitad]}
          placeholder="Series"
          value={series}
          onChangeText={setSeries}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.mitad]}
          placeholder="Repeticiones"
          value={repeticiones}
          onChangeText={setRepeticiones}
          keyboardType="numeric"
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Peso en kg (opcional)"
        value={peso}
        onChangeText={setPeso}
        keyboardType="decimal-pad"
      />

      {error !== "" && <Text style={styles.error}>{error}</Text>}

      <Pressable style={styles.boton} onPress={manejarAgregar}>
        <Text style={styles.botonTexto}>Agregar ejercicio</Text>
      </Pressable>

      <Text style={styles.seccion}>
        Mi rutina ({entrenamientos.length})
      </Text>

      <ScrollView style={styles.lista}>
        {entrenamientos.length === 0 && (
          <Text style={styles.vacio}>Todavía no agregaste ejercicios.</Text>
        )}
        {entrenamientos.map((item) => (
          <View key={item.id} style={styles.tarjeta}>
            <View style={styles.tarjetaInfo}>
              <Text style={styles.tarjetaTitulo}>{item.ejercicio}</Text>
              <Text style={styles.tarjetaDetalle}>
                {item.series} x {item.repeticiones}
                {item.peso > 0 ? ` · ${item.peso} kg` : ""}
              </Text>
            </View>
            <Pressable onPress={() => eliminar(item.id)}>
              <Text style={styles.borrar}>Borrar</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titulo: { fontSize: 28, fontWeight: "bold" },
  subtitulo: { fontSize: 14, color: "gray", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  fila: { flexDirection: "row", justifyContent: "space-between" },
  mitad: { width: "48%" },
  error: { color: "#c62828", marginBottom: 10 },
  boton: {
    backgroundColor: "#1565C0",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  botonTexto: { color: "#fff", fontWeight: "bold" },
  seccion: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  lista: { flex: 1 },
  vacio: { color: "gray", textAlign: "center", marginTop: 20 },
  tarjeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f3f6fb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  tarjetaInfo: { flex: 1 },
  tarjetaTitulo: { fontSize: 16, fontWeight: "bold" },
  tarjetaDetalle: { color: "#555", marginTop: 2 },
  borrar: { color: "#c62828", fontWeight: "bold" },
});
