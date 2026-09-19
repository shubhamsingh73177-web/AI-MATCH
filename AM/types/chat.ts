import type { AIModel } from './aiModel';

export interface WorkflowStep {
  stepNumber: number;
  stageName: string;
  description: string;
  recommendedTool: AIModel;
  alternativeTools?: AIModel[];
  freeStatusNote: string;
}

export interface TradeOffWinners {
  bestQuality?: AIModel;
  bestFree?: AIModel;
  bestBeginner?: AIModel;
  bestPrivacyLocal?: AIModel;
  fastest?: AIModel;
}

export interface FollowUpOption {
  label: string;
  value: string;
  icon?: string;
  description?: string;
}

export interface FollowUpQuestion {
  id: string;
  question: string;
  options: FollowUpOption[];
}

export interface RecommendationPayload {
  taskSummary: string;
  primaryCategory: string;
  requirements: string[];
  primaryRecommendation: AIModel;
  alternativeModels: AIModel[];
  tradeOffWinners: TradeOffWinners;
  isWorkflow: boolean;
  workflowSteps?: WorkflowStep[];
  followUpQuestions?: FollowUpQuestion[];
  disclaimer?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  recommendationPayload?: RecommendationPayload;
  isStreaming?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
  isPinned?: boolean;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  freeOnly: boolean;
  openSourceOnly: boolean;
  preferLocal: boolean;
  apiRequired: boolean;
  streamSpeed: 'fast' | 'natural' | 'instant';
}
