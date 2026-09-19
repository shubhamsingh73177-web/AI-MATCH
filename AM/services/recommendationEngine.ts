import type { AIModel } from '../types/aiModel';
import type { RecommendationPayload, TradeOffWinners, UserSettings, WorkflowStep } from '../types/chat';
import { AI_MODELS_DATABASE } from '../data/aiModels';
import { analyzeUserTask, type TaskAnalysis } from './taskAnalyzer';
import { generateFollowUpQuestions } from './clarificationEngine';

export function runRecommendationEngine(
  query: string,
  userSettings: UserSettings
): {
  responseText: string;
  payload: RecommendationPayload;
} {
  const analysis: TaskAnalysis = analyzeUserTask(query);

  // 1. Filter candidates based on global UserSettings & Query Constraints
  let candidates = [...AI_MODELS_DATABASE];

  const mustBeFree = userSettings.freeOnly || analysis.constraints.freeOnly;
  const mustBeOpenSource = userSettings.openSourceOnly || analysis.constraints.openSourceOnly;
  const preferLocal = userSettings.preferLocal || analysis.constraints.preferLocal;
  const apiRequired = userSettings.apiRequired || analysis.constraints.apiRequired;

  if (mustBeFree) {
    // Keep models that have a real free option or free tier or open source
    candidates = candidates.filter(m => m.pricingType === 'free' || m.pricingType === 'free_tier' || m.pricingType === 'open_source');
  }

  if (mustBeOpenSource) {
    candidates = candidates.filter(m => m.isOpenSource);
  }

  if (apiRequired) {
    candidates = candidates.filter(m => m.isApiAvailable);
  }

  // If strict filtering emptied the list, relax slightly and warn in text
  let fallbackRelaxed = false;
  if (candidates.length === 0) {
    candidates = [...AI_MODELS_DATABASE];
    fallbackRelaxed = true;
  }

  // 2. Score Candidates for the Primary Category
  interface ScoredCandidate {
    model: AIModel;
    score: number;
    matchReasons: string[];
  }

  const scored: ScoredCandidate[] = candidates.map(model => {
    let score = 0;
    const matchReasons: string[] = [];

    // Category match
    if (model.category === analysis.primaryCategory) {
      score += 50;
      matchReasons.push(`Specialized in ${model.category.replace('_', ' ')}`);
    } else if (analysis.secondaryCategories.includes(model.category)) {
      score += 25;
    }

    // Keyword relevance in subcategories / description / tagline
    const queryLower = query.toLowerCase();
    for (const sub of model.subcategories) {
      if (queryLower.includes(sub.toLowerCase())) {
        score += 30;
        matchReasons.push(`Direct fit for ${sub}`);
      }
    }

    if (queryLower.includes('background') && (model.id === 'photoroom' || model.name.toLowerCase().includes('photoroom'))) {
      score += 40;
    }
    if (queryLower.includes('logo') && (model.id === 'ideogram-2' || model.id === 'recraft-v3')) {
      score += 35;
    }
    if ((queryLower.includes('text to speech') || queryLower.includes('tts') || queryLower.includes('speech synthesis') || queryLower.includes('voiceover')) && (model.id === 'elevenlabs' || model.id === 'kokoro-tts')) {
      score += 70;
    }
    if ((queryLower.includes('transcribe') || queryLower.includes('subtitles') || queryLower.includes('speech to text')) && model.id === 'openai-whisper') {
      score += 70;
    }
    if (queryLower.includes('text into speech') && (model.id === 'elevenlabs' || model.id === 'kokoro-tts')) {
      score += 70;
    }

    // Quality Score
    score += model.qualityRating * 6;

    // Speed Score if speed is prioritized
    if (analysis.constraints.speedPriority) {
      score += model.speedRating * 8;
      if (model.speedRating >= 5) {
        matchReasons.push('Ultra fast generation');
      }
    } else {
      score += model.speedRating * 3;
    }

    // Free tier generosity
    if (model.pricingType === 'free') {
      score += 30;
      matchReasons.push('100% Free with zero cost or subscription');
    } else if (model.pricingType === 'free_tier') {
      score += 20;
      matchReasons.push(`Generous free tier (${model.freeTierDetails.slice(0, 45)}...)`);
    } else if (model.pricingType === 'open_source') {
      score += 25;
      matchReasons.push('Open-source / self-hostable');
    }

    // Local / Offline preference
    if (preferLocal && model.isLocalCapable) {
      score += 35;
      matchReasons.push('Runs 100% locally on private hardware');
    }

    // Ease of use for beginners
    if (analysis.constraints.beginnerFriendly && model.easeOfUse === 'Beginner') {
      score += 15;
      matchReasons.push('Beginner-friendly with zero setup');
    }

    return {
      model,
      score,
      matchReasons
    };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // Group by category relevance
  const primaryCandidates = scored.filter(s => s.model.category === analysis.primaryCategory);
  const bestPool = primaryCandidates.length > 0 ? primaryCandidates : scored;

  const topMatch = bestPool[0]?.model || AI_MODELS_DATABASE[0];
  const alternatives = bestPool.slice(1, 4).map(s => s.model);

  // 3. Compute Category-Specific Trade-Off Champions strictly from bestPool
  const tradeOffWinners: TradeOffWinners = {};

  // Best Quality
  const sortedByQuality = [...bestPool].sort((a, b) => b.model.qualityRating - a.model.qualityRating || b.score - a.score);
  tradeOffWinners.bestQuality = sortedByQuality[0]?.model;

  // Best Free (100% Free or most generous free tier)
  const freeCandidates = bestPool.filter(s => s.model.pricingType === 'free' || s.model.pricingType === 'free_tier' || s.model.pricingType === 'open_source');
  if (freeCandidates.length > 0) {
    const sortedFree = [...freeCandidates].sort((a, b) => {
      if (a.model.pricingType === 'free' && b.model.pricingType !== 'free') return -1;
      if (b.model.pricingType === 'free' && a.model.pricingType !== 'free') return 1;
      return b.model.qualityRating - a.model.qualityRating;
    });
    tradeOffWinners.bestFree = sortedFree[0]?.model;
  } else {
    tradeOffWinners.bestFree = bestPool[0]?.model;
  }

  // Best Beginner
  const beginnerCandidates = bestPool.filter(s => s.model.easeOfUse === 'Beginner');
  tradeOffWinners.bestBeginner = beginnerCandidates[0]?.model || topMatch;

  // Best Privacy / Local
  const localCandidates = bestPool.filter(s => s.model.isLocalCapable || s.model.isOpenSource);
  if (localCandidates.length > 0) {
    tradeOffWinners.bestPrivacyLocal = localCandidates[0]?.model;
  }

  // Fastest
  const fastestCandidate = [...bestPool].sort((a, b) => b.model.speedRating - a.model.speedRating);
  tradeOffWinners.fastest = fastestCandidate[0]?.model;


  // 4. Construct Multi-Step Workflow if required
  let workflowSteps: WorkflowStep[] | undefined = undefined;
  if (analysis.isMultiStepWorkflow) {
    workflowSteps = buildMultiStepWorkflow(analysis);
  }

  // 5. Generate Clarifying Follow-Up Questions
  const followUpQuestions = generateFollowUpQuestions(analysis);

  // 6. Assemble Human-Articulated Response Markdown
  let responseText = '';

  if (fallbackRelaxed) {
    responseText += `> ℹ️ *No models perfectly matched your strict filter requirements, so I expanded the search to include top alternative options with trial or free tiers.*\n\n`;
  }

  if (analysis.isMultiStepWorkflow && workflowSteps) {
    responseText += `Your task involves **multiple interconnected creative stages** rather than a single tool.\n\n`;
    responseText += `I mapped out an **end-to-end automation pipeline** combining the top-rated AI models for each stage with their respective free tiers:`;
  } else {
    responseText += `I evaluated your request for **${analysis.primaryCategory.replace('_', ' ')}** across output quality, speed, pricing tiers, and ease of use.\n\n`;
    responseText += `**${topMatch.name}** by *${topMatch.provider}* is the strongest recommendation for your specific requirements.`;
  }

  const payload: RecommendationPayload = {
    taskSummary: analysis.summary,
    primaryCategory: analysis.primaryCategory,
    requirements: [
      mustBeFree ? 'Prioritize Free / Free Tier' : 'High Performance',
      analysis.constraints.preferLocal ? 'Local / Offline Capable' : 'Cloud or Web Accessible',
      analysis.constraints.speedPriority ? 'Low Latency Speed' : 'High Output Quality',
      analysis.constraints.beginnerFriendly ? 'Beginner Friendly' : 'Flexible Tooling'
    ],
    primaryRecommendation: topMatch,
    alternativeModels: alternatives,
    tradeOffWinners,
    isWorkflow: analysis.isMultiStepWorkflow,
    workflowSteps,
    followUpQuestions,
    disclaimer: 'Model capabilities and free limits verified March 2025. Always check provider terms for updates.'
  };

  return {
    responseText,
    payload
  };
}

function buildMultiStepWorkflow(analysis: TaskAnalysis): WorkflowStep[] {
  const steps: WorkflowStep[] = [];
  const query = analysis.originalQuery.toLowerCase();

  const getModel = (id: string, fallbackId: string = 'gemini-2-flash') => {
    return AI_MODELS_DATABASE.find(m => m.id === id) || 
           AI_MODELS_DATABASE.find(m => m.id === fallbackId) || 
           AI_MODELS_DATABASE[0];
  };

  if (/\b(instagram|ad|advertisement|product|marketing)\b/.test(query)) {
    steps.push({
      stepNumber: 1,
      stageName: 'Product Photo Cutout & Staging',
      description: 'Remove cluttered background and generate studio lighting shadows around your product.',
      recommendedTool: getModel('photoroom'),
      freeStatusNote: '100% Free on web without login'
    });
    steps.push({
      stepNumber: 2,
      stageName: 'Ad Copywriting & Script',
      description: 'Generate high-converting 15-second punchy Hook-Value-CTA video script.',
      recommendedTool: getModel('gemini-2-flash'),
      freeStatusNote: '100% Free web access'
    });
    steps.push({
      stepNumber: 3,
      stageName: 'Product Video Motion',
      description: 'Animate product photo with smooth 3D camera pan and rotation.',
      recommendedTool: getModel('kling-ai'),
      freeStatusNote: '66 free credits daily'
    });
    steps.push({
      stepNumber: 4,
      stageName: 'Commercial Human Voiceover',
      description: 'Synthesize the video script with an energetic commercial voice.',
      recommendedTool: getModel('elevenlabs'),
      freeStatusNote: 'Free 10,000 characters/mo'
    });
    steps.push({
      stepNumber: 5,
      stageName: 'Background Music & Assembly',
      description: 'Generate upbeat royalty-free backing track and stitch in CapCut.',
      recommendedTool: getModel('suno-v3'),
      freeStatusNote: '50 free daily credits'
    });
  } else if (/\b(video|movie|cinematic|film|trailer)\b/.test(query)) {
    steps.push({
      stepNumber: 1,
      stageName: 'Visual Concept & Keyframing',
      description: 'Generate photorealistic scene or character keyframes.',
      recommendedTool: getModel('flux-1-schnell'),
      freeStatusNote: '100% Free open-source'
    });
    steps.push({
      stepNumber: 2,
      stageName: 'Cinematic Motion Synthesis',
      description: 'Render 5-second realistic video clips from the keyframes.',
      recommendedTool: getModel('kling-ai'),
      freeStatusNote: '66 free daily credits'
    });
    steps.push({
      stepNumber: 3,
      stageName: 'Voiceover & Sound Effects',
      description: 'Synthesize dramatic narration and atmospheric Foley audio.',
      recommendedTool: getModel('elevenlabs'),
      freeStatusNote: 'Free 10,000 chars/mo'
    });
    steps.push({
      stepNumber: 4,
      stageName: 'Soundtrack Theme',
      description: 'Compose an orchestral or electronic cinematic backing track.',
      recommendedTool: getModel('suno-v3'),
      freeStatusNote: '50 free daily credits'
    });
  } else if (/\b(website|app|saas|fullstack)\b/.test(query)) {
    steps.push({
      stepNumber: 1,
      stageName: 'UI/UX Component Prototyping',
      description: 'Generate modern React + Tailwind components and layout structure.',
      recommendedTool: getModel('v0-dev'),
      freeStatusNote: 'Free daily/monthly credits'
    });
    steps.push({
      stepNumber: 2,
      stageName: 'Fullstack App & Database Wiring',
      description: 'Wire up Supabase database authentication and backend API endpoints.',
      recommendedTool: getModel('lovable-dev'),
      freeStatusNote: '5 free daily edits'
    });
    steps.push({
      stepNumber: 3,
      stageName: 'Vector Icons & Brand Graphics',
      description: 'Create scalable vector SVGs and modern app logos.',
      recommendedTool: getModel('recraft-v3'),
      freeStatusNote: '50 free daily credits'
    });
  } else {
    // Generic multi-step workflow
    steps.push({
      stepNumber: 1,
      stageName: 'Preparation & Planning',
      description: 'Outline requirements and structure prompts.',
      recommendedTool: getModel('gemini-2-flash'),
      freeStatusNote: '100% Free web access'
    });
    steps.push({
      stepNumber: 2,
      stageName: 'Core Generation',
      description: 'Generate high fidelity primary assets.',
      recommendedTool: getModel('flux-1-schnell'),
      freeStatusNote: '100% Free open source'
    });
    steps.push({
      stepNumber: 3,
      stageName: 'Refinement & Delivery',
      description: 'Polish, format, and assemble final output.',
      recommendedTool: getModel('claude-3-7-sonnet'),
      freeStatusNote: 'Free tier available'
    });
  }

  return steps;
}
