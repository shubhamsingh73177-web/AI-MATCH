# 🎯 AI Match — Intelligent AI Model & Workflow Recommendation Engine

<div align="center">

![AI Match Banner](https://img.shields.io/badge/AI%20Match-v2.5-128C7E?style=for-the-badge&logo=openai&logoColor=white)
![React 19](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License MIT](https://img.shields.io/badge/License-MIT-25D366?style=for-the-badge)

**"Tell me what you want to do. I'll find the AI that fits."**

*A modern, WhatsApp-inspired AI recommendation platform and multi-stage workflow engine designed to match user tasks with the optimal AI models, verify free tiers, and eliminate decision fatigue.*

[Features](#-key-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Model Database](#-model-database) • [Screenshots](#-preview--design)

</div>

---

## 🌟 Key Features

### 1. 💬 WhatsApp-Inspired Natural Language Chat
- **Familiar, Clean Aesthetic**: Built with deep teal green (`#128C7E`), vibrant WhatsApp green (`#25D366`), charcoal (`#111B21`), and warm patterned chat wallpaper (`#EFEAE2` light / `#0C1317` dark).
- **Simulated Reasoning Engine**: Live progress indicators (*"Analyzing task intent...", "Evaluating 75+ AI models...", "Synthesizing trade-off comparison..."*) before delivering structured recommendations.
- **Empty State & Suggestion Pills**: 1-click prompt triggers for `💻 Coding`, `🎬 Video Generation`, `🎨 Image Gen`, `📊 Presentations`, `📑 PDF Analysis`, `🎙️ Voice & TTS`, `📱 Social Media Ads`, `🌐 Website Creation`, and `📚 Research`.

### 2. ⚖️ Specific Trade-Off Champions (No Fake Scores)
Rather than arbitrary "9.8/10" scores, AI Match analyzes and highlights specific category champions:
- 🏆 **Best for Quality**: Highest benchmark output fidelity and reasoning accuracy.
- 🆓 **Best for Free Usage**: Generous daily free quotas or $0 forever without surprise paywalls.
- 🚀 **Best for Beginners**: Zero setup, browser-based, instant onboarding.
- 🔒 **Best for Privacy / Offline**: Open-source local models runnable via Ollama or LM Studio.
- ⚡ **Fastest Speed**: Lowest latency real-time generation.

### 3. 🔄 Multi-Stage Automation Pipeline Visualizer
Detects compound requirements (e.g. *"Create an Instagram ad using my product photo and add a voiceover"*), constructing sequential step-by-step pipelines with verified free tools for each stage:
```
Product Photo (Cutout) ➔ Scriptwriting ➔ Video Animation ➔ Voiceover Narration ➔ Background Audio
      (Photoroom)           (Gemini 2.0)        (Kling AI)          (ElevenLabs)           (Suno v3.5)
```

### 4. 📊 In-Chat Side-by-Side Comparison Table
- Compact table displaying Best For, Free Access & Quota Details, Quality stars, Speed ratings, and direct launch links.

### 5. 🔍 Deep Multi-Model Comparison Matrix Modal
- Compare up to 4 models across 12 dimensions (Context window, daily quota limits, API availability, open-source status, local hardware specs, strengths, limitations, and website links).
- Interactive search bar to add or swap any model from the 75+ database.

### 6. 📚 75+ AI Models & Tools Catalog
- Searchable & filterable directory across all AI categories (Text/LLMs, Coding, Image, Video, Audio, Voice, Presentations, PDF/Documents, Website Builders, Automation, 3D Assets).
- Filter by License & Pricing: `100% Free`, `Free Tier`, `Open Source`, `Local Offline`, `API Ready`.

### 7. ⚙️ User Settings & Filter Preferences
- **Theme**: Light Mode / Dark Mode / System.
- **Free-Only Mode**: Restricts all recommendations strictly to tools with a usable free option.
- **Open-Source Only**: Filters for open-weights & permissive licenses.
- **Prefer Local AI**: Boosts local runnable models.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- npm / yarn / pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ai-match.git
   cd ai-match/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🗂️ Project Structure

```
ai-match/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── chat/           # ChatWindow, MessageBubble, ChatInput, EmptyStateHero, FollowUpPills
│   │   │   ├── layout/         # Header, Sidebar (desktop & mobile drawer)
│   │   │   ├── modals/         # ComparisonModal, ToolCatalogModal, SettingsModal, AboutModal
│   │   │   ├── recommendation/ # RecommendationCard, TradeOffBadges, ComparisonTable, WorkflowDiagram
│   │   │   └── ui/             # Badge (Pricing/License), StarRating
│   │   ├── data/
│   │   │   ├── aiModels.ts     # Curated database of 75+ AI models & verified quotas
│   │   │   ├── categories.ts   # Taxonomy, category metadata, suggestion chips
│   │   │   └── sampleConversations.ts # Pre-loaded interactive demo chats
│   │   ├── hooks/
│   │   │   ├── useChatHistory.ts # LocalStorage chat persistence & streaming simulation
│   │   │   └── useSettings.ts    # Filter switches & theme preference state
│   │   ├── services/
│   │   │   ├── taskAnalyzer.ts   # Semantic intent classification & constraint parser
│   │   │   ├── recommendationEngine.ts # Multi-criteria trade-off scoring & workflow builder
│   │   │   └── clarificationEngine.ts  # Follow-up clarifying question generator
│   │   ├── types/
│   │   │   ├── aiModel.ts      # Model schema, pricing types, capabilities
│   │   │   └── chat.ts         # Message, WorkflowStep, RecommendationPayload
│   │   ├── App.tsx             # Main layout & modal coordinator
│   │   ├── main.tsx            # React root mount
│   │   └── index.css           # WhatsApp-inspired CSS variables, wallpaper pattern & styles
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── .gitignore
└── README.md
```

---

## 🧠 Recommendation Engine Pipeline

```
User Natural Language Task
           ↓
[Task Classification & Intent Analysis]
           ↓
[Extract Constraints: Free-Only, Local, Speed, Quality]
           ↓
[Multi-Step Workflow Detection]
           ↓
[Filter Candidate Models from 75+ Database]
           ↓
[Score Candidates & Rank Multi-Dimensional Fit]
           ↓
[Extract Trade-Off Winners: Best Quality, Best Free, Best Beginner, Best Local, Fastest]
           ↓
[Render Structured WhatsApp-Styled Recommendation & Comparison Matrix]
```

---

## 🏷️ Included Model Categories (75+ Models)

| Category | Top Featured Models & Tools |
| :--- | :--- |
| **Text & Reasoning** | Claude 3.7 Sonnet, GPT-4o, Gemini 2.0 Flash, DeepSeek R1, DeepSeek V3, Llama 3.3 70B, Mistral Large |
| **Coding & IDEs** | Cursor IDE, Continue.dev, Claude Code, v0 by Vercel, Bolt.new, Lovable.dev, Aider, Qwen 2.5 Coder |
| **Image Generation** | Flux.1 [schnell], Midjourney v6.1, Ideogram 2.0, Recraft V3, Photoroom, Photopea AI, Clipdrop |
| **Video Generation** | Kling AI 1.5, Luma Dream Machine, Runway Gen-3 Alpha, Haiper AI 2.0, Wan 2.1 (Open Source) |
| **Voice & Speech** | ElevenLabs, Kokoro-82M (Open Source TTS), OpenAI Whisper, Faster-Whisper, Suno v3.5, Udio |
| **Presentations** | Gamma App, Beautiful.ai, PopAi, Microsoft Copilot Slides, Canva Magic Design |
| **PDF & Research** | Google NotebookLM, Perplexity AI, ChatPDF, SciSpace, Consensus AI, Elicit |
| **Data Analysis** | Julius AI, ChatGPT Advanced Data Analysis, Claude Artifacts CSV, Rows AI |
| **Automation** | n8n (Open Source / Self-hosted), Make.com, Zapier Central, Dify.ai |
| **3D Assets** | Tripo3D, Meshy, Spline AI |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

<div align="center">
  <sub>Built with ❤️ for developers, creators, and students to navigate the world of AI.</sub>
</div>
