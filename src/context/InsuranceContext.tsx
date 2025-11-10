import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FormData } from '../utils/types';

interface InsuranceContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  updateFormData: (updates: Partial<FormData>) => void;
}

const InsuranceContext = createContext<InsuranceContextType | undefined>(undefined);

const initialFormData: FormData = {
  consultationType: 0,
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
};

export const InsuranceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return (
    <InsuranceContext.Provider value={{ formData, setFormData, updateFormData }}>
      {children}
    </InsuranceContext.Provider>
  );
};

export const useInsurance = () => {
  const context = useContext(InsuranceContext);
  if (!context) {
    throw new Error('useInsurance must be used within InsuranceProvider');
  }
  return context;
};
