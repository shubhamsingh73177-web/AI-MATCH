import type { FollowUpQuestion } from '../types/chat';
import type { TaskAnalysis } from './taskAnalyzer';

export function generateFollowUpQuestions(analysis: TaskAnalysis): FollowUpQuestion[] {
  const questions: FollowUpQuestion[] = [];
  const cat = analysis.primaryCategory;

  if (cat === 'video') {
    questions.push({
      id: 'fq-video-format',
      question: 'What type of video are you creating?',
      options: [
        { label: '🎬 Cinematic / Realistic', value: 'I need cinematic realism and smooth camera motion', icon: '🎬' },
        { label: '📱 Social Media Reel (9:16)', value: 'I need vertical 9:16 format for Instagram / TikTok', icon: '📱' },
        { label: '🎨 Animated / Stylized', value: 'I want stylized animated artwork', icon: '🎨' },
        { label: '🎥 Product Commercial', value: 'I want a product commercial with voiceover', icon: '🎥' }
      ]
    });
    if (!analysis.constraints.freeOnly) {
      questions.push({
        id: 'fq-video-budget',
        question: 'What is your budget priority?',
        options: [
          { label: '🆓 100% Free Only', value: 'Must be completely 100% free with no subscription', icon: '🆓' },
          { label: '💳 Free Tier is Okay', value: 'Free tier with daily/monthly quota is fine', icon: '💳' },
          { label: '⚡ Maximum Quality (Paid OK)', value: 'Prioritize top quality regardless of cost', icon: '⚡' }
        ]
      });
    }
  } else if (cat === 'coding') {
    questions.push({
      id: 'fq-coding-workflow',
      question: 'Where do you prefer to use the AI?',
      options: [
        { label: '💻 Inside VS Code / Cursor IDE', value: 'I want an AI directly inside my VS Code editor', icon: '💻' },
        { label: '📟 Terminal CLI / Autonomous Agent', value: 'I want a terminal CLI tool like Claude Code or Aider', icon: '📟' },
        { label: '🌐 Fullstack App Generator (In Browser)', value: 'I want a fullstack app builder like Bolt.new or Lovable', icon: '🌐' },
        { label: '🔒 100% Offline / Local (Ollama)', value: 'I want 100% offline privacy with Ollama and Continue.dev', icon: '🔒' }
      ]
    });
  } else if (cat === 'image') {
    questions.push({
      id: 'fq-image-style',
      question: 'What kind of image asset do you need?',
      options: [
        { label: '📷 Photorealistic Photography', value: 'I need photorealistic camera aesthetics and natural skin', icon: '📷' },
        { label: '🔤 Logo with Clear Typography', value: 'I need clear legible text and graphic design logo', icon: '🔤' },
        { label: '📐 Scalable Vector SVG', value: 'I need scalable vector SVG icons and illustrations', icon: '📐' },
        { label: '✂️ Background Removal & Studio Lighting', value: 'I need instant clean background removal and product staging', icon: '✂️' }
      ]
    });
  } else if (cat === 'presentation') {
    questions.push({
      id: 'fq-presentation-type',
      question: 'How do you want to export your slides?',
      options: [
        { label: '📊 PowerPoint (.pptx) File', value: 'I need downloadable PowerPoint .pptx file', icon: '📊' },
        { label: '🔗 Interactive Responsive Web Deck', value: 'I want an interactive web link like Gamma', icon: '🔗' },
        { label: '📄 Printable PDF Summary', value: 'I need high resolution printable PDF slides', icon: '📄' }
      ]
    });
  } else if (cat === 'pdf_documents') {
    questions.push({
      id: 'fq-pdf-task',
      question: 'What is your primary goal with the documents?',
      options: [
        { label: '🎙️ Generate Audio Podcast Overview', value: 'Create conversational audio podcast from my notes', icon: '🎙️' },
        { label: '🔍 Fact Extraction with Exact Citations', value: 'Extract key facts with footnote citations from 100+ pages', icon: '🔍' },
        { label: '📑 Multi-document Comparison', value: 'Synthesize insights across 10+ PDF files simultaneously', icon: '📑' }
      ]
    });
  } else if (cat === 'website_creation') {
    questions.push({
      id: 'fq-web-type',
      question: 'What type of website are you building?',
      options: [
        { label: '🚀 Full-Stack SaaS with Database & Auth', value: 'Full-stack SaaS web app with Supabase authentication and database', icon: '🚀' },
        { label: '🎨 React + Tailwind UI Component', value: 'Clean frontend UI React component from v0', icon: '🎨' },
        { label: '📄 Marketing Landing Page / Portfolio', value: 'Fast responsive portfolio landing page', icon: '📄' }
      ]
    });
  } else if (cat === 'voice' || cat === 'audio') {
    questions.push({
      id: 'fq-voice-type',
      question: 'What audio output do you need?',
      options: [
        { label: '🗣️ Emotional Human Speech (TTS)', value: 'Hyper-realistic human narration for YouTube or reels', icon: '🗣️' },
        { label: '🎵 Full Song with Vocals & Music', value: 'Complete radio-quality song with singing and instruments', icon: '🎵' },
        { label: '📝 Audio Transcription to Subtitles', value: 'Transcribe audio to video subtitles (.srt) using Whisper', icon: '📝' },
        { label: '🔒 100% Free Offline Voice (Kokoro)', value: 'Unlimited free offline TTS with Kokoro-82M', icon: '🔒' }
      ]
    });
  } else {
    // General fallback questions
    questions.push({
      id: 'fq-general-preference',
      question: 'What is most important for this task?',
      options: [
        { label: '🆓 100% Free ($0 Budget)', value: 'Must be completely free without hidden fees', icon: '🆓' },
        { label: '⚡ Ultra-Fast Speed', value: 'I need the fastest response latency possible', icon: '⚡' },
        { label: '🏆 Highest Benchmark Quality', value: 'Highest reasoning and output quality', icon: '🏆' },
        { label: '🔒 100% Local & Private', value: 'Run locally on my machine for total privacy', icon: '🔒' }
      ]
    });
  }

  return questions;
}
