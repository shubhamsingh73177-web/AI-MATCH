import type { CategoryType } from '../types/aiModel';

export interface CategoryMeta {
  id: CategoryType;
  label: string;
  icon: string;
  description: string;
  examplePrompts: string[];
}

export const CATEGORIES_DATA: CategoryMeta[] = [
  {
    id: 'coding',
    label: 'Coding & IDEs',
    icon: '💻',
    description: 'Code assistants, autonomous debugging agents, and generative UI builders.',
    examplePrompts: [
      'I want to debug my Python code and find memory leaks.',
      'Find a free AI for coding inside VS Code.',
      'What is the best AI to generate a React + Tailwind dashboard?'
    ]
  },
  {
    id: 'image',
    label: 'Image Generation',
    icon: '🎨',
    description: 'Text-to-image, typography in art, background removal, and vector graphics.',
    examplePrompts: [
      'I want to remove the background from an image for free.',
      'I want to generate a clean company logo with text.',
      'What is the best free open-source alternative to Midjourney?'
    ]
  },
  {
    id: 'video',
    label: 'Video Generation',
    icon: '🎬',
    description: 'Text-to-video, image-to-video animation, camera motion, and cinematic shots.',
    examplePrompts: [
      'I want to make a 30-second cinematic video for my college event. It should be free.',
      'I want to animate my product image into a smooth rotating video clip.',
      'What is the best free AI for generating realistic human videos?'
    ]
  },
  {
    id: 'voice',
    label: 'Voice & Speech',
    icon: '🎙️',
    description: 'Hyper-realistic text-to-speech, voice cloning, and multilingual transcription.',
    examplePrompts: [
      'I want to turn text into a realistic human voice for YouTube.',
      'Find a free open-source offline speech-to-text tool for video subtitles.',
      'Best AI for generating emotional voiceovers with free tier.'
    ]
  },
  {
    id: 'presentation',
    label: 'Presentations & Slides',
    icon: '📊',
    description: 'Instant pitch decks, PowerPoint generation, and responsive web slides.',
    examplePrompts: [
      'I want to create a professional presentation from my notes for free.',
      'What is the best AI to generate a startup pitch deck in PowerPoint format?',
      'Create 10 slide deck on artificial intelligence trends.'
    ]
  },
  {
    id: 'pdf_documents',
    label: 'PDF & Documents',
    icon: '📑',
    description: 'Deep document synthesis, 100+ page PDF extraction, and citation footnotes.',
    examplePrompts: [
      'I want to summarize a 100-page PDF and ask questions with citations.',
      'Free AI to compare 5 research papers simultaneously.',
      'How to create a podcast audio overview from my study notes?'
    ]
  },
  {
    id: 'research',
    label: 'Research & Search',
    icon: '📚',
    description: 'Live web search with citations, literature reviews, and academic papers.',
    examplePrompts: [
      'Find verified academic papers and literature review on quantum computing.',
      'Best free AI search engine with live citations and no hallucinations.'
    ]
  },
  {
    id: 'website_creation',
    label: 'Website Creation',
    icon: '🌐',
    description: 'Full-stack web apps, landing pages, and instant cloud deployment.',
    examplePrompts: [
      'I want to create a fullstack SaaS website with authentication from a prompt.',
      'Best AI tool to build a portfolio website quickly.'
    ]
  },
  {
    id: 'data_analysis',
    label: 'Data Analysis',
    icon: '📈',
    description: 'Excel/CSV analysis, Python code sandboxes, regression models, and charts.',
    examplePrompts: [
      'I want to analyze a messy CSV file and generate interactive trend graphs.',
      'Free AI tool to find correlations in my sales spreadsheet.'
    ]
  },
  {
    id: 'automation',
    label: 'Workflows & Automation',
    icon: '🤖',
    description: 'No-code pipelines, self-hosted AI agents, and multi-app integration.',
    examplePrompts: [
      'I want to create an Instagram advertisement using my product image and add a voiceover.',
      'How to build an automated AI workflow connecting Gmail to Notion for free?'
    ]
  },
  {
    id: 'audio',
    label: 'Music & Audio',
    icon: '🎵',
    description: 'Full song generation, background soundtracks, and stem separation.',
    examplePrompts: [
      'Generate a copyright-free lo-fi background music track for my video.',
      'Create a full song with vocals and lyrics for my brand jingle.'
    ]
  },
  {
    id: 'three_d',
    label: '3D Assets',
    icon: '🧊',
    description: 'Text-to-3D mesh generation, image-to-3D, textures, and game assets.',
    examplePrompts: [
      'I want to convert a 2D drawing into a 3D model for 3D printing.',
      'Best free AI to generate 3D assets for Unity and Blender.'
    ]
  }
];

export const SUGGESTION_CHIPS = [
  { label: '💻 Coding', prompt: 'I want to debug my Python code and find the best free coding assistant.' },
  { label: '🎬 Video Generation', prompt: 'I want to make a 30-second cinematic video for my college event. It should be free.' },
  { label: '🎨 Image Gen', prompt: 'I want to generate a professional logo and high quality images with legible text.' },
  { label: '📊 Presentations', prompt: 'I want to create a professional presentation from my notes for free.' },
  { label: '📑 PDF Analysis', prompt: 'I want to summarize a 100-page PDF and ask questions with exact citations.' },
  { label: '🎙️ Voice & TTS', prompt: 'I want to turn text into realistic human speech for video voiceovers.' },
  { label: '📱 Social Media Ad', prompt: 'I want to create an Instagram advertisement using my product image and add a voiceover.' },
  { label: '🌐 Website Creation', prompt: 'I want to build a full-stack web application from a prompt with database and auth.' },
  { label: '📚 Research', prompt: 'I need an AI tool for academic literature review with credible citations.' }
];
