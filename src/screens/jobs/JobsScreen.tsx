import { StyleSheet, Text, View } from 'react-native';

export default function JobsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔎 Vagas</Text>
      <Text>Vagas recomendadas aparecerão aqui.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
});