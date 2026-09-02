import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';


import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import SolarisButton from '../../components/SolarisButton';
import SolarisCard from '../../components/SolarisCard';
import SolarisHeader from '../../components/SolarisHeader';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';



export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <SolarisHeader
          title="Olá, Matheus 👋"
          subtitle="Vamos avançar sua carreira hoje?"
          userInitial="M"
          onProfilePress={() =>
            navigation.navigate('Profile' as never)
          }
          onNotificationPress={() => {
            console.log('Notificações');
          }}
        />

        <SolarisCard>

          <View style={styles.profileHeader}>

            <View>
              <Text style={styles.cardLabel}>
                SEU PERFIL
              </Text>

              <Text style={styles.cardTitle}>
                Perfil profissional
              </Text>
            </View>

            <Text style={styles.profilePercentage}>
              82%
            </Text>

          </View>

          <Text style={styles.profileDescription}>
            Seu perfil está quase completo.
            Adicione algumas informações para melhorar
            suas recomendações.
          </Text>

          <View style={styles.progressBackground}>
            <View style={styles.progress} />
          </View>

          <SolarisButton
            title="Completar perfil"
            variant="outline"
          />

        </SolarisCard>

        <Text style={styles.sectionTitle}>
          Seu momento
        </Text>

        <SolarisCard>

          <Text style={styles.momentTitle}>
            🚀 Você está pronto para avançar
          </Text>

          <Text style={styles.momentText}>
            Seu perfil possui uma boa base. O próximo passo
            recomendado é melhorar seu currículo e começar
            a acompanhar vagas compatíveis.
          </Text>

          <View style={styles.momentStats}>

            <View style={styles.momentStat}>
              <Text style={styles.momentNumber}>
                82%
              </Text>

              <Text style={styles.momentLabel}>
                Perfil
              </Text>
            </View>

            <View style={styles.momentStat}>
              <Text style={styles.momentNumber}>
                12
              </Text>

              <Text style={styles.momentLabel}>
                Vagas compatíveis
              </Text>
            </View>

            <View style={styles.momentStat}>
              <Text style={styles.momentNumber}>
                3
              </Text>

              <Text style={styles.momentLabel}>
                Currículos
              </Text>
            </View>

          </View>

        </SolarisCard>

        <Text style={styles.sectionTitle}>
          Ações rápidas
        </Text>

        <View style={styles.actions}>
          <SolarisButton
            title="Criar currículo"
            style={styles.actionButton}
          />

          <SolarisButton
            title="Analisar currículo"
            variant="secondary"
            style={styles.actionButton}
          />
        </View>

        <SolarisCard style={styles.aiCard}>
          <Text style={styles.aiTitle}>
            🤖 Solaris recomenda
          </Text>

          <Text style={styles.aiText}>
            Seu currículo pode ficar mais forte se você
            destacar resultados e tecnologias utilizadas
            nas suas experiências.
          </Text>

          <SolarisButton
            title="Ver análise"
            variant="outline"
          />
        </SolarisCard>

        <Text style={styles.sectionTitle}>
          Vagas para você
        </Text>

        <SolarisCard>
          <Text style={styles.jobTitle}>
            Desenvolvedor Java
          </Text>

          <Text style={styles.jobInfo}>
            💼 Tecnologia • 🌎 Remoto
          </Text>

          <Text style={styles.jobInfo}>
            Compatibilidade com seu perfil: 94%
          </Text>
        </SolarisCard>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xxxl,
  },

  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  profilePercentage: {
    color: colors.primary,

    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
  },

  profileDescription: {
    color: colors.textSecondary,

    fontSize: typography.sizes.sm,
    lineHeight: 21,

    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },

  avatar: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: colors.primary,

    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: colors.background,

    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },

  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    padding: spacing.xl,
    paddingBottom: spacing.massive,
  },

  logo: {
    color: colors.primary,

    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.extraBold,

  },

  sectionTitle: {
    color: colors.text,

    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,

    marginTop: spacing.xxxl,
    marginBottom: spacing.md,
  },

  cardLabel: {
    color: colors.primary,

    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,

    letterSpacing: 1,
  },

  cardTitle: {
    color: colors.text,

    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,

    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },

  progressBackground: {
    height: 8,

    backgroundColor: colors.backgroundSecondary,

    borderRadius: 999,

    overflow: 'hidden',

    marginBottom: spacing.xl,
  },

  progress: {
    width: '82%',
    height: '100%',

    backgroundColor: colors.primary,
  },

  actions: {
    gap: spacing.md,
  },

  actionButton: {
    flex: 1,
  },

  aiCard: {
    marginTop: spacing.xl,
  },

  aiTitle: {
    color: colors.text,

    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,

    marginBottom: spacing.md,
  },

  aiText: {
    color: colors.textSecondary,

    fontSize: typography.sizes.md,
    lineHeight: 24,

    marginBottom: spacing.xl,
  },

  jobTitle: {
    color: colors.text,

    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,

    marginBottom: spacing.sm,
  },

  jobInfo: {
    color: colors.textSecondary,

    fontSize: typography.sizes.sm,

    marginTop: spacing.sm,
  },

  momentTitle: {
    color: colors.text,

    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,

    marginBottom: spacing.sm,
  },

  momentText: {
    color: colors.textSecondary,

    fontSize: typography.sizes.sm,
    lineHeight: 21,
  },

  momentStats: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginTop: spacing.xl,

    paddingTop: spacing.xl,

    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  momentStat: {
    flex: 1,
  },

  momentNumber: {
    color: colors.primary,

    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },

  momentLabel: {
    color: colors.textMuted,

    fontSize: typography.sizes.xs,

    marginTop: spacing.xs,
  },
});