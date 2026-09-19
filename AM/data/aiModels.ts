import type { AIModel } from '../types/aiModel';

export const AI_MODELS_DATABASE: AIModel[] = [
  // ==========================================
  // TEXT, REASONING & RESEARCH LLMs
  // ==========================================
  {
    id: 'gemini-2-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'Google DeepMind',
    category: 'text',
    subcategories: ['General Chat', 'Multimodal', 'Coding', 'Research', 'Fast Reasoning'],
    tagline: 'Blazing fast, 1M token context, highly generous free tier via AI Studio and Gemini web.',
    description: 'Google’s state-of-the-art fast multimodal model with native audio/video understanding and massive 1,000,000 token context window.',
    pricingType: 'free_tier',
    freeTierDetails: 'Completely free on gemini.google.com and generous 15 RPM free tier in Google AI Studio.',
    paidStartingPrice: '$0.10 / 1M tokens (API) or $20/mo (Advanced)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: true,
    contextWindow: '1,000,000 tokens (~750,000 words)',
    qualityRating: 5,
    speedRating: 5,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'Large document analysis, fast general chat, multimodal queries, and budget-friendly coding.',
    keyStrengths: [
      'Massive 1M token context window allows entire books or codebases',
      'Extremely fast response latency',
      'Free web interface and generous free API quota',
      'Native image, audio, and video comprehension'
    ],
    limitations: [
      'Can occasionally be overly safe with prompt filters',
      'Requires Google account login'
    ],
    websiteUrl: 'https://gemini.google.com',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Top-tier general benchmark performance matching flagship frontier models.',
      speedExplanation: 'One of the fastest production models available anywhere (<400ms time to first token).',
      costExplanation: 'Best overall free tier with 1M tokens context without spending money.'
    }
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    provider: 'DeepSeek AI',
    category: 'text',
    subcategories: ['Reasoning', 'Mathematics', 'Complex Coding', 'Open Weights'],
    tagline: 'Open-weights reasoning powerhouse rivaling OpenAI o1 at a fraction of the compute cost.',
    description: 'Groundbreaking reinforcement-learning reasoning model that exposes internal chain-of-thought and delivers world-class STEM problem-solving.',
    pricingType: 'open_source',
    freeTierDetails: 'Free web chat on chat.deepseek.com. Weights are 100% open source (MIT license) for local Ollama usage.',
    paidStartingPrice: 'API: $0.55 / 1M input, $2.19 / 1M output tokens',
    isOpenSource: true,
    isLocalCapable: true,
    localHardwareRequirements: 'Distilled 8B/14B runs on 8-16GB RAM/VRAM; Full 671B requires multi-GPU cluster or high-quantization.',
    isApiAvailable: true,
    contextWindow: '64,000 tokens',
    qualityRating: 5,
    speedRating: 4,
    easeOfUse: 'Beginner',
    requiresAccount: false,
    bestFor: 'Complex algorithmic logic, deep step-by-step mathematical reasoning, and verifiable open-source deployments.',
    keyStrengths: [
      'Open weights & MIT license with distilled 1.5B-70B models for local PCs',
      'Chain-of-thought visible reasoning breakdown',
      'Exceptional performance on coding and math olympiad problems',
      'Free web UI and extraordinarily cheap API'
    ],
    limitations: [
      'Web interface servers can experience high traffic loads',
      'Reasoning thinking tokens take extra time before final answer'
    ],
    websiteUrl: 'https://chat.deepseek.com',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Top reasoning capability on par with OpenAI o1 for logic and algorithms.',
      speedExplanation: 'Reasoning process takes 5-15s to think through complex problems.',
      costExplanation: 'Completely free web chat and free local deployment via Ollama (100% free offline).',
      privacyExplanation: 'Can be run 100% locally and air-gapped on your private hardware.'
    }
  },
  {
    id: 'claude-3-7-sonnet',
    name: 'Claude 3.7 Sonnet',
    provider: 'Anthropic',
    category: 'text',
    subcategories: ['Coding', 'Hybrid Reasoning', 'Writing', 'Artifacts', 'Document Analysis'],
    tagline: 'Frontier hybrid reasoning model offering both instant responses and extended thinking with unmatched coding elegance.',
    description: 'Anthropic’s flagship hybrid model that can smoothly balance instantaneous high-quality prose/code with deep configurable extended reasoning.',
    pricingType: 'free_tier',
    freeTierDetails: 'Free access on claude.ai with daily message caps; Pro plan is $20/mo.',
    paidStartingPrice: '$20/mo (Claude Pro) or $3/$15 per 1M tokens API',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: true,
    contextWindow: '200,000 tokens (~150,000 words)',
    qualityRating: 5,
    speedRating: 4,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'Nuanced writing, large architectural coding tasks, interactive web artifacts, and deep analytical reasoning.',
    keyStrengths: [
      'World-class coding precision and architectural awareness',
      'Artifacts UI for live preview of React, HTML, SVG, and diagrams',
      'Hybrid reasoning switch (instant vs deep thought)',
      'Natural, articulate, and non-generic human prose'
    ],
    limitations: [
      'Free tier has rolling 5-hour message limits during peak hours',
      'No native video upload generation'
    ],
    websiteUrl: 'https://claude.ai',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Gold standard for code cleanliness, nuanced writing, and visual artifacts.',
      speedExplanation: 'Instant in standard mode; extended thinking mode takes 10-30 seconds.',
      costExplanation: 'Free tier available but capped with message limits.'
    }
  },
  {
    id: 'chatgpt-4o',
    name: 'ChatGPT (GPT-4o)',
    provider: 'OpenAI',
    category: 'text',
    subcategories: ['General Chat', 'Multimodal', 'Voice', 'Data Analysis', 'Web Search'],
    tagline: 'The universal omni-model for real-time voice, vision, web search, and data analysis.',
    description: 'OpenAI flagship multimodal intelligence with real-time web browsing, file analysis, custom GPTs, and integrated image generation.',
    pricingType: 'free_tier',
    freeTierDetails: 'Free tier with limited daily GPT-4o usage; fallback to GPT-4o mini when quota expires.',
    paidStartingPrice: '$20/month for ChatGPT Plus',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: true,
    contextWindow: '128,000 tokens',
    qualityRating: 5,
    speedRating: 5,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'Everyday assistance, conversational voice chat, all-in-one multimodal tasks, and live search.',
    keyStrengths: [
      'Integrated live search with grounded citations',
      'Advanced Data Analysis (executes Python scripts & plots graphs in browser)',
      'Rich ecosystem of Custom GPTs and mobile voice mode',
      'Generous free access to GPT-4o mini and limited GPT-4o'
    ],
    limitations: [
      'Free tier runs into message limits quickly for heavy users',
      'DALL-E 3 image generation requires Plus subscription for unlimited use'
    ],
    websiteUrl: 'https://chatgpt.com',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Industry baseline powerhouse with excellent all-round multimodal dexterity.',
      speedExplanation: 'Fast streaming generation with instant responsiveness.',
      costExplanation: 'Usable free tier with automatic fallback to fast mini model.'
    }
  },
  {
    id: 'llama-3-3-70b',
    name: 'Llama 3.3 70B',
    provider: 'Meta AI',
    category: 'text',
    subcategories: ['Open Source', 'Local LLM', 'Coding', 'General Chat'],
    tagline: 'Meta’s open-weights frontier model matching 405B performance at 70B efficiency.',
    description: 'State-of-the-art open weights LLM capable of running locally on high-end consumer hardware or freely on HuggingFace and Groq.',
    pricingType: 'open_source',
    freeTierDetails: '100% Free on meta.ai and ultra-fast free on Groq / HuggingFace. Free download via Ollama.',
    paidStartingPrice: 'Free (open weights) / Cloud hosting starts at ~$0.59/1M tokens',
    isOpenSource: true,
    isLocalCapable: true,
    localHardwareRequirements: 'Requires 40GB+ RAM or 24GB VRAM with 4-bit quantization (e.g. RTX 3090/4090 or Mac M-series with 48GB Unified Memory).',
    isApiAvailable: true,
    contextWindow: '128,000 tokens',
    qualityRating: 5,
    speedRating: 5,
    easeOfUse: 'Intermediate',
    requiresAccount: false,
    bestFor: 'Privacy-focused self-hosting, enterprise on-premise deployments, and unlimited local processing.',
    keyStrengths: [
      '100% open weights with commercial license allowance',
      'Can run completely offline and private on your machine via Ollama',
      'Blazing fast inference on Groq cloud (300+ tokens/sec)',
      '128k context window'
    ],
    limitations: [
      'Requires substantial local hardware (VRAM) to run 70B model smoothly locally',
      'No native built-in web browsing when run offline'
    ],
    websiteUrl: 'https://groq.com',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Rivals top proprietary commercial models across major MMLU and coding benchmarks.',
      speedExplanation: 'Extremely fast when hosted on Groq LPU hardware; depends on GPU when run locally.',
      costExplanation: '100% Free and open source with zero usage fees.',
      privacyExplanation: 'Total data privacy when running locally offline.'
    }
  },

  // ==========================================
  // CODING ASSISTANTS, AGENTS & IDEs
  // ==========================================
  {
    id: 'cursor-ide',
    name: 'Cursor',
    provider: 'Anysphere',
    category: 'coding',
    subcategories: ['AI IDE', 'Code Generation', 'Agentic Refactoring', 'Composer'],
    tagline: 'The AI-first fork of VS Code with codebase-wide indexing and Composer agentic multi-file edits.',
    description: 'Modern development environment built for seamless AI pair programming, codebase context awareness, and autonomous multi-file edits.',
    pricingType: 'free_tier',
    freeTierDetails: 'Hobby plan is 100% free forever: includes 2,000 completions + 50 slow premium requests/mo.',
    paidStartingPrice: '$20/month for Cursor Pro (500 fast premium requests)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: false,
    contextWindow: 'Custom repository indexing + model context',
    qualityRating: 5,
    speedRating: 5,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'Professional software engineers and developers wanting seamless AI integration inside their daily VS Code editor.',
    keyStrengths: [
      'Full codebase semantic indexing (@codebase)',
      'Composer agent mode edits multiple files across the project simultaneously',
      'Tab autocomplete predicts multi-line edits before you type',
      'Supports Claude 3.7 Sonnet, GPT-4o, and custom API keys'
    ],
    limitations: [
      '50 free fast requests run out quickly; subsequent requests enter slow queue',
      'Proprietary closed-source client (though based on open VS Code)'
    ],
    websiteUrl: 'https://cursor.com',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Unrivaled developer experience and multi-file code consistency.',
      speedExplanation: 'Instant autocomplete suggestions and streaming composer diffs.',
      costExplanation: 'Generous free tier for light use; $20/mo for full-time heavy coding.'
    }
  },
  {
    id: 'continue-dev',
    name: 'Continue.dev',
    provider: 'Continue Open Source',
    category: 'coding',
    subcategories: ['Open Source Extension', 'Local LLM Support', 'VS Code & JetBrains'],
    tagline: 'Leading 100% open-source AI code assistant for VS Code and JetBrains with local Ollama support.',
    description: 'Modular, privacy-centric coding assistant extension that connects to any LLM including local models (Ollama, LM Studio) or cloud providers.',
    pricingType: 'open_source',
    freeTierDetails: '100% Free and open source forever (Apache 2.0). Connect your own API key or local model.',
    paidStartingPrice: 'Free ($0) forever',
    isOpenSource: true,
    isLocalCapable: true,
    localHardwareRequirements: 'Any PC running Ollama with Qwen2.5-Coder (7B runs on 8GB RAM).',
    isApiAvailable: true,
    contextWindow: 'Determined by connected model',
    qualityRating: 4,
    speedRating: 5,
    easeOfUse: 'Intermediate',
    requiresAccount: false,
    bestFor: 'Privacy-focused developers, enterprise security, and 100% free local coding with zero subscription fees.',
    keyStrengths: [
      '100% Free and open source with no telemetry or lock-in',
      'Works seamlessly with local Ollama models (Qwen 2.5 Coder, DeepSeek)',
      'Works in VS Code and JetBrains IDEs',
      'Custom slash commands and documentation indexing'
    ],
    limitations: [
      'Requires configuring your own model or API key',
      'Autocomplete requires a local/fast model setup for optimal latency'
    ],
    websiteUrl: 'https://continue.dev',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Quality depends on your chosen backend model (e.g. Qwen 2.5 Coder or Claude 3.7).',
      speedExplanation: 'Ultra-fast when paired with local models or Groq.',
      costExplanation: 'Completely $0 free forever.',
      privacyExplanation: 'Zero data leaves your machine when paired with local Ollama.'
    }
  },
  {
    id: 'v0-dev',
    name: 'v0 by Vercel',
    provider: 'Vercel',
    category: 'coding',
    subcategories: ['UI Generation', 'React', 'Tailwind CSS', 'Fullstack Prototyping'],
    tagline: 'Generative UI system turning natural language prompts into production-ready React & Tailwind components.',
    description: 'Vercel’s generative frontend platform that constructs beautiful modern web interfaces, dashboards, and landing pages with live visual preview.',
    pricingType: 'free_tier',
    freeTierDetails: 'Free tier provides 200 credits monthly + daily replenishment credits.',
    paidStartingPrice: '$20/month for Premium (5,000 credits)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: true,
    contextWindow: 'Full component state',
    qualityRating: 5,
    speedRating: 5,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'Creating stunning React + Tailwind UI components, landing pages, and web app prototypes in seconds.',
    keyStrengths: [
      'Direct copy-pasteable clean React / Next.js / Tailwind code',
      'Live interactive sandboxed preview in the browser',
      'Integrates with Shadcn UI and Lucide icons standard design patterns',
      'One-click deployment to Vercel'
    ],
    limitations: [
      'Primarily frontend and UI focused (less suited for complex backend architecture)',
      'Free credits reset on a monthly schedule'
    ],
    websiteUrl: 'https://v0.dev',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Industry standard for modern aesthetic web UI code generation.',
      speedExplanation: 'Generates full responsive components in under 15 seconds.',
      costExplanation: 'Free tier is sufficient for prototyping multiple components per month.'
    }
  },
  {
    id: 'bolt-new',
    name: 'Bolt.new',
    provider: 'StackBlitz',
    category: 'website_creation',
    subcategories: ['Fullstack App Builder', 'Node.js in Browser', 'Instant Deployment'],
    tagline: 'Prompt, build, run, and deploy full-stack web applications directly in your browser with WebContainers.',
    description: 'In-browser development environment powered by WebContainers that installs npm packages, runs Node backends, and builds complete web apps from a prompt.',
    pricingType: 'free_tier',
    freeTierDetails: 'Free plan includes daily token allowance to build and test fullstack apps.',
    paidStartingPrice: '$20/month for Pro (higher token limit & private projects)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: false,
    contextWindow: 'Entire fullstack application workspace',
    qualityRating: 5,
    speedRating: 4,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'Building complete full-stack web apps, MVPs, and prototypes with backend, database, and frontend in one shot.',
    keyStrengths: [
      'Executes real Node.js, Vite, and npm dependencies inside browser WebContainers',
      'Creates full applications (frontend + backend API + SQLite/Supabase)',
      'One-click deploy to Netlify / GitHub',
      'Direct code editor with live split-screen preview'
    ],
    limitations: [
      'Token limit on free tier can deplete during long multi-step debug loops',
      'Complex heavy native binaries cannot run in WebContainers'
    ],
    websiteUrl: 'https://bolt.new',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Creates genuine running applications with package dependencies and routing.',
      speedExplanation: 'Installs dependencies and runs live dev server in under 30 seconds.',
      costExplanation: 'Free tier available daily for hobbyists and project prototyping.'
    }
  },

  // ==========================================
  // IMAGE GENERATION & EDITING
  // ==========================================
  {
    id: 'flux-1-schnell',
    name: 'Flux.1 [schnell]',
    provider: 'Black Forest Labs',
    category: 'image',
    subcategories: ['Text-to-Image', 'Open Weights', 'Photorealism', 'Fast Generation'],
    tagline: 'Leading open-weights image generator delivering state-of-the-art anatomy, photorealism, and typography in 4 steps.',
    description: 'Created by the original Stable Diffusion inventors, Flux.1 Schnell is a high-speed 12B parameter rectified flow transformer with remarkable prompt adherence.',
    pricingType: 'open_source',
    freeTierDetails: '100% Free on Hugging Face Spaces, fal.ai demo, and free open download for local ComfyUI/Forge.',
    paidStartingPrice: 'Free (Apache 2.0) / API ~$0.003 per image',
    isOpenSource: true,
    isLocalCapable: true,
    localHardwareRequirements: 'Requires 12GB+ VRAM (Nvidia RTX 3060/4060 or better) with GGUF/NF4 quantization.',
    isApiAvailable: true,
    qualityRating: 5,
    speedRating: 5,
    easeOfUse: 'Beginner',
    requiresAccount: false,
    bestFor: 'Photorealistic imagery, accurate text rendering inside images, and free commercial open-source usage.',
    keyStrengths: [
      'Unsurpassed prompt accuracy and legible text spelling in images',
      'Photorealistic skin textures and natural lighting without artificial plastic look',
      '4-step ultra fast generation',
      'Apache 2.0 license for commercial use'
    ],
    limitations: [
      'Local installation requires ComfyUI knowledge and a modern GPU',
      'Flux.1 [dev] and [pro] have higher fidelity but more restrictive licenses'
    ],
    websiteUrl: 'https://blackforestlabs.ai',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Highest quality open-source image model in the world today.',
      speedExplanation: 'Ultra fast (generates in 2 to 4 seconds on modern GPUs).',
      costExplanation: '100% Free on web demos and 100% free locally.',
      privacyExplanation: 'Runs completely offline on local hardware with zero data sharing.'
    }
  },
  {
    id: 'ideogram-2',
    name: 'Ideogram 2.0',
    provider: 'Ideogram',
    category: 'image',
    subcategories: ['Text-in-Image', 'Graphic Design', 'Typography', 'Logo Generation'],
    tagline: 'The undisputed champion of flawless typography, graphic design, and artistic posters.',
    description: 'Specialized image generator renowned for its ability to render long, complex text and stylized lettering flawlessly onto t-shirts, logos, and posters.',
    pricingType: 'free_tier',
    freeTierDetails: 'Free plan gives 10 slow credits daily (~20-40 images per day).',
    paidStartingPrice: '$8/month for Basic (400 priority credits)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: true,
    qualityRating: 5,
    speedRating: 4,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'Logos, posters, marketing banners, t-shirt designs, and any artwork requiring legible words.',
    keyStrengths: [
      'Best-in-class text and lettering fidelity in the industry',
      'Diverse style modes (Realistic, Design, 3D, Anime, General)',
      'Generous 10 free daily slow credits that refresh every 24 hours',
      'Magic Prompt feature enriches simple descriptions into artistic prompts'
    ],
    limitations: [
      'Free generation is in a public gallery',
      'Slow queue during peak hours for free tier'
    ],
    websiteUrl: 'https://ideogram.ai',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Unmatched for logos, badges, and text-heavy creative designs.',
      speedExplanation: 'Standard generation takes ~15-30s on free queue.',
      costExplanation: 'Solid free tier offering daily replenished generations.'
    }
  },
  {
    id: 'midjourney-v6',
    name: 'Midjourney v6.1',
    provider: 'Midjourney',
    category: 'image',
    subcategories: ['Photorealism', 'Cinematic Art', 'Stylization', 'Concept Art'],
    tagline: 'The creative standard for cinematic aesthetics, intricate textures, and breathtaking art direction.',
    description: 'Premier proprietary image synthesizer famous for its artistic flair, lighting aesthetics, and photorealistic concept art.',
    pricingType: 'paid',
    freeTierDetails: 'No permanent free tier (occasional promotional trials only).',
    paidStartingPrice: '$10/month for Basic Plan (200 GPU minutes)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: false,
    qualityRating: 5,
    speedRating: 4,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'Cinematic visual art, hyper-detailed fantasy/scifi concepts, and magazine-quality editorial photography.',
    keyStrengths: [
      'Incomparable artistic taste, lighting, and cinematic realism',
      'Vast style reference system (--sref) to match exact aesthetics',
      'Web-based canvas editor with inpainting, outpainting, and pan',
      'Massive global creative community'
    ],
    limitations: [
      'No free tier available ($10/mo minimum)',
      'Closed ecosystem with no public API'
    ],
    websiteUrl: 'https://midjourney.com',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Top aesthetic artistic fidelity and cinematic lighting.',
      speedExplanation: 'Standard fast GPU takes ~20 seconds per 4-grid generation.',
      costExplanation: 'Paid only ($10/mo minimum), not suitable if budget is $0.'
    }
  },
  {
    id: 'photoroom',
    name: 'Photoroom & Photopea AI',
    provider: 'Photoroom / Photopea',
    category: 'image',
    subcategories: ['Background Removal', 'Product Photography', 'Object Erasing', 'Batch Editing'],
    tagline: 'Instant AI background removal, studio lighting, and product staging for e-commerce.',
    description: 'High-precision computer vision tool tailored for instant background cutout, object removal, and professional e-commerce product staging.',
    pricingType: 'free_tier',
    freeTierDetails: 'Unlimited free high-res background removal on web and Photopea.com; HD exports with small watermark on free app.',
    paidStartingPrice: '$9.99/month for Pro (batch exports & custom studio scenes)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: true,
    qualityRating: 5,
    speedRating: 5,
    easeOfUse: 'Beginner',
    requiresAccount: false,
    bestFor: 'Removing backgrounds from product images, creating clean transparent PNGs, and generating studio backdrops.',
    keyStrengths: [
      'Instant 1-second clean hair and edge background extraction',
      'Works in browser with no mandatory account creation',
      'AI shadow generator creates realistic product ground reflections',
      'Free high-resolution downloads on web'
    ],
    limitations: [
      'Mobile app free tier attaches a small corner watermark unless using web tool',
      'Batch processing of 50+ photos requires Pro'
    ],
    websiteUrl: 'https://photoroom.com',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Pixel-perfect edge detection for clothing, hair, and transparent glassware.',
      speedExplanation: 'Instant (< 2 seconds per photo).',
      costExplanation: 'Completely free on web for single images.'
    }
  },

  // ==========================================
  // VIDEO GENERATION
  // ==========================================
  {
    id: 'kling-ai',
    name: 'Kling AI 1.5',
    provider: 'Kuaishou',
    category: 'video',
    subcategories: ['Text-to-Video', 'Image-to-Video', 'Cinematic Motion', 'High Physics Realism'],
    tagline: 'Leading video generator offering realistic physics, camera motion, and generous daily free credits.',
    description: 'State-of-the-art text and image-to-video diffusion model capable of 1080p generation with fluid physical simulation and complex motion dynamics.',
    pricingType: 'free_tier',
    freeTierDetails: 'Free plan gives 66 free daily credits every single day (creates ~6 free 5-second videos daily).',
    paidStartingPrice: '$10/month for Standard (660 credits + watermark removal)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: true,
    qualityRating: 5,
    speedRating: 3,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'Cinematic short clips, product animations from still images, and college/commercial video projects on a $0 budget.',
    keyStrengths: [
      'Generous 66 free daily credits that refresh every 24 hours',
      'Remarkable physical motion fidelity (flowing hair, water, realistic walking)',
      'Image-to-video preserves original character and scene identity with high precision',
      'Camera control tools (zoom, pan, tilt, roll)'
    ],
    limitations: [
      'Free tier output includes a small corner watermark',
      'Free generation queue can take 3-8 minutes during high traffic'
    ],
    websiteUrl: 'https://klingai.com',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Top-tier realistic motion and cinematic lighting.',
      speedExplanation: 'Takes 3-5 minutes on free queue; fast on paid plan.',
      costExplanation: 'The single best free video tier in the industry with 66 free credits daily.'
    }
  },
  {
    id: 'luma-dream-machine',
    name: 'Luma Dream Machine',
    provider: 'Luma AI',
    category: 'video',
    subcategories: ['Text-to-Video', 'Camera Movement', '3D Scene Video', 'Fast Rendering'],
    tagline: 'High-speed cinematic video engine with spectacular 3D camera sweeps and keyframe interpolation.',
    description: 'Universal transformer model generating high-fidelity cinematic video with dramatic camera dynamics and keyframe-to-keyframe bridging.',
    pricingType: 'free_tier',
    freeTierDetails: 'Free tier grants 30 free video generations per month (~1 per day).',
    paidStartingPrice: '$23.99/month for Standard (120 priority generations)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: true,
    qualityRating: 5,
    speedRating: 4,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'Dramatic 3D camera fly-throughs, cinematic trailers, and smooth keyframe morphing between two images.',
    keyStrengths: [
      'Outstanding 3D camera spatial movement and lighting coherence',
      'Keyframing feature lets you specify both the start and end images of a shot',
      '30 free generations per month on free tier',
      'Fast video rendering pipeline'
    ],
    limitations: [
      'Free tier has non-commercial license terms',
      'Monthly quota rather than daily replenishment'
    ],
    websiteUrl: 'https://lumalabs.ai/dream-machine',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Exceptional visual coherence and dynamic 3D camera navigation.',
      speedExplanation: 'Renders in 1-2 minutes.',
      costExplanation: 'Free 30 generations per month.'
    }
  },
  {
    id: 'runway-gen3',
    name: 'Runway Gen-3 Alpha',
    provider: 'Runway',
    category: 'video',
    subcategories: ['Filmmaking', 'Motion Brush', 'Text-to-Video', 'Director Mode'],
    tagline: 'Hollywood-standard AI video generation and VFX suite with granular motion brush control.',
    description: 'Industry-standard generative video platform built for filmmakers, creative directors, and video editors with professional camera presets and motion brushes.',
    pricingType: 'free_tier',
    freeTierDetails: 'Free plan gives 125 one-time credits on signup (approx 3-5 video clips). No daily reset.',
    paidStartingPrice: '$12/month for Standard (625 credits/mo)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: true,
    qualityRating: 5,
    speedRating: 4,
    easeOfUse: 'Intermediate',
    requiresAccount: true,
    bestFor: 'High-end commercial video production, precise motion brush masking, and cinematic visual effects.',
    keyStrengths: [
      'Motion Brush lets you selectively animate specific parts of an image',
      'Precise camera controls (pan, pedestal, zoom, truck)',
      'Gen-3 Alpha Turbo mode delivers fast generation at lower credit cost',
      'Full video editing suite built into the web app'
    ],
    limitations: [
      'Free credits are one-time on signup (no daily/monthly free replenishment)',
      'Free tier exports in 720p with watermark'
    ],
    websiteUrl: 'https://runwayml.com',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Industry gold standard for commercial motion control.',
      speedExplanation: 'Turbo generation takes under 45 seconds.',
      costExplanation: 'Limited free credits; requires paid plan for ongoing work.'
    }
  },
  {
    id: 'wan-2-1',
    name: 'Wan 2.1',
    provider: 'WanX / Alibaba',
    category: 'video',
    subcategories: ['Open Weights', 'Local Video Gen', 'Text-to-Video', 'Image-to-Video'],
    tagline: 'Leading 100% open-weights video generation model rivaling proprietary giants.',
    description: 'Breakthrough open-source video generative model (1.3B and 14B parameters) capable of 1080p text-to-video and image-to-video on consumer hardware.',
    pricingType: 'open_source',
    freeTierDetails: '100% Free and open source (Apache 2.0). Free online demo on Hugging Face Spaces.',
    paidStartingPrice: 'Free ($0) forever',
    isOpenSource: true,
    isLocalCapable: true,
    localHardwareRequirements: '1.3B model runs on 8GB VRAM (RTX 3060/4060); 14B model requires 16GB-24GB VRAM.',
    isApiAvailable: true,
    qualityRating: 5,
    speedRating: 3,
    easeOfUse: 'Advanced',
    requiresAccount: false,
    bestFor: 'Completely free, unlimited local video generation without watermarks, quotas, or cloud subscriptions.',
    keyStrengths: [
      '100% open weights with Apache 2.0 commercial permissive license',
      'Runs completely offline on local PC via ComfyUI',
      'Zero subscription fees, zero watermarks, zero rate limits',
      '1.3B lightweight variant runs on affordable 8GB VRAM laptops/GPUs'
    ],
    limitations: [
      'Local generation takes 1-5 minutes per clip depending on your GPU',
      'Requires ComfyUI setup and downloading large model weight files'
    ],
    websiteUrl: 'https://github.com/Wan-Video/Wan2.1',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Rivals Kling and Gen-3 in visual fidelity and physical motion.',
      speedExplanation: 'Depends on local hardware (2-10 minutes on local GPU).',
      costExplanation: 'Completely $0 free forever with unlimited generations.',
      privacyExplanation: '100% private offline video synthesis.'
    }
  },

  // ==========================================
  // VOICE, AUDIO & MUSIC GENERATION
  // ==========================================
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    provider: 'ElevenLabs',
    category: 'voice',
    subcategories: ['Text-to-Speech', 'Voice Cloning', 'Sound Effects', 'Dubbing'],
    tagline: 'The undisputed gold standard for human-like emotional voice synthesis and voice cloning.',
    description: 'Hyper-realistic AI voice generator featuring unmatched emotional inflections, pauses, breathing nuances, and instant voice cloning in 30+ languages.',
    pricingType: 'free_tier',
    freeTierDetails: 'Free plan gives 10,000 characters per month (~10-15 minutes of speech) forever.',
    paidStartingPrice: '$5/month for Starter (30,000 characters + instant voice cloning)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: true,
    qualityRating: 5,
    speedRating: 5,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'Professional voiceovers for YouTube, Reels, podcasts, audiobooks, and realistic game character voices.',
    keyStrengths: [
      'Indistinguishable from real human speech with organic pauses and emotional cues',
      'Vast library of thousands of community and professional voices',
      'Generates cinematic sound effects and multilingual automatic dubbing',
      'Free 10,000 characters monthly'
    ],
    limitations: [
      'Free plan requires attribution (e.g. "Voice by ElevenLabs")',
      'Voice cloning requires Starter plan ($5/mo)'
    ],
    websiteUrl: 'https://elevenlabs.io',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'The single most realistic AI voice generator on the market.',
      speedExplanation: 'Ultra-low latency streaming (<250ms).',
      costExplanation: 'Generous 10k chars/month free tier for content creators.'
    }
  },
  {
    id: 'kokoro-tts',
    name: 'Kokoro-82M',
    provider: 'Hexgrad / Open Source',
    category: 'voice',
    subcategories: ['Open Source TTS', 'Local Offline Voice', 'Lightweight 82M', 'Ultra Fast'],
    tagline: 'Incredible open-source 82M TTS model rivaling ElevenLabs quality at zero cost and lightweight footprint.',
    description: 'Shockingly lightweight 82M parameter open-source text-to-speech model that runs on CPU or GPU with near-commercial voice fidelity.',
    pricingType: 'open_source',
    freeTierDetails: '100% Free, open source (Apache 2.0). Unlimited local speech synthesis.',
    paidStartingPrice: 'Free ($0) forever',
    isOpenSource: true,
    isLocalCapable: true,
    localHardwareRequirements: 'Runs on any basic CPU or laptop with <500MB RAM.',
    isApiAvailable: true,
    qualityRating: 4,
    speedRating: 5,
    easeOfUse: 'Intermediate',
    requiresAccount: false,
    bestFor: 'Free unlimited voiceovers, offline local applications, game development, and privacy-sensitive speech generation.',
    keyStrengths: [
      '100% Free, open source with zero character limits or fees',
      'Extremely lightweight (only 82M parameters, ~300MB model size)',
      'Runs blazingly fast even on standard CPU without a discrete GPU',
      'Available directly in Python, Ollama, and web demos'
    ],
    limitations: [
      'Fewer voice presets than ElevenLabs library',
      'Lacks custom instant voice cloning from short audio clips'
    ],
    websiteUrl: 'https://huggingface.co/hexgrad/Kokoro-82M',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Approaches 90% of ElevenLabs quality at 0.1% the compute cost.',
      speedExplanation: 'Generates audio 10x faster than real-time on CPU.',
      costExplanation: '100% completely free with zero limits.',
      privacyExplanation: 'Runs entirely local and offline.'
    }
  },
  {
    id: 'suno-v3',
    name: 'Suno v3.5',
    provider: 'Suno AI',
    category: 'audio',
    subcategories: ['AI Music Generation', 'Full Song Creation', 'Vocals & Instruments', 'Lyrics'],
    tagline: 'Create full-length radio-quality songs with vocals, instruments, and lyrics from a single text prompt.',
    description: 'Groundbreaking generative music model capable of composing complete 2-4 minute multi-genre songs with realistic singing vocals, harmony, and instrumentation.',
    pricingType: 'free_tier',
    freeTierDetails: 'Free plan gives 50 free credits daily (creates 10 songs / 5 prompts per day).',
    paidStartingPrice: '$8/month for Pro (2,500 credits / 500 songs + commercial rights)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: false,
    qualityRating: 5,
    speedRating: 4,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'Creating custom background music, jingles, parody songs, soundtrack themes, and full vocal tracks.',
    keyStrengths: [
      'Composes full structured songs (intro, verse, chorus, bridge, outro)',
      '50 free daily credits that replenish every single day',
      'Supports every musical genre (EDM, pop, rock, lo-fi, orchestral, acoustic)',
      'Custom mode allows you to paste your own lyrics'
    ],
    limitations: [
      'Free tier does not grant commercial ownership rights (songs are non-commercial)',
      'Occasional audio compression artifacts'
    ],
    websiteUrl: 'https://suno.com',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Top music quality and song structure coherence.',
      speedExplanation: 'Generates two full songs in ~30 seconds.',
      costExplanation: 'Generous 50 daily credits refreshed every 24 hours.'
    }
  },

  // ==========================================
  // PRESENTATIONS & SLIDES
  // ==========================================
  {
    id: 'gamma-app',
    name: 'Gamma App',
    provider: 'Gamma Tech',
    category: 'presentation',
    subcategories: ['AI Presentations', 'Slide Decks', 'Web Pages', 'Documents'],
    tagline: 'Transform prompts or document notes into gorgeous, polished, ready-to-present slide decks and web pages.',
    description: 'Modern AI presentation creator that generates beautifully designed, responsive slides, interactive cards, and web pages from text prompts or raw notes in under 30 seconds.',
    pricingType: 'free_tier',
    freeTierDetails: 'Free signup grants 400 AI credits (creates ~10 full slide decks). Plus earn 200 credits per referral.',
    paidStartingPrice: '$8/month for Plus (unlimited AI generations)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: false,
    qualityRating: 5,
    speedRating: 5,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'College project presentations, startup pitch decks, executive summaries, and interactive slide docs.',
    keyStrengths: [
      'Produces modern, beautifully formatted responsive slides automatically',
      'Generates matching AI imagery, icons, and layout structure',
      'Export to PowerPoint (.pptx) and PDF with full editable elements',
      'Fluid editing: change themes or reformat cards in one click'
    ],
    limitations: [
      'Free tier has a Gamma badge on exported PDFs/slides',
      '400 credits are one-time signup bonus rather than a daily refresh'
    ],
    websiteUrl: 'https://gamma.app',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'State of the art in modern typography and automatic visual layout.',
      speedExplanation: 'Generates an entire 10-slide deck in ~25 seconds.',
      costExplanation: 'Generous 400 free credits upon signup, enough for multiple complete decks.'
    }
  },
  {
    id: 'beautiful-ai',
    name: 'Beautiful.ai',
    provider: 'Beautiful.ai',
    category: 'presentation',
    subcategories: ['Smart Slide Design', 'Corporate Decks', 'Auto-Formatting'],
    tagline: 'Smart slide designer that automatically adapts layouts as you add content with corporate consistency.',
    description: 'AI presentation software with smart layout rules that prevent clunky design mistakes and format diagrams, charts, and tables automatically.',
    pricingType: 'paid',
    freeTierDetails: '14-day free trial; paid plan required thereafter ($12/month billed annually).',
    paidStartingPrice: '$12/month for Individual',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: false,
    qualityRating: 5,
    speedRating: 4,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'Corporate business presentations, sales decks, and structured enterprise reports.',
    keyStrengths: [
      'Smart layout engine auto-resizes elements to keep slides visually balanced',
      'Extensive library of animated charts, timelines, and comparison matrices',
      'Seamless team collaboration and brand kit enforcement',
      'Clean export to PowerPoint'
    ],
    limitations: [
      'Requires credit card for 14-day trial; no permanent free tier',
      'More rigid layout system than Gamma'
    ],
    websiteUrl: 'https://beautiful.ai',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'High corporate polish and professional chart templates.',
      speedExplanation: 'Fast template populating.',
      costExplanation: 'Paid subscription required after trial.'
    }
  },

  // ==========================================
  // PDF, DOCUMENTS & RESEARCH
  // ==========================================
  {
    id: 'notebooklm',
    name: 'Google NotebookLM',
    provider: 'Google',
    category: 'pdf_documents',
    subcategories: ['PDF Analysis', 'Audio Deep Dive Podcast', 'Document Synthesis', 'Research Notes'],
    tagline: '100% Free personalized AI research assistant that synthesizes up to 50 documents and creates viral Audio Overviews.',
    description: 'Google’s AI research notebook grounded entirely in your uploaded sources (PDFs, Google Docs, YouTube URLs, websites) with zero hallucination and conversational dual-host Audio Podcasts.',
    pricingType: 'free',
    freeTierDetails: '100% completely free with any Google account. No paywalls, no credit caps.',
    paidStartingPrice: 'Free ($0) forever',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: false,
    contextWindow: 'Up to 50 sources, 500,000 words per source (~25 million words total)',
    qualityRating: 5,
    speedRating: 5,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'Summarizing 100+ page PDFs, research papers, exam study notes, and generating conversational audio podcasts from documents.',
    keyStrengths: [
      '100% Free with zero usage limits or hidden subscriptions',
      'Dual-host Audio Overview generates stunning human podcast deep-dives from your PDFs',
      'Grounded strictly in your sources with clickable citation footnotes',
      'Handles up to 50 giant PDF books or papers simultaneously'
    ],
    limitations: [
      'Only answers based on uploaded sources (cannot browse the open web independently in notebook)',
      'Requires Google account'
    ],
    websiteUrl: 'https://notebooklm.google.com',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Top accuracy for document extraction because responses are strictly grounded in citations.',
      speedExplanation: 'Instant document search and question answering.',
      costExplanation: '100% Free forever with no restrictions.',
      privacyExplanation: 'Your uploaded notes and sources are not used to train Gemini models.'
    }
  },
  {
    id: 'perplexity-ai',
    name: 'Perplexity AI',
    provider: 'Perplexity',
    category: 'research',
    subcategories: ['AI Search Engine', 'Academic Research', 'Cited Answers', 'Pro Search'],
    tagline: 'The AI search engine that delivers direct cited answers with live web research and academic source filtering.',
    description: 'Conversational answer engine that searches the live web, cross-references credible sources, and provides structured answers with inline citations.',
    pricingType: 'free_tier',
    freeTierDetails: 'Unlimited standard searches + 5 Pro Search queries every 4 hours for free.',
    paidStartingPrice: '$20/month for Perplexity Pro (300+ Pro queries/day + model switching)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: true,
    contextWindow: 'Dynamic web search + multi-source synthesis',
    qualityRating: 5,
    speedRating: 5,
    easeOfUse: 'Beginner',
    requiresAccount: false,
    bestFor: 'Fact-checking, academic research, market analysis, news synthesis, and discovering accurate sources with citations.',
    keyStrengths: [
      'Every claim is backed by direct clickable citations and sources',
      'Focus filters (Academic papers, YouTube, Reddit, Writing)',
      'Pro Search performs multi-step research queries autonomously',
      'Unlimited free standard search queries without logging in'
    ],
    limitations: [
      'Pro multi-step search is limited to 5 every 4 hours on free tier',
      'Not designed for code editor autocomplete or raw image generation'
    ],
    websiteUrl: 'https://perplexity.ai',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Gold standard for verified, factual research with citations.',
      speedExplanation: 'Searches live web and synthesizes answers in 2-4 seconds.',
      costExplanation: 'Generous free tier with unlimited standard searches.'
    }
  },

  // ==========================================
  // DATA ANALYSIS & SPREADSHEETS
  // ==========================================
  {
    id: 'julius-ai',
    name: 'Julius AI',
    provider: 'Julius Tech',
    category: 'data_analysis',
    subcategories: ['Data Science', 'Python Code Execution', 'Excel/CSV Analysis', 'Charts & Modeling'],
    tagline: 'Your AI data scientist for analyzing spreadsheets, generating statistical models, and creating interactive charts.',
    description: 'Specialized AI data analyst that runs Python code in an isolated sandbox to clean messy datasets, perform statistical regressions, and plot publication-ready visualizations.',
    pricingType: 'free_tier',
    freeTierDetails: 'Free tier includes 15 free messages/computations per month.',
    paidStartingPrice: '$17.99/month for Basic (250 messages/mo)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: false,
    contextWindow: 'Upload Excel (.xlsx), CSV, SQL, JSON datasets',
    qualityRating: 5,
    speedRating: 4,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'Analyzing messy CSV files, running correlation matrices, forecasting trends, and creating beautiful graphs without writing Python.',
    keyStrengths: [
      'Executes real Python / Pandas / Seaborn / Scikit-learn scripts in the cloud',
      'Generates downloadable interactive charts and modified Excel files',
      'Explains data anomalies and step-by-step statistical methods',
      'Connects directly to Google Sheets and Postgres databases'
    ],
    limitations: [
      '15 free messages per month is relatively low for deep data exploration',
      'Large multi-gigabyte datasets require enterprise plan'
    ],
    websiteUrl: 'https://julius.ai',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'High precision since calculations are executed with real Python code, not hallucinated LLM math.',
      speedExplanation: 'Executes computations in 5-10 seconds.',
      costExplanation: 'Usable free tier for light monthly analyses.'
    }
  },

  // ==========================================
  // AUTOMATION & WORKFLOWS
  // ==========================================
  {
    id: 'n8n-automation',
    name: 'n8n',
    provider: 'n8n GmbH',
    category: 'automation',
    subcategories: ['Workflow Automation', 'Open Source', 'Self-Hosted', 'AI Agents', 'LangChain'],
    tagline: 'Fair-code workflow automation with powerful visual AI agent builder and self-hosting freedom.',
    description: 'Visual automation platform allowing you to connect 400+ apps, chain LLMs into multi-step agentic workflows, and self-host for $0 cost on your own server or laptop.',
    pricingType: 'open_source',
    freeTierDetails: '100% Free for self-hosting with unlimited executions via Docker. Cloud trial available.',
    paidStartingPrice: 'Free (self-hosted) or €20/month for n8n Cloud',
    isOpenSource: true,
    isLocalCapable: true,
    localHardwareRequirements: 'Runs on any Docker container or VPS with 1GB RAM.',
    isApiAvailable: true,
    qualityRating: 5,
    speedRating: 5,
    easeOfUse: 'Intermediate',
    requiresAccount: false,
    bestFor: 'Automating multi-step AI tasks, connecting AI models to Slack/Discord/Databases, and building enterprise agents without Zapier subscription costs.',
    keyStrengths: [
      '100% Free self-hosting with unlimited workflow executions',
      'Native AI Agent nodes with memory, vector stores, and custom tools',
      'Visual node-based canvas with 400+ pre-built integrations',
      'Supports custom JavaScript/Python code snippets in any node'
    ],
    limitations: [
      'Self-hosting requires basic knowledge of Docker or npm command line',
      'Cloud hosted tier requires paid plan after trial'
    ],
    websiteUrl: 'https://n8n.io',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Top-tier flexibility and control over complex multi-branch logic.',
      speedExplanation: 'Executes workflows in milliseconds.',
      costExplanation: '100% Free self-hosting with unlimited runs vs Zapier’s expensive pay-per-task tiers.',
      privacyExplanation: 'All data stays entirely on your own server.'
    }
  },
  {
    id: 'make-com',
    name: 'Make (Integromat)',
    provider: 'Celonis',
    category: 'automation',
    subcategories: ['Visual Automation', 'No-Code Integration', 'Webhooks', 'Cloud Workflows'],
    tagline: 'Visual no-code automation platform for connecting apps, APIs, and AI models in minutes.',
    description: 'Intuitive drag-and-drop cloud automation system for designing multi-app workflows, data routers, and automated scheduled routines.',
    pricingType: 'free_tier',
    freeTierDetails: 'Free plan includes 1,000 operations per month and 2 active scenarios.',
    paidStartingPrice: '$9/month for Core (10,000 operations/mo)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: true,
    qualityRating: 5,
    speedRating: 5,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'No-code beginners wanting to connect OpenAI, Google Sheets, Instagram, and email alerts with zero server setup.',
    keyStrengths: [
      'Beautiful visual canvas with live data flow debugging',
      '1,000 free operations every month',
      'Built-in OpenAI and Anthropic AI modules',
      'Pre-built templates for social media, marketing, and lead routing'
    ],
    limitations: [
      'Free plan limits you to 2 active scenarios',
      '15-minute minimum schedule interval on free plan'
    ],
    websiteUrl: 'https://make.com',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Easiest visual builder with powerful error handling and data transformation.',
      speedExplanation: 'Runs instantly in the cloud.',
      costExplanation: '1,000 free operations every month.'
    }
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    provider: 'Anthropic',
    category: 'coding',
    subcategories: ['CLI Tool', 'Agentic Coding', 'Terminal', 'Repository Refactoring'],
    tagline: 'Anthropic’s official agentic terminal assistant that reads git history, executes tests, and fixes bugs.',
    description: 'Command-line tool that brings Claude directly into your terminal, allowing it to navigate codebases, run test suites, create git commits, and implement complex features.',
    pricingType: 'free_tier',
    freeTierDetails: 'Free CLI utility; uses standard Anthropic API pay-as-you-go tokens ($5 free credit on signup).',
    paidStartingPrice: 'API token pricing (~$3 / 1M input tokens)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: true,
    qualityRating: 5,
    speedRating: 5,
    easeOfUse: 'Intermediate',
    requiresAccount: true,
    bestFor: 'Terminal-heavy developers, fast bug fixing, automated test-driven development, and git workflows.',
    keyStrengths: [
      'Executes bash commands, reads files, and runs tests directly in your repo',
      'Deep architectural comprehension across thousands of lines of code',
      'Automatic git commit message authoring and PR drafting',
      'Integrates directly into existing developer shell workflows'
    ],
    limitations: [
      'Requires Anthropic API key/billing for ongoing use',
      'Terminal interface (no visual GUI editor built-in)'
    ],
    websiteUrl: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Highest coding benchmark performance on SWE-bench.',
      speedExplanation: 'Executes multi-step terminal tool calls in parallel.',
      costExplanation: 'Pay-per-token API cost; economical for targeted debugging.'
    }
  },
  {
    id: 'lovable-dev',
    name: 'Lovable.dev',
    provider: 'Lovable',
    category: 'website_creation',
    subcategories: ['Fullstack App Builder', 'Supabase Integration', 'React + Vite', 'Instant Deploy'],
    tagline: 'The AI software engineer that creates complete production-ready web apps with backend & database.',
    description: 'Generative software creation platform that designs modern web applications, connects Supabase authentication & database tables, and allows one-click GitHub sync.',
    pricingType: 'free_tier',
    freeTierDetails: 'Free plan gives 5 daily edits/messages to build and prototype web apps.',
    paidStartingPrice: '$20/month for Starter (100 messages/mo + custom domains)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: false,
    qualityRating: 5,
    speedRating: 5,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'Founders, designers, and developers building full-stack SaaS MVPs with live user authentication and database persistence.',
    keyStrengths: [
      'Integrates with Supabase in one click for real backend authentication & database tables',
      'Produces modern, beautifully styled Tailwind + Shadcn UI React code',
      'Two-way sync with GitHub repositories',
      'Interactive visual editing mode'
    ],
    limitations: [
      '5 free daily edits requires careful prompt planning',
      'Requires paid plan for custom domain deployment'
    ],
    websiteUrl: 'https://lovable.dev',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Top visual aesthetic and genuine fullstack database integration.',
      speedExplanation: 'Generates working prototype in under 45 seconds.',
      costExplanation: 'Free daily allowance for prototyping.'
    }
  },
  {
    id: 'recraft-v3',
    name: 'Recraft V3',
    provider: 'Recraft',
    category: 'image',
    subcategories: ['Vector Art (SVG)', 'Brand Consistency', 'Iconography', 'Graphic Design'],
    tagline: 'The world’s best generative vector & raster design tool for brand icons, SVG graphics, and 3D illustrations.',
    description: 'Design-centric generative AI capable of generating true scalable vector graphics (SVG), consistent brand style sets, and top-ranking raster photorealism.',
    pricingType: 'free_tier',
    freeTierDetails: 'Free plan gives 50 credits daily (~10-25 vector / raster images per day).',
    paidStartingPrice: '$20/month for Pro (priority generation & private designs)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: true,
    qualityRating: 5,
    speedRating: 5,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'Exporting true editable vector SVG graphics, app icons, brand style kits, and modern graphic design illustrations.',
    keyStrengths: [
      'Generates genuine editable vector SVGs with clean nodes',
      'Ranked #1 on Artificial Analysis text-to-image quality leaderboards',
      'Brand style palettes to keep all generated assets visually aligned',
      'Generous 50 free credits refreshed every single day'
    ],
    limitations: [
      'Community gallery for free tier generations',
      'Requires account signup'
    ],
    websiteUrl: 'https://recraft.ai',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Unmatched for vector graphics and design aesthetics.',
      speedExplanation: 'Generates in 3-5 seconds.',
      costExplanation: '50 free daily credits makes it one of the best free design tools.'
    }
  },
  {
    id: 'haiper-ai',
    name: 'Haiper AI 2.0',
    provider: 'Haiper AI',
    category: 'video',
    subcategories: ['Text-to-Video', 'Image Repainting', 'Fast Generation', 'Free Tier'],
    tagline: 'Fast and intuitive AI video generation engine with generous daily free credits.',
    description: 'Generative video platform created by former DeepMind researchers designed for fast text-to-video, image animation, and video repainting.',
    pricingType: 'free_tier',
    freeTierDetails: 'Free plan gives 10 free daily credits (creates multiple 2-4 second video clips daily).',
    paidStartingPrice: '$8/month for Pro (higher resolution & priority queue)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: true,
    qualityRating: 4,
    speedRating: 5,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'Social media creators needing quick animated visual reels and short motion clips.',
    keyStrengths: [
      'Very fast generation speeds (< 40 seconds)',
      'Free daily credit replenishment',
      'Video repainting and motion transfer features',
      'Intuitive user interface'
    ],
    limitations: [
      'Free tier clips are capped at 4-second duration',
      'Output resolution on free plan is standard HD'
    ],
    websiteUrl: 'https://haiper.ai',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Solid motion dynamics and bright color reproduction.',
      speedExplanation: 'One of the fastest video rendering pipelines.',
      costExplanation: 'Daily free credits for ongoing experiments.'
    }
  },
  {
    id: 'chatpdf',
    name: 'ChatPDF',
    provider: 'ChatPDF Inc',
    category: 'pdf_documents',
    subcategories: ['PDF Q&A', 'Document Summarization', 'Student Study', 'No Setup'],
    tagline: 'Instantly chat with any PDF document in your browser with zero learning curve.',
    description: 'Fast, focused document conversation tool that extracts key insights, creates bulleted summaries, and answers questions from any uploaded PDF.',
    pricingType: 'free_tier',
    freeTierDetails: 'Free plan allows 2 PDFs per day (up to 120 pages each) and 50 questions daily.',
    paidStartingPrice: '$5/month for Plus (unlimited PDFs & questions, up to 2,000 pages)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: true,
    qualityRating: 4,
    speedRating: 5,
    easeOfUse: 'Beginner',
    requiresAccount: false,
    bestFor: 'Quick single-document PDF question answering, contract reviews, and student homework analysis.',
    keyStrengths: [
      'Works instantly in browser without mandatory account signup',
      'Supports PDFs in all languages with automatic multilingual translation',
      'Direct page reference links for each answer',
      'Affordable $5/mo upgrade for heavy users'
    ],
    limitations: [
      'Free plan limited to 120 pages per document (use NotebookLM for 500+ pages)',
      'Cannot synthesize 10+ different PDF files in a single unified conversation on free tier'
    ],
    websiteUrl: 'https://chatpdf.com',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Fast, accurate question answering for short and medium documents.',
      speedExplanation: 'Answers in < 2 seconds.',
      costExplanation: 'Free 2 PDFs per day without creating an account.'
    }
  },
  {
    id: 'scispace',
    name: 'SciSpace (Typeset)',
    provider: 'SciSpace',
    category: 'research',
    subcategories: ['Academic Papers', 'Literature Review', 'Citation Mapping', 'Math Formula Extraction'],
    tagline: 'The ultimate AI research copilot for reading scientific papers, explaining math, and literature reviews.',
    description: 'Specialized academic research platform with access to 280+ million papers that explains complex scientific terminology, summarizes methodology, and maps citations.',
    pricingType: 'free_tier',
    freeTierDetails: 'Free plan includes unlimited paper searches, basic Copilot Q&A, and citation generation.',
    paidStartingPrice: '$12/month for Premium (unlimited Copilot questions & paraphraser)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: false,
    qualityRating: 5,
    speedRating: 5,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'University students, researchers, scientists, and engineers reviewing academic literature and dissecting complex math/tables.',
    keyStrengths: [
      'Highlight any math equation or complex table in a paper for step-by-step plain English explanation',
      'Literature review matrix comparing 50+ papers across columns (methods, findings, sample size)',
      'Over 280 million academic papers indexed with open-access PDF access',
      'Direct BibTeX / Zotero citation export'
    ],
    limitations: [
      'Advanced Copilot deep extraction has daily query limits on free plan',
      'Focused strictly on academic and scientific literature'
    ],
    websiteUrl: 'https://scispace.com',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Best-in-class for understanding academic methodologies and complex scientific jargon.',
      speedExplanation: 'Instant literature search and paper breakdown.',
      costExplanation: 'Free tier allows full literature exploration and basic Copilot questions.'
    }
  },
  {
    id: 'openai-whisper',
    name: 'OpenAI Whisper & Faster-Whisper',
    provider: 'OpenAI / Open Source Community',
    category: 'voice',
    subcategories: ['Speech-to-Text', 'Transcription', 'Subtitle Generation', 'Multilingual'],
    tagline: 'World-leading 100% open-source speech recognition and multilingual transcription model.',
    description: 'Robust automatic speech recognition (ASR) system trained on 680,000 hours of multilingual audio that provides timestamped subtitles and transcriptions.',
    pricingType: 'open_source',
    freeTierDetails: '100% Free and open source (MIT license). Unlimited local transcription on CPU or GPU.',
    paidStartingPrice: 'Free ($0) or OpenAI API at $0.006 / minute',
    isOpenSource: true,
    isLocalCapable: true,
    localHardwareRequirements: 'faster-whisper medium/large-v3 runs on 4GB-8GB VRAM or any modern multi-core CPU.',
    isApiAvailable: true,
    qualityRating: 5,
    speedRating: 5,
    easeOfUse: 'Intermediate',
    requiresAccount: false,
    bestFor: 'Transcribing podcasts, generating exact video subtitles (.srt/.vtt), transcribing lectures, and 100% free speech recognition.',
    keyStrengths: [
      '100% Free and open source with MIT license',
      'High accuracy even with background noise, technical accents, and fast speakers',
      'Generates millisecond-accurate word timestamps for video captions',
      'Translates foreign languages directly into English text'
    ],
    limitations: [
      'Speech-to-text only (does not generate speech/voice synthesis)',
      'Local CLI execution requires Python or standalone tools like Subtitle Edit / Buzz'
    ],
    websiteUrl: 'https://github.com/openai/whisper',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'Industry gold standard for transcription accuracy and accent tolerance.',
      speedExplanation: 'Transcribes a 1-hour audio file in ~1-2 minutes using faster-whisper GPU.',
      costExplanation: 'Completely $0 free forever with unlimited hours.',
      privacyExplanation: 'Runs 100% offline with complete privacy.'
    }
  },
  {
    id: 'tripo-3d',
    name: 'Tripo3D & Meshy',
    provider: 'Tripo AI / Meshy',
    category: 'three_d',
    subcategories: ['3D Model Gen', 'Text-to-3D', 'Image-to-3D', 'Game Assets', 'Mesh & Textures'],
    tagline: 'Generate textured 3D meshes and game assets from text prompts or single images in seconds.',
    description: 'Next-generation 3D generative AI that turns 2D concepts or text prompts into downloadable 3D models (.glb, .obj, .fbx) with PBR textures and rigging.',
    pricingType: 'free_tier',
    freeTierDetails: 'Free plan gives 10-20 free credits monthly (creates multiple textured 3D meshes).',
    paidStartingPrice: '$16/month for Pro (hundreds of priority 3D generations)',
    isOpenSource: false,
    isLocalCapable: false,
    isApiAvailable: true,
    qualityRating: 4,
    speedRating: 5,
    easeOfUse: 'Beginner',
    requiresAccount: true,
    bestFor: 'Game developers, 3D printing enthusiasts, VFX artists, and spatial designers needing rapid 3D concept meshes.',
    keyStrengths: [
      'Generates complete 3D models with geometry and texture in under 30 seconds',
      'Converts single 2D character/object images into 3D meshes',
      'Exports to standard formats (.GLB, .OBJ, .USDZ, .FBX) compatible with Blender, Unity, and Unreal Engine',
      'Auto-rigging feature for humanoid characters'
    ],
    limitations: [
      'Complex mechanical topology may require manual retopology in Blender',
      'Free tier has standard resolution texture limits'
    ],
    websiteUrl: 'https://tripo3d.ai',
    lastVerified: 'March 2025',
    tradeOffProfile: {
      qualityExplanation: 'High quality for rapid game prototyping and concept mockups.',
      speedExplanation: 'Generates textured 3D model in ~20-30 seconds.',
      costExplanation: 'Free monthly credits for prototyping.'
    }
  }
];

