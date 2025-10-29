import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { REALTIME_APPLICATIONS } from '../utils/constants';
import { styles } from './RealtimeApplicationsScreen.styles';

interface RealtimeApplicationsScreenProps {
  onNext: () => void;
}

export default function RealtimeApplicationsScreen({ onNext }: RealtimeApplicationsScreenProps) {
  return (
    <View style={styles.container}>
      {/* Top Section with Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=2000',
          }}
          style={styles.image}
          resizeMode="cover"
        />
        {/* Gradient Overlay */}
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)']}
          style={styles.imageGradient}
        />
      </View>

      {/* Bottom Section with Table */}
      <View style={styles.content}>
        <View style={styles.contentInner}>
          <Text style={styles.title}>실시간 보험금 신청자 현황</Text>

          {/* Table Container */}
          <ScrollView style={styles.tableContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, styles.tableCol1]}>날짜</Text>
                <Text style={[styles.tableHeaderText, styles.tableCol2]}>지역</Text>
                <Text style={[styles.tableHeaderText, styles.tableCol3]}>이름</Text>
                <Text style={[styles.tableHeaderText, styles.tableCol4]}>청구 현황</Text>
              </View>
              {REALTIME_APPLICATIONS.map((app, idx) => (
                <View key={idx} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.tableCol1]}>{app.date}</Text>
                  <Text style={[styles.tableCell, styles.tableCol2]}>{app.region}</Text>
                  <Text style={[styles.tableCell, styles.tableCol3]}>{app.name}</Text>
                  <View style={styles.tableCol4}>
                    <View
                      style={[
                        styles.statusBadge,
                        app.status === '상담중' && styles.statusBadgeBlue,
                        app.status === '처리중' && styles.statusBadgeYellow,
                        app.status === '처리완료' && styles.statusBadgeGreen,
                      ]}
                    >
                      <Text style={styles.statusText}>{app.status}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.primaryButton} onPress={onNext}>
            <Text style={styles.primaryButtonText}>무료상담 신청하기 Click!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
