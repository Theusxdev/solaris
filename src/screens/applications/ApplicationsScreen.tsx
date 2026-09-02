import { StyleSheet, Text, View } from 'react-native';

export default function ApplicationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Candidaturas</Text>
      <Text>Acompanhe suas candidaturas aqui.</Text>
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