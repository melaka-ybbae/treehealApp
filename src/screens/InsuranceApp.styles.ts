import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../styles';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flex1: {
    flex: 1,
  },

  // Splash Screen
  splashContainer: {
    flex: 1,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  splashContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  splashSubtitle: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
  },
  splashButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    marginBottom: 40,
  },
  splashButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
  },

  // Realtime Applications
  realtimeImageContainer: {
    height: 300,
    width: '100%',
  },
  realtimeImage: {
    width: '100%',
    height: '100%',
  },
  realtimeContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    padding: 20,
    minHeight: 400,
  },
  realtimeTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F0FDF4',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  tableCell: {
    fontSize: 11,
    color: '#6B7280',
  },
  tableCol1: {
    flex: 2,
  },
  tableCol2: {
    flex: 3,
  },
  tableCol3: {
    flex: 1.5,
  },
  tableCol4: {
    flex: 2,
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeBlue: {
    backgroundColor: '#DBEAFE',
  },
  statusBadgeYellow: {
    backgroundColor: '#FEF3C7',
  },
  statusBadgeGreen: {
    backgroundColor: '#D1FAE5',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerButton: {
    padding: 8,
  },
  headerSpacer: {
    flex: 1,
  },
  headerCloseText: {
    fontSize: 24,
    color: '#000',
  },

  // Progress Bar
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E5E7EB',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#4CAF50',
  },

  // Content
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  // Options (Consultation Type)
  optionsRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 32,
  },
  optionCard: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionCardSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#F0FDF4',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconCircleSelected: {
    backgroundColor: '#4CAF50',
  },
  optionLabel: {
    fontSize: 12,
    textAlign: 'center',
  },

  // Interests
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 32,
  },
  interestCard: {
    width: (width - 56) / 2,
    padding: 24,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    alignItems: 'center',
  },
  interestCardSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#F0FDF4',
  },
  interestLabel: {
    fontSize: 14,
    marginTop: 12,
  },

  // Consultants
  consultantGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 32,
  },
  consultantCard: {
    width: (width - 64) / 3,
  },
  consultantImage: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 16,
  },
  consultantImageSelected: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  consultantName: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  consultantNameText: {
    fontSize: 12,
    fontWeight: '500',
  },

  // Consultant Detail
  detailContainer: {
    alignItems: 'center',
  },
  detailImage: {
    width: 160,
    height: 160,
    borderRadius: 16,
    marginBottom: 24,
  },
  detailName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 32,
  },
  detailSection: {
    width: '100%',
    marginBottom: 24,
  },
  detailSectionTitle: {
    fontSize: 14,
    color: '#059669',
    marginBottom: 12,
  },
  detailSectionText: {
    fontSize: 16,
    color: '#374151',
  },
  detailDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 24,
  },
  detailExpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 12,
  },
  detailExpText: {
    fontSize: 16,
    color: '#374151',
  },
  detailButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginTop: 32,
  },
  detailButtonSecondary: {
    flex: 1,
    backgroundColor: '#374151',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  detailButtonSecondaryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  detailButtonPrimary: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  detailButtonPrimaryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  // Form
  formGroup: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  formGroupHalf: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#000',
  },
  genderButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    alignItems: 'center',
  },
  genderButtonSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#F0FDF4',
  },
  genderButtonText: {
    fontSize: 14,
    color: '#6B7280',
  },
  genderButtonTextSelected: {
    color: '#059669',
    fontWeight: '600',
  },
  regionScroll: {
    marginTop: 8,
  },
  regionChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    marginRight: 8,
  },
  regionChipSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#F0FDF4',
  },
  regionChipText: {
    fontSize: 13,
    color: '#6B7280',
  },
  regionChipTextSelected: {
    color: '#059669',
    fontWeight: '600',
  },

  // Review
  reviewSection: {
    marginBottom: 20,
  },
  reviewLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#F3F4F6',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  reviewGender: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  reviewCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Confirmation
  confirmationContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  confirmationIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  confirmationText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  confirmationNote: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    marginTop: 32,
  },
  confirmationNoteText: {
    fontSize: 14,
    color: '#059669',
  },
  confirmationBold: {
    fontWeight: 'bold',
  },

  // Bottom Button
  bottomButtonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  bottomButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bottomButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  bottomButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '80%',
  },
  modalHandle: {
    width: 48,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  agreementList: {
    marginBottom: 20,
  },
  agreementItemAll: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  agreementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  agreementDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  agreementText: {
    fontSize: 13,
    color: '#111827',
    flex: 1,
  },
  required: {
    fontSize: 11,
    color: '#059669',
  },
  optional: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButtonCancel: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonCancelText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },
  modalButtonSubmit: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonSubmitDisabled: {
    backgroundColor: '#D1D5DB',
  },
  modalButtonSubmitText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
