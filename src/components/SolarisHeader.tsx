import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

interface SolarisHeaderProps {
  title: string;
  subtitle?: string;
  userInitial?: string;
  onProfilePress?: () => void;
  onNotificationPress?: () => void;
}

export default function SolarisHeader({
  title,
  subtitle,
  userInitial = 'M',
  onProfilePress,
  onNotificationPress,
}: SolarisHeaderProps) {
  return (
    <View style={styles.container}>

      <View style={styles.topRow}>

        <View>
          <Text style={styles.logo}>
            ☀️ SOLARIS
          </Text>
        </View>

        <View style={styles.actions}>

          <Pressable
            onPress={onNotificationPress}
            style={styles.notification}
          >
            <Text style={styles.notificationIcon}>
              ♢
            </Text>
          </Pressable>

          <Pressable
            onPress={onProfilePress}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>
              {userInitial}
            </Text>
          </Pressable>

        </View>

      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      {subtitle && (
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xxl,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: spacing.xxxl,
  },

  logo: {
    color: colors.primary,

    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.extraBold,

    letterSpacing: 0.5,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: spacing.md,
  },

  notification: {
    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: colors.border,

    alignItems: 'center',
    justifyContent: 'center',
  },

  notificationIcon: {
    color: colors.text,

    fontSize: 20,
  },

  avatar: {
    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: colors.primary,

    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: colors.background,

    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },

  title: {
    color: colors.text,

    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
  },

  subtitle: {
    color: colors.textSecondary,

    fontSize: typography.sizes.md,

    marginTop: spacing.sm,

    lineHeight: 23,
  },
});