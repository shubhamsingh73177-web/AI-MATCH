import { useState, useEffect, useRef } from 'react';
import type { Conversation, ChatMessage, UserSettings } from '../types/chat';
import { SAMPLE_CONVERSATIONS } from '../data/sampleConversations';
import { runRecommendationEngine } from '../services/recommendationEngine';

const STORAGE_KEY = 'aimatch_conversations_v1';
const ACTIVE_KEY = 'aimatch_active_chat_id_v1';

export function useChatHistory(settings: UserSettings) {
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return SAMPLE_CONVERSATIONS;
  });

  const [activeId, setActiveId] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem(ACTIVE_KEY);
      if (saved && conversations.some(c => c.id === saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return conversations[0]?.id || null;
  });

  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [streamingStageText, setStreamingStageText] = useState<string>('');
  const abortControllerRef = useRef<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch {
      // ignore
    }
  }, [conversations]);

  useEffect(() => {
    if (activeId) {
      try {
        localStorage.setItem(ACTIVE_KEY, activeId);
      } catch {
        // ignore
      }
    }
  }, [activeId]);

  const activeConversation = conversations.find(c => c.id === activeId) || null;

  const createNewChat = (): string => {
    const newId = `chat-${Date.now()}`;
    const newConv: Conversation = {
      id: newId,
      title: 'New AI Recommendation',
      createdAt: 'Just now',
      updatedAt: 'Just now',
      messages: []
    };
    setConversations(prev => [newConv, ...prev]);
    setActiveId(newId);
    return newId;
  };

  const selectConversation = (id: string) => {
    setActiveId(id);
  };

  const deleteConversation = (id: string) => {
    setConversations(prev => {
      const filtered = prev.filter(c => c.id !== id);
      if (activeId === id) {
        setActiveId(filtered[0]?.id || null);
      }
      return filtered;
    });
  };

  const togglePin = (id: string) => {
    setConversations(prev =>
      prev.map(c => (c.id === id ? { ...c, isPinned: !c.isPinned } : c))
    );
  };

  const renameConversation = (id: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    setConversations(prev =>
      prev.map(c => (c.id === id ? { ...c, title: newTitle.trim() } : c))
    );
  };

  const clearAllChats = () => {
    setConversations(SAMPLE_CONVERSATIONS);
    setActiveId(SAMPLE_CONVERSATIONS[0]?.id || null);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    let targetConvId = activeId;
    let isBrandNew = false;

    // If no active conversation or current active conversation is not found, create one
    if (!targetConvId || !conversations.some(c => c.id === targetConvId)) {
      targetConvId = createNewChat();
      isBrandNew = true;
    }

    const userMsgId = `msg-user-${Date.now()}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      timestamp: timeStr,
      text: text.trim()
    };

    const assistantMsgId = `msg-asst-${Date.now() + 1}`;
    const placeholderAssistantMessage: ChatMessage = {
      id: assistantMsgId,
      sender: 'assistant',
      timestamp: timeStr,
      text: '',
      isStreaming: true
    };

    // Auto-generate a descriptive title from user prompt if it's new
    const words = text.trim().split(/\s+/).slice(0, 5).join(' ');
    const autoTitle = words.length > 28 ? words.slice(0, 28) + '...' : words;

    // Append user message and streaming assistant placeholder
    setConversations(prev =>
      prev.map(c => {
        if (c.id === targetConvId) {
          const shouldUpdateTitle = isBrandNew || c.messages.length === 0 || c.title === 'New AI Recommendation';
          return {
            ...c,
            title: shouldUpdateTitle ? autoTitle : c.title,
            updatedAt: 'Just now',
            messages: [...c.messages, userMessage, placeholderAssistantMessage]
          };
        }
        return c;
      })
    );

    setIsStreaming(true);
    abortControllerRef.current = false;

    // Simulated multi-stage reasoning animation for professional feel
    const stages = [
      '🔍 Analyzing task requirements & intent...',
      '⚖️ Evaluating 75+ AI models & free tiers...',
      '🎯 Computing trade-offs & matching candidates...'
    ];

    for (let i = 0; i < stages.length; i++) {
      if (abortControllerRef.current) break;
      setStreamingStageText(stages[i]);
      await new Promise(r => setTimeout(r, 220));
    }

    // Run recommendation engine
    const { responseText, payload } = runRecommendationEngine(text, settings);

    // Stream the text response
    let currentStreamed = '';
    const chunkWords = responseText.split(' ');
    const stepDelay = settings.streamSpeed === 'fast' ? 10 : settings.streamSpeed === 'instant' ? 0 : 25;

    for (let i = 0; i < chunkWords.length; i++) {
      if (abortControllerRef.current) break;
      currentStreamed += (i === 0 ? '' : ' ') + chunkWords[i];

      if (stepDelay > 0 && i % 2 === 0) {
        setConversations(prev =>
          prev.map(c => {
            if (c.id === targetConvId) {
              return {
                ...c,
                messages: c.messages.map(m =>
                  m.id === assistantMsgId ? { ...m, text: currentStreamed } : m
                )
              };
            }
            return c;
          })
        );
        await new Promise(r => setTimeout(r, stepDelay));
      }
    }

    // Finalize assistant message with full text and structured recommendation payload
    setConversations(prev =>
      prev.map(c => {
        if (c.id === targetConvId) {
          return {
            ...c,
            messages: c.messages.map(m =>
              m.id === assistantMsgId
                ? {
                    ...m,
                    text: responseText,
                    recommendationPayload: payload,
                    isStreaming: false
                  }
                : m
            )
          };
        }
        return c;
      })
    );

    setIsStreaming(false);
    setStreamingStageText('');
  };

  return {
    conversations,
    activeId,
    activeConversation,
    isStreaming,
    streamingStageText,
    createNewChat,
    selectConversation,
    deleteConversation,
    togglePin,
    renameConversation,
    clearAllChats,
    sendMessage
  };
}
