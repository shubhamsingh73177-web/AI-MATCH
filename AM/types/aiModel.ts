export type PricingType = 'free' | 'free_tier' | 'paid' | 'open_source' | 'local';

export type CategoryType = 
  | 'text'
  | 'coding'
  | 'image'
  | 'video'
  | 'audio'
  | 'voice'
  | 'presentation'
  | 'data_analysis'
  | 'pdf_documents'
  | 'website_creation'
  | 'automation'
  | 'research'
  | 'three_d';

export type EaseOfUseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  category: CategoryType;
  subcategories: string[];
  description: string;
  tagline: string;
  pricingType: PricingType;
  freeTierDetails: string;
  paidStartingPrice?: string;
  isOpenSource: boolean;
  isLocalCapable: boolean;
  localHardwareRequirements?: string;
  isApiAvailable: boolean;
  contextWindow?: string;
  qualityRating: number; // 1 to 5
  speedRating: number;   // 1 to 5
  easeOfUse: EaseOfUseLevel;
  requiresAccount: boolean;
  bestFor: string;
  keyStrengths: string[];
  limitations: string[];
  websiteUrl: string;
  badgeLabel?: string;
  lastVerified: string;
  tradeOffProfile: {
    qualityExplanation: string;
    speedExplanation: string;
    costExplanation: string;
    privacyExplanation?: string;
  };
}
