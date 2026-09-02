import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

interface SolarisButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function SolarisButton({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}: SolarisButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,

        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'outline' && styles.outline,

        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,

        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.background} />
      ) : (
        <Text
          style={[
            styles.text,

            variant === 'primary' && styles.primaryText,
            variant === 'secondary' && styles.secondaryText,
            variant === 'outline' && styles.outlineText,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    paddingHorizontal: spacing.xl,
    borderRadius: 14,

    alignItems: 'center',
    justifyContent: 'center',
  },

  primary: {
    backgroundColor: colors.primary,
  },

  secondary: {
    backgroundColor: colors.surface,
  },

  outline: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.border,
  },

  text: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },

  primaryText: {
    color: colors.background,
  },

  secondaryText: {
    color: colors.text,
  },

  outlineText: {
    color: colors.text,
  },

  pressed: {
    opacity: 0.8,
  },

  disabled: {
    opacity: 0.5,
  },
});