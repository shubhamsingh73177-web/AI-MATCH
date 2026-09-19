import type { CategoryType } from '../types/aiModel';

export interface ExtractedConstraints {
  freeOnly: boolean;
  openSourceOnly: boolean;
  preferLocal: boolean;
  apiRequired: boolean;
  speedPriority: boolean;
  qualityPriority: boolean;
  beginnerFriendly: boolean;
}

export interface TaskAnalysis {
  originalQuery: string;
  primaryCategory: CategoryType;
  secondaryCategories: CategoryType[];
  isMultiStepWorkflow: boolean;
  detectedWorkflowTypes: string[];
  constraints: ExtractedConstraints;
  keywords: string[];
  summary: string;
}

export function analyzeUserTask(query: string): TaskAnalysis {
  const lower = query.toLowerCase();

  // 1. Detect Explicit Constraints
  const freeOnly = /\b(free|₹0|\$0|zero cost|no money|without paying|freely|gratis)\b/.test(lower);
  const openSourceOnly = /\b(open source|open-source|open weights|apache|mit license|self host|self-host|ollama|huggingface)\b/.test(lower);
  const preferLocal = /\b(local|offline|private|on-premise|on-prem|airgapped|air-gapped|my pc|my gpu)\b/.test(lower);
  const apiRequired = /\b(api|sdk|endpoint|programmatically|integrate|webhook)\b/.test(lower);
  const speedPriority = /\b(fast|quick|instant|speed|low latency|realtime|real-time|seconds)\b/.test(lower);
  const qualityPriority = /\b(highest quality|photorealistic|cinematic|professional|studio|state of the art|sota|best output|flawless)\b/.test(lower);
  const beginnerFriendly = /\b(beginner|easy|no code|no-code|simple|zero setup|without installation|in browser)\b/.test(lower);

  const constraints: ExtractedConstraints = {
    freeOnly,
    openSourceOnly,
    preferLocal,
    apiRequired,
    speedPriority,
    qualityPriority,
    beginnerFriendly
  };

  // 2. Detect Multi-Step Workflow Indicators
  const mentionsVideo = /\b(video|clip|animation|animate|reel|tiktok|youtube video)\b/.test(lower);
  const mentionsVoice = /\b(voice|voiceover|tts|speech|audio commentary|narration|spoken)\b/.test(lower);
  const mentionsImage = /\b(image|photo|picture|visual|graphic|artwork|logo|thumbnail|product)\b/.test(lower);
  const mentionsAudioMusic = /\b(music|song|soundtrack|beat|audio track|jingle|bgm)\b/.test(lower);
  const mentionsBackgroundRemoval = /\b(remove background|transparent|cutout|background removal|product photo)\b/.test(lower);
  const mentionsScriptOrText = /\b(script|copy|story|prompt|write|text)\b/.test(lower);
  const mentionsAutomation = /\b(automate|workflow|pipeline|connect|zapier|n8n|pipeline|chain|auto)\b/.test(lower);

  const workflowTriggers = [
    mentionsVideo && (mentionsVoice || mentionsAudioMusic),
    mentionsImage && mentionsVideo,
    mentionsBackgroundRemoval && mentionsVideo,
    mentionsAutomation,
    mentionsScriptOrText && mentionsVideo && mentionsVoice,
    /\b(instagram|ad|advertisement|commercial|marketing campaign|content pipeline)\b/.test(lower) && (mentionsVideo || mentionsImage)
  ];

  const isMultiStepWorkflow = workflowTriggers.some(Boolean);

  const detectedWorkflowTypes: string[] = [];
  if (mentionsBackgroundRemoval) detectedWorkflowTypes.push('image_cleanup');
  if (mentionsImage) detectedWorkflowTypes.push('visual_gen');
  if (mentionsVideo) detectedWorkflowTypes.push('video_synthesis');
  if (mentionsVoice) detectedWorkflowTypes.push('voiceover');
  if (mentionsAudioMusic) detectedWorkflowTypes.push('soundtrack');

  // 3. Classify Primary Category
  let primaryCategory: CategoryType = 'text';
  const secondaryCategories: CategoryType[] = [];

  if (/\b(presentation|slide|slides|pitch deck|powerpoint|pptx|keynote|deck)\b/.test(lower)) {
    primaryCategory = 'presentation';
  } else if (/\b(pdf|document|100-page|100 page|papers|paper|contract|extract text|citation|notes|summarize book)\b/.test(lower)) {
    primaryCategory = 'pdf_documents';
  } else if (/\b(code|coding|python|javascript|typescript|c\+\+|rust|react|debug|bug|ide|vs code|refactor|sql|git|compiler)\b/.test(lower)) {
    primaryCategory = 'coding';
  } else if (/\b(video|animation|animate|cinematic video|text to video|image to video|reel|camera motion|sora|kling|haiper)\b/.test(lower)) {
    primaryCategory = 'video';
  } else if (/\b(speech to text|transcribe|transcription|subtitles|captions|whisper)\b/.test(lower)) {
    primaryCategory = 'voice';
  } else if (/\b(voice|speech|tts|text to speech|voiceover|voice clone|spoken|narration|elevenlabs|kokoro)\b/.test(lower)) {
    primaryCategory = 'voice';
  } else if (/\b(music|song|instrumental|beats|lyrics|melody|suno|udio)\b/.test(lower)) {
    primaryCategory = 'audio';
  } else if (/\b(image|picture|photo|logo|illustration|background removal|flux|midjourney|drawing|vector|svg|upscale|photoroom|ideogram|recraft)\b/.test(lower)) {
    primaryCategory = 'image';
  } else if (/\b(website|web app|landing page|frontend|fullstack|saas|html|css|bolt|v0|lovable)\b/.test(lower)) {
    primaryCategory = 'website_creation';
  } else if (/\b(data|csv|excel|spreadsheet|pandas|chart|graph|statistic|analytics|regression|julius)\b/.test(lower)) {
    primaryCategory = 'data_analysis';
  } else if (/\b(automate|automation|workflow|webhook|agent|n8n|make\.com|zapier|pipeline)\b/.test(lower)) {
    primaryCategory = 'automation';
  } else if (/\b(research|academic|literature review|papers|citations|fact check|search engine|perplexity|scispace)\b/.test(lower)) {
    primaryCategory = 'research';
  } else if (/\b(3d|mesh|obj|glb|fbx|blender|unity|game asset|textured 3d|tripo|meshy)\b/.test(lower)) {
    primaryCategory = 'three_d';
  } else if (/\b(reasoning|math|maths|logic|deepseek|claude|chatgpt|general|essay|writing)\b/.test(lower)) {
    primaryCategory = 'text';
  }

  // Identify secondary categories for compound tasks
  if (mentionsVideo && primaryCategory !== 'video') secondaryCategories.push('video');
  if (mentionsImage && primaryCategory !== 'image') secondaryCategories.push('image');
  if (mentionsVoice && primaryCategory !== 'voice') secondaryCategories.push('voice');
  if (mentionsAudioMusic && primaryCategory !== 'audio') secondaryCategories.push('audio');
  if (mentionsAutomation && primaryCategory !== 'automation') secondaryCategories.push('automation');

  // Extract keywords
  const cleanTokens = lower.replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(w => w.length > 2);
  const keywords = Array.from(new Set(cleanTokens));

  // Generate Task Summary
  let summary = `Recommendation for ${primaryCategory.replace('_', ' ')}`;
  if (isMultiStepWorkflow) {
    summary = `Multi-stage pipeline (${detectedWorkflowTypes.join(' → ')})`;
  } else if (freeOnly) {
    summary = `Free / Free-tier solutions for ${primaryCategory.replace('_', ' ')}`;
  }

  return {
    originalQuery: query,
    primaryCategory,
    secondaryCategories,
    isMultiStepWorkflow,
    detectedWorkflowTypes,
    constraints,
    keywords,
    summary
  };
}
