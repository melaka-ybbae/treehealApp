import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormData, StepType } from '../utils/types';
import {
  CONSULTATION_TYPES,
  INTEREST_OPTIONS,
  CONSULTANTS,
  REALTIME_APPLICATIONS,
  KOREAN_REGIONS,
} from '../utils/constants';
import {
  ChevronLeftIcon,
  CheckIcon,
  ChevronRightIcon,
  DynamicIcon,
} from '../components/Icons';
import { styles } from './InsuranceApp.styles';

const { width } = Dimensions.get('window');

export default function InsuranceApp() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showAgreementPopup, setShowAgreementPopup] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    consultationType: '',
    interests: [],
    consultant: null,
    name: '',
    birthdate: '',
    gender: '',
    phone: '',
    region: '',
    detailedRegion: '',
    agreements: {
      all: false,
      privacy: false,
      terms: false,
      consultation: false,
      marketing: false,
    },
  });

  const steps: StepType[] = [
    'splash',
    'realtime-applications',
    'consultation-type',
    'interests',
    'consultant',
    'consultant-detail',
    'user-info',
    'review',
    'confirmation',
  ];

  const handleNext = () => {
    if (steps[currentStep] === 'review') {
      setShowAgreementPopup(true);
    } else if (
      steps[currentStep] === 'consultation-type' &&
      formData.consultationType === 'free'
    ) {
      setCurrentStep(6); // Jump to user-info
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleInterest = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }));
  };

  const toggleAgreement = (key: keyof FormData['agreements']) => {
    setFormData((prev) => {
      const newAgreements = {
        ...prev.agreements,
        [key]: !prev.agreements[key],
      };
      newAgreements.all =
        newAgreements.privacy &&
        newAgreements.terms &&
        newAgreements.consultation &&
        newAgreements.marketing;
      return { ...prev, agreements: newAgreements };
    });
  };

  const toggleAllAgreements = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      agreements: {
        all: checked,
        privacy: checked,
        terms: checked,
        consultation: checked,
        marketing: checked,
      },
    }));
  };

  const handleAgreementSubmit = () => {
    if (
      formData.agreements.privacy &&
      formData.agreements.terms &&
      formData.agreements.consultation
    ) {
      setShowAgreementPopup(false);
      setCurrentStep(currentStep + 1);
    }
  };

  const isStepValid = () => {
    switch (steps[currentStep]) {
      case 'consultation-type':
        return formData.consultationType !== '';
      case 'interests':
        return formData.interests.length > 0;
      case 'consultant':
        return formData.consultant !== null;
      case 'user-info':
        return (
          formData.name &&
          formData.birthdate &&
          formData.gender &&
          formData.phone &&
          formData.region
        );
      default:
        return true;
    }
  };

  // Splash Screen
  if (steps[currentStep] === 'splash') {
    return (
      <View style={styles.splashContainer}>
        <View style={styles.splashContent}>
          <Text style={styles.splashLogo}>트리빌</Text>
          <Text style={styles.splashSubtitle}>보험 상담 플랫폼</Text>
        </View>
        <TouchableOpacity style={styles.splashButton} onPress={handleNext}>
          <Text style={styles.splashButtonText}>시작하기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Realtime Applications
  if (steps[currentStep] === 'realtime-applications') {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView style={styles.flex1}>
          <View style={styles.realtimeImageContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=2000',
              }}
              style={styles.realtimeImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.realtimeContent}>
            <Text style={styles.realtimeTitle}>실시간 보험금 신청자 현황</Text>
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
            <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
              <Text style={styles.primaryButtonText}>무료상담 신청하기 Click!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Main layout for other steps
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      {currentStep > 2 && currentStep < steps.length - 1 && (
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
            <ChevronLeftIcon size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerSpacer} />
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerCloseText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Progress Bar */}
      {currentStep >= 2 && currentStep <= 7 && (
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${((currentStep - 2) / 6) * 100}%` },
            ]}
          />
        </View>
      )}

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Consultation Type */}
        {steps[currentStep] === 'consultation-type' && (
          <View>
            <Text style={styles.title}>상담 받고 싶은</Text>
            <Text style={styles.title}>항목을 선택해 주세요.</Text>
            <View style={styles.optionsRow}>
              {CONSULTATION_TYPES.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  onPress={() =>
                    setFormData({ ...formData, consultationType: type.id })
                  }
                  style={[
                    styles.optionCard,
                    formData.consultationType === type.id &&
                      styles.optionCardSelected,
                  ]}
                >
                  <View
                    style={[
                      styles.iconCircle,
                      formData.consultationType === type.id &&
                        styles.iconCircleSelected,
                    ]}
                  >
                    <DynamicIcon
                      name={type.icon as any}
                      size={32}
                      color={
                        formData.consultationType === type.id
                          ? '#fff'
                          : '#666'
                      }
                    />
                  </View>
                  <Text style={styles.optionLabel}>{type.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Interests */}
        {steps[currentStep] === 'interests' && (
          <View>
            <Text style={styles.title}>상담 받고 싶은</Text>
            <Text style={styles.title}>분야를 모두 선택해주세요.</Text>
            <View style={styles.interestsGrid}>
              {INTEREST_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => toggleInterest(option.id)}
                  style={[
                    styles.interestCard,
                    formData.interests.includes(option.id) &&
                      styles.interestCardSelected,
                  ]}
                >
                  <View
                    style={[
                      styles.iconCircle,
                      formData.interests.includes(option.id) &&
                        styles.iconCircleSelected,
                    ]}
                  >
                    <DynamicIcon
                      name={option.icon as any}
                      size={24}
                      color={
                        formData.interests.includes(option.id)
                          ? '#fff'
                          : '#666'
                      }
                    />
                  </View>
                  <Text style={styles.interestLabel}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Consultant Selection */}
        {steps[currentStep] === 'consultant' && (
          <View>
            <Text style={styles.title}>상담 받고 싶은</Text>
            <Text style={styles.title}>전문가를 선택해주세요.</Text>
            <View style={styles.consultantGrid}>
              {CONSULTANTS.map((consultant) => (
                <TouchableOpacity
                  key={consultant.id}
                  onPress={() =>
                    setFormData({ ...formData, consultant: consultant.id })
                  }
                  style={styles.consultantCard}
                >
                  <Image
                    source={{ uri: consultant.image }}
                    style={[
                      styles.consultantImage,
                      formData.consultant === consultant.id &&
                        styles.consultantImageSelected,
                    ]}
                  />
                  <View style={styles.consultantName}>
                    <Text style={styles.consultantNameText}>
                      {consultant.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Consultant Detail */}
        {steps[currentStep] === 'consultant-detail' && formData.consultant && (
          <View style={styles.detailContainer}>
            {(() => {
              const selectedConsultant = CONSULTANTS.find(
                (c) => c.id === formData.consultant
              );
              return (
                <>
                  <Image
                    source={{ uri: selectedConsultant?.image }}
                    style={styles.detailImage}
                  />
                  <Text style={styles.detailName}>
                    {selectedConsultant?.name} 전문가
                  </Text>
                  <View style={styles.detailSection}>
                    <Text style={styles.detailSectionTitle}>약력</Text>
                    <Text style={styles.detailSectionText}>
                      {selectedConsultant?.career}
                    </Text>
                  </View>
                  <View style={styles.detailDivider} />
                  <View style={styles.detailSection}>
                    <Text style={styles.detailSectionTitle}>자격내용</Text>
                    {selectedConsultant?.experience.map((exp, idx) => (
                      <View key={idx} style={styles.detailExpItem}>
                        <View style={styles.detailBullet} />
                        <Text style={styles.detailExpText}>{exp}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.detailButtons}>
                    <TouchableOpacity
                      style={styles.detailButtonSecondary}
                      onPress={handleBack}
                    >
                      <Text style={styles.detailButtonSecondaryText}>
                        다른 전문가 선택
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.detailButtonPrimary}
                      onPress={handleNext}
                    >
                      <Text style={styles.detailButtonPrimaryText}>선택완료</Text>
                    </TouchableOpacity>
                  </View>
                </>
              );
            })()}
          </View>
        )}

        {/* User Info */}
        {steps[currentStep] === 'user-info' && (
          <View>
            <Text style={styles.title}>마지막으로 고객님</Text>
            <Text style={styles.title}>정보를 입력해주세요.</Text>
            <View style={styles.formGroup}>
              <Text style={styles.label}>이름</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                placeholder="홍길동"
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.formRow}>
              <View style={styles.formGroupHalf}>
                <Text style={styles.label}>생년월일</Text>
                <TextInput
                  style={styles.input}
                  value={formData.birthdate}
                  onChangeText={(text) =>
                    setFormData({ ...formData, birthdate: text })
                  }
                  placeholder="1990-01-01"
                  placeholderTextColor="#999"
                />
              </View>
              <View style={styles.formGroupHalf}>
                <Text style={styles.label}>성별</Text>
                <View style={styles.genderButtons}>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      formData.gender === 'male' && styles.genderButtonSelected,
                    ]}
                    onPress={() => setFormData({ ...formData, gender: 'male' })}
                  >
                    <Text
                      style={[
                        styles.genderButtonText,
                        formData.gender === 'male' &&
                          styles.genderButtonTextSelected,
                      ]}
                    >
                      남성
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      formData.gender === 'female' &&
                        styles.genderButtonSelected,
                    ]}
                    onPress={() =>
                      setFormData({ ...formData, gender: 'female' })
                    }
                  >
                    <Text
                      style={[
                        styles.genderButtonText,
                        formData.gender === 'female' &&
                          styles.genderButtonTextSelected,
                      ]}
                    >
                      여성
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>연락처</Text>
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) =>
                  setFormData({ ...formData, phone: text })
                }
                placeholder="010-0000-0000"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>거주 지역</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.regionScroll}
              >
                {KOREAN_REGIONS.map((region) => (
                  <TouchableOpacity
                    key={region}
                    style={[
                      styles.regionChip,
                      formData.region === region && styles.regionChipSelected,
                    ]}
                    onPress={() => setFormData({ ...formData, region })}
                  >
                    <Text
                      style={[
                        styles.regionChipText,
                        formData.region === region &&
                          styles.regionChipTextSelected,
                      ]}
                    >
                      {region}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            {formData.region && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>상세 지역</Text>
                <TextInput
                  style={styles.input}
                  value={formData.detailedRegion}
                  onChangeText={(text) =>
                    setFormData({ ...formData, detailedRegion: text })
                  }
                  placeholder="예: 성남시, 강남구 등"
                  placeholderTextColor="#999"
                />
              </View>
            )}
          </View>
        )}

        {/* Review */}
        {steps[currentStep] === 'review' && (
          <View>
            <Text style={styles.title}>입력한 정보가 맞나요?</Text>
            {formData.consultationType && (
              <View style={styles.reviewSection}>
                <Text style={styles.reviewLabel}>상담유형</Text>
                <View style={styles.reviewCard}>
                  <Text style={styles.reviewText}>
                    {
                      CONSULTATION_TYPES.find(
                        (t) => t.id === formData.consultationType
                      )?.label
                    }
                  </Text>
                  <View style={styles.reviewCheck}>
                    <CheckIcon size={16} color="#fff" />
                  </View>
                </View>
              </View>
            )}
            <View style={styles.reviewSection}>
              <Text style={styles.reviewLabel}>이름</Text>
              <View style={styles.reviewCard}>
                <Text style={styles.reviewText}>{formData.name}</Text>
                <View style={styles.reviewCheck}>
                  <CheckIcon size={16} color="#fff" />
                </View>
              </View>
            </View>
            <View style={styles.reviewSection}>
              <Text style={styles.reviewLabel}>생년월일 및 성별</Text>
              <View style={styles.reviewCard}>
                <Text style={styles.reviewText}>{formData.birthdate}</Text>
                <Text style={styles.reviewGender}>
                  {formData.gender === 'male' ? '남성' : '여성'}
                </Text>
              </View>
            </View>
            <View style={styles.reviewSection}>
              <Text style={styles.reviewLabel}>전화번호</Text>
              <View style={styles.reviewCard}>
                <Text style={styles.reviewText}>
                  {formData.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3')}
                </Text>
                <View style={styles.reviewCheck}>
                  <CheckIcon size={16} color="#fff" />
                </View>
              </View>
            </View>
            <View style={styles.reviewSection}>
              <Text style={styles.reviewLabel}>지역</Text>
              <View style={styles.reviewCard}>
                <Text style={styles.reviewText}>
                  {formData.region} {formData.detailedRegion}
                </Text>
                <View style={styles.reviewCheck}>
                  <CheckIcon size={16} color="#fff" />
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Confirmation */}
        {steps[currentStep] === 'confirmation' && (
          <View style={styles.confirmationContainer}>
            <View style={styles.confirmationIcon}>
              <CheckIcon size={48} color="#fff" />
            </View>
            <Text style={styles.confirmationTitle}>상담 신청 완료</Text>
            <Text style={styles.confirmationText}>전문가가 확인 후</Text>
            <Text style={styles.confirmationText}>
              빠른 시일 내에 연락드리겠습니다.
            </Text>
            <View style={styles.confirmationNote}>
              <Text style={styles.confirmationNoteText}>
                📞 평균 <Text style={styles.confirmationBold}>1-2일 이내</Text>{' '}
                연락드립니다
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Button */}
      {currentStep > 1 &&
        currentStep < steps.length - 1 &&
        currentStep !== 5 && (
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={[
                styles.bottomButton,
                !isStepValid() && styles.bottomButtonDisabled,
              ]}
              onPress={handleNext}
              disabled={!isStepValid()}
            >
              <Text style={styles.bottomButtonText}>
                {steps[currentStep] === 'user-info'
                  ? '정보입력 완료'
                  : steps[currentStep] === 'review'
                  ? '상담 신청하기'
                  : '계속하기'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

      {steps[currentStep] === 'confirmation' && (
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => {
              setCurrentStep(0);
              setFormData({
                consultationType: '',
                interests: [],
                consultant: null,
                name: '',
                birthdate: '',
                gender: '',
                phone: '',
                region: '',
                detailedRegion: '',
                agreements: {
                  all: false,
                  privacy: false,
                  terms: false,
                  consultation: false,
                  marketing: false,
                },
              });
            }}
          >
            <Text style={styles.bottomButtonText}>완료</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Agreement Popup */}
      <Modal
        visible={showAgreementPopup}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAgreementPopup(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>약관 동의</Text>
            <ScrollView style={styles.agreementList}>
              <TouchableOpacity
                style={styles.agreementItemAll}
                onPress={() => toggleAllAgreements(!formData.agreements.all)}
              >
                <View
                  style={[
                    styles.checkbox,
                    formData.agreements.all && styles.checkboxChecked,
                  ]}
                >
                  {formData.agreements.all && <CheckIcon size={16} color="#fff" />}
                </View>
                <Text style={styles.agreementText}>모든 약관에 동의합니다</Text>
              </TouchableOpacity>
              <View style={styles.agreementDivider} />
              <TouchableOpacity
                style={styles.agreementItem}
                onPress={() => toggleAgreement('privacy')}
              >
                <View
                  style={[
                    styles.checkbox,
                    formData.agreements.privacy && styles.checkboxChecked,
                  ]}
                >
                  {formData.agreements.privacy && (
                    <CheckIcon size={16} color="#fff" />
                  )}
                </View>
                <Text style={styles.agreementText}>
                  개인정보 수집·이용 동의{' '}
                  <Text style={styles.required}>[필수]</Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.agreementItem}
                onPress={() => toggleAgreement('terms')}
              >
                <View
                  style={[
                    styles.checkbox,
                    formData.agreements.terms && styles.checkboxChecked,
                  ]}
                >
                  {formData.agreements.terms && <CheckIcon size={16} color="#fff" />}
                </View>
                <Text style={styles.agreementText}>
                  서비스 이용 약관 <Text style={styles.required}>[필수]</Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.agreementItem}
                onPress={() => toggleAgreement('consultation')}
              >
                <View
                  style={[
                    styles.checkbox,
                    formData.agreements.consultation && styles.checkboxChecked,
                  ]}
                >
                  {formData.agreements.consultation && (
                    <CheckIcon size={16} color="#fff" />
                  )}
                </View>
                <Text style={styles.agreementText}>
                  상담 안내 메세지 수신 동의{' '}
                  <Text style={styles.required}>[필수]</Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.agreementItem}
                onPress={() => toggleAgreement('marketing')}
              >
                <View
                  style={[
                    styles.checkbox,
                    formData.agreements.marketing && styles.checkboxChecked,
                  ]}
                >
                  {formData.agreements.marketing && (
                    <CheckIcon size={16} color="#fff" />
                  )}
                </View>
                <Text style={styles.agreementText}>
                  마케팅/이벤트 안내 수신 동의{' '}
                  <Text style={styles.optional}>[선택]</Text>
                </Text>
              </TouchableOpacity>
            </ScrollView>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setShowAgreementPopup(false)}
              >
                <Text style={styles.modalButtonCancelText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButtonSubmit,
                  !(
                    formData.agreements.privacy &&
                    formData.agreements.terms &&
                    formData.agreements.consultation
                  ) && styles.modalButtonSubmitDisabled,
                ]}
                onPress={handleAgreementSubmit}
                disabled={
                  !(
                    formData.agreements.privacy &&
                    formData.agreements.terms &&
                    formData.agreements.consultation
                  )
                }
              >
                <Text style={styles.modalButtonSubmitText}>
                  동의하고 신청하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
