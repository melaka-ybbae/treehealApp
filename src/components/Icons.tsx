import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Line, Polyline } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

// SVG-based icons
export const HeartIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

export const ShieldIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

export const ActivityIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polyline
        points="22 12 18 12 15 21 9 3 6 12 2 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

export const UsersIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx="9"
        cy="7"
        r="4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M23 21v-2a4 4 0 0 0-3-3.87"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 3.13a4 4 0 0 1 0 7.75"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

export const FileTextIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 2v6h6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1="16"
        y1="13"
        x2="8"
        y2="13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1="16"
        y1="17"
        x2="8"
        y2="17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1="10"
        y1="9"
        x2="8"
        y2="9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
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
  'file-text': FileTextIcon,
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
