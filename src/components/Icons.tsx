import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

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
  <View style={[styles.iconContainer, { width: 2*size, height: size }]}>
    <Svg width={size} height={size} viewBox="0 0 24 38" fill="none">
      <Path d="M20.0708 34.6558L4.24268 18.8278L20.0708 3" stroke={color} strokeWidth="6" strokeLinecap="round"/>
    </Svg>
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

export const XIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <View style={[styles.iconContainer, { width: 2*size, height: size }]}>
    <Svg width={size} height={size} viewBox="0 0 38 38" fill="none">
      <Path d="M34.6562 34.6558L18.8281 18.8278L34.6562 3" stroke={color} strokeWidth="6" strokeLinecap="round"/>
      <Path d="M3 3L18.8281 18.828L3 34.6558" stroke={color} strokeWidth="6" strokeLinecap="round"/>
    </Svg>
  </View>
);

export const UserIcon: React.FC<IconProps> = ({ size = 24, color = '#D1D5DB' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <View style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color,
      overflow: 'hidden',
      alignItems: 'center',
      paddingTop: size * 0.25,
    }}>
      {/* Head */}
      <View style={{
        width: size * 0.5,
        height: size * 0.5,
        borderRadius: size * 0.5,
        marginTop: -size * 0.1,
        backgroundColor: '#CFE0F3',
      }} />
      {/* Shoulders */}
      <View style={{
        width: size * 0.75,
        height: size * 0.55,
        borderRadius: size * 0.375,
        backgroundColor: '#CFE0F3',
        marginTop: size * 0.03,
      }} />
    </View>
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
