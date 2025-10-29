import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IconProps {
  size?: number;
  color?: string;
}

// Simple emoji/text based icons that work on web and mobile
export const HeartIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <Text style={[styles.iconText, { fontSize: size * 0.7, color }]}>❤️</Text>
  </View>
);

export const ShieldIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <Text style={[styles.iconText, { fontSize: size * 0.7, color }]}>🛡️</Text>
  </View>
);

export const ActivityIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <Text style={[styles.iconText, { fontSize: size * 0.7, color }]}>📊</Text>
  </View>
);

export const UsersIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <Text style={[styles.iconText, { fontSize: size * 0.7, color }]}>👥</Text>
  </View>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <Text style={[styles.iconText, { fontSize: size, color }]}>‹</Text>
  </View>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <Text style={[styles.iconText, { fontSize: size, color }]}>›</Text>
  </View>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <Text style={[styles.iconText, { fontSize: size, color }]}>✓</Text>
  </View>
);

const iconMap = {
  heart: HeartIcon,
  shield: ShieldIcon,
  activity: ActivityIcon,
  users: UsersIcon,
};

interface DynamicIconProps extends IconProps {
  name: keyof typeof iconMap;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  const IconComponent = iconMap[name];
  return IconComponent ? <IconComponent {...props} /> : <View />;
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
