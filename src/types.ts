export interface AdmissionStep {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export interface TimelineItem {
  id: number;
  phase: string;
  dateRange: string;
  description: string;
  status: 'past' | 'current' | 'future';
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface SchoolContact {
  hotline: string;
  alternativePhone: string;
  email: string;
  address: string;
  officeHours: string;
}
