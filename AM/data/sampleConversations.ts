import type { Conversation } from '../types/chat';
import { AI_MODELS_DATABASE } from './aiModels';

const findModel = (id: string) => {
  const m = AI_MODELS_DATABASE.find(item => item.id === id);
  if (!m) return AI_MODELS_DATABASE[0];
  return m;
};

export const SAMPLE_CONVERSATIONS: Conversation[] = [
  {
    id: 'sample-video-event',
    title: '30s Cinematic Video for College Event',
    createdAt: 'Today, 2:15 PM',
    updatedAt: 'Today, 2:16 PM',
    isPinned: true,
    messages: [
      {
        id: 'msg-v1',
        sender: 'user',
        timestamp: '2:15 PM',
        text: 'I want to make a 30-second cinematic video for my college event. It should be free.'
      },
      {
        id: 'msg-v2',
        sender: 'assistant',
        timestamp: '2:16 PM',
        text: 'Got it. You are looking for a text/image-to-video tool that can create a short cinematic clip while keeping the cost at **₹0 / $0**. I analyzed available video AI models with generous free tiers.',
        recommendationPayload: {
          taskSummary: '30-second cinematic video generation with zero budget constraint',
          primaryCategory: 'Video Generation',
          requirements: ['High cinematic motion', '₹0 / $0 cost constraint', 'Fast rendering', 'Camera controls'],
          primaryRecommendation: findModel('kling-ai'),
          alternativeModels: [
            findModel('luma-dream-machine'),
            findModel('wan-2-1'),
            findModel('haiper-ai')
          ],
          tradeOffWinners: {
            bestQuality: findModel('kling-ai'),
            bestFree: findModel('kling-ai'),
            bestBeginner: findModel('luma-dream-machine'),
            bestPrivacyLocal: findModel('wan-2-1'),
            fastest: findModel('haiper-ai')
          },
          isWorkflow: true,
          workflowSteps: [
            {
              stepNumber: 1,
              stageName: 'Concept Visuals / Keyframes',
              description: 'Generate high-res cinematic character or stage images to use as starting frames.',
              recommendedTool: findModel('flux-1-schnell'),
              freeStatusNote: '100% Free on web demos / Apache 2.0'
            },
            {
              stepNumber: 2,
              stageName: 'Motion Video Synthesis',
              description: 'Animate the keyframes into 5-second cinematic shots with dramatic camera pan and zoom.',
              recommendedTool: findModel('kling-ai'),
              freeStatusNote: '66 free credits daily (~6 video clips/day)'
            },
            {
              stepNumber: 3,
              stageName: 'Voiceover & Announcements',
              description: 'Generate energetic event announcement narration or voiceover.',
              recommendedTool: findModel('elevenlabs'),
              freeStatusNote: 'Free 10,000 characters/month'
            },
            {
              stepNumber: 4,
              stageName: 'Background Soundtrack',
              description: 'Create an energetic hype festival soundtrack for the college event.',
              recommendedTool: findModel('suno-v3'),
              freeStatusNote: '50 free daily credits (10 songs/day)'
            }
          ],
          followUpQuestions: [
            {
              id: 'fq-video-style',
              question: 'What specific aesthetic are you aiming for in the video?',
              options: [
                { label: '🎬 Cinematic & Realistic', value: 'cinematic', icon: '🎬' },
                { label: '📱 Fast Social Media Reel', value: 'reel', icon: '📱' },
                { label: '🎨 Stylized / Anime', value: 'anime', icon: '🎨' },
                { label: '🎤 Event Teaser with Voiceover', value: 'teaser', icon: '🎤' }
              ]
            }
          ],
          disclaimer: 'Information verified March 2025 — Daily credit policies subject to provider updates.'
        }
      }
    ]
  },
  {
    id: 'sample-presentation',
    title: 'Free Presentation Maker for Notes',
    createdAt: 'Yesterday',
    updatedAt: 'Yesterday',
    messages: [
      {
        id: 'msg-p1',
        sender: 'user',
        timestamp: '11:40 AM',
        text: 'I want to create a professional presentation from my raw notes for free.'
      },
      {
        id: 'msg-p2',
        sender: 'assistant',
        timestamp: '11:41 AM',
        text: 'I analyzed the leading AI slide and presentation generators. Here is the breakdown based on slide design quality, PowerPoint export flexibility, and free accessibility.',
        recommendationPayload: {
          taskSummary: 'Convert raw text notes into modern visual slide deck with free export',
          primaryCategory: 'Presentations & Slides',
          requirements: ['Automated layout from notes', 'Export to PPTX / PDF', 'Modern design', 'Free credits'],
          primaryRecommendation: findModel('gamma-app'),
          alternativeModels: [
            findModel('beautiful-ai'),
            findModel('claude-3-7-sonnet')
          ],
          tradeOffWinners: {
            bestQuality: findModel('gamma-app'),
            bestFree: findModel('gamma-app'),
            bestBeginner: findModel('gamma-app')
          },
          isWorkflow: false,
          followUpQuestions: [
            {
              id: 'fq-slide-format',
              question: 'How do you plan to deliver this presentation?',
              options: [
                { label: '🖥️ Live Screen Presentation', value: 'live_screen', icon: '🖥️' },
                { label: '📄 Download as PowerPoint (.pptx)', value: 'download_pptx', icon: '📄' },
                { label: '🔗 Shareable Interactive Web Link', value: 'web_link', icon: '🔗' }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'sample-instagram-ad',
    title: 'Instagram Product Ad Multi-Tool Workflow',
    createdAt: '2 days ago',
    updatedAt: '2 days ago',
    messages: [
      {
        id: 'msg-ad1',
        sender: 'user',
        timestamp: '4:20 PM',
        text: 'I want to create a product advertisement video using my product image and add a voiceover.'
      },
      {
        id: 'msg-ad2',
        sender: 'assistant',
        timestamp: '4:21 PM',
        text: 'Your request requires a **multi-stage automation workflow**: image enhancement → video animation → voiceover → background audio. Here is the recommended pipeline using top-rated free-tier tools for each step.',
        recommendationPayload: {
          taskSummary: 'End-to-end Instagram product video ad pipeline with voiceover and clean product visual',
          primaryCategory: 'Automation & Multi-Tool Workflow',
          requirements: ['Product cutout & enhancement', 'Image-to-video motion', 'Human-like voiceover', 'Background music'],
          primaryRecommendation: findModel('kling-ai'),
          alternativeModels: [
            findModel('photoroom'),
            findModel('elevenlabs'),
            findModel('suno-v3')
          ],
          tradeOffWinners: {
            bestQuality: findModel('kling-ai'),
            bestFree: findModel('photoroom'),
            bestBeginner: findModel('elevenlabs')
          },
          isWorkflow: true,
          workflowSteps: [
            {
              stepNumber: 1,
              stageName: 'Product Photo Cutout & Lighting',
              description: 'Remove cluttered background and generate studio lighting shadows around your product.',
              recommendedTool: findModel('photoroom'),
              freeStatusNote: '100% Free on web with unlimited downloads'
            },
            {
              stepNumber: 2,
              stageName: 'Ad Copywriting & Script',
              description: 'Write a high-converting 15-second punchy Hook-Value-CTA video script.',
              recommendedTool: findModel('gemini-2-flash'),
              freeStatusNote: '100% Free web access'
            },
            {
              stepNumber: 3,
              stageName: 'Product Motion Animation',
              description: 'Turn the clean product photo into a 3D rotating motion showcase.',
              recommendedTool: findModel('kling-ai'),
              freeStatusNote: '66 free credits daily (~6 clips)'
            },
            {
              stepNumber: 4,
              stageName: 'Natural Human Voiceover',
              description: 'Synthesize the ad script with a clear, enthusiastic commercial voice.',
              recommendedTool: findModel('elevenlabs'),
              freeStatusNote: 'Free 10,000 chars/month'
            },
            {
              stepNumber: 5,
              stageName: 'Background Music & Assembly',
              description: 'Add subtle upbeat commercial background music and stitch in CapCut.',
              recommendedTool: findModel('suno-v3'),
              freeStatusNote: '50 free daily credits'
            }
          ],
          followUpQuestions: [
            {
              id: 'fq-ad-format',
              question: 'Where will this ad primarily be posted?',
              options: [
                { label: '📱 Instagram / TikTok Reels (9:16)', value: 'reels_vertical', icon: '📱' },
                { label: '💻 YouTube / Website Banner (16:9)', value: 'landscape', icon: '💻' },
                { label: '🟦 Square Feed Post (1:1)', value: 'square', icon: '🟦' }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'sample-pdf-doc',
    title: '100-page PDF Document Analysis',
    createdAt: '3 days ago',
    updatedAt: '3 days ago',
    messages: [
      {
        id: 'msg-pdf1',
        sender: 'user',
        timestamp: '10:05 AM',
        text: 'I want to summarize a 100-page PDF and ask questions with exact citations. It must be free.'
      },
      {
        id: 'msg-pdf2',
        sender: 'assistant',
        timestamp: '10:06 AM',
        text: 'For 100+ page documents with strict zero-hallucination citation requirements and $0 cost, **Google NotebookLM** is the absolute industry leader.',
        recommendationPayload: {
          taskSummary: 'Synthesizing 100+ page PDF with citation footnotes and 100% free access',
          primaryCategory: 'PDF & Documents',
          requirements: ['100+ pages support', 'Zero hallucination citations', '100% Free forever', 'Audio overview support'],
          primaryRecommendation: findModel('notebooklm'),
          alternativeModels: [
            findModel('gemini-2-flash'),
            findModel('chatpdf'),
            findModel('claude-3-7-sonnet')
          ],
          tradeOffWinners: {
            bestQuality: findModel('notebooklm'),
            bestFree: findModel('notebooklm'),
            bestBeginner: findModel('chatpdf'),
            fastest: findModel('gemini-2-flash')
          },
          isWorkflow: false,
          followUpQuestions: [
            {
              id: 'fq-pdf-type',
              question: 'What kind of document are you analyzing?',
              options: [
                { label: '📑 Academic Research Paper', value: 'academic', icon: '📑' },
                { label: '💼 Financial / Legal Contract', value: 'contract', icon: '💼' },
                { label: '📚 Textbook / Study Notes', value: 'textbook', icon: '📚' }
              ]
            }
          ]
        }
      }
    ]
  }
];
