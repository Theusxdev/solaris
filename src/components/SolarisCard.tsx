import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';

import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';

interface SolarisCardProps extends ViewProps {
  children: React.ReactNode;
}

export default function SolarisCard({
  children,
  style,
  ...props
}: SolarisCardProps) {
  return (
    <View
      {...props}
      style={[styles.card, style]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,

    borderRadius: 18,

    borderWidth: 1,
    borderColor: colors.border,

    padding: spacing.xl,
  },
});