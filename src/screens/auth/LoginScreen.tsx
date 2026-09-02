import { StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>☀️ SOLARIS</Text>

      <Text style={styles.title}>
        Entrar
      </Text>

      <Text>
        Tela de login em construção.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  logo: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
});