import React, { useRef, useEffect } from 'react';
import type { Conversation } from '../../types/chat';
import type { AIModel } from '../../types/aiModel';
import { MessageBubble } from './MessageBubble';
import { EmptyStateHero } from './EmptyStateHero';

interface ChatWindowProps {
  conversation: Conversation | null;
  isStreaming: boolean;
  streamingStageText: string;
  onSendMessage: (text: string) => void;
  onOpenCompare: (model: AIModel) => void;
  onOpenCatalog?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  conversation,
  isStreaming,
  streamingStageText,
  onSendMessage,
  onOpenCompare,
  onOpenCatalog
}) => {
  const scrollEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages, isStreaming, streamingStageText]);

  const messages = conversation?.messages || [];

  return (
    <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 relative chat-wallpaper-light dark:chat-wallpaper-dark">
      {messages.length === 0 ? (
        <EmptyStateHero
          onSelectPrompt={onSendMessage}
          onOpenCatalog={onOpenCatalog}
        />
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Conversation Start Pill */}
          <div className="flex justify-center mb-6">
            <div className="bg-black/10 dark:bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-slate-600 dark:text-slate-300 font-medium shadow-2xs">
              AI Match Engine Active • {conversation?.title}
            </div>
          </div>

          {/* Messages */}
          {messages.map((msg, idx) => (
            <MessageBubble
              key={msg.id || idx}
              message={msg}
              onOpenCompare={onOpenCompare}
              onSelectOption={onSendMessage}
            />
          ))}

          {/* Live Reasoning Indicator */}
          {isStreaming && streamingStageText && (
            <div className="flex justify-start mb-4 animate-bubble">
              <div className="bg-white/90 dark:bg-[#202C33]/90 backdrop-blur-md text-slate-800 dark:text-[#E9EDEF] rounded-2xl rounded-tl-xs px-4 py-3 shadow-sm border border-[#128C7E]/30 flex items-center gap-2.5 max-w-[85%]">
                <div className="w-5 h-5 rounded-full bg-[#128C7E] flex items-center justify-center animate-spin shrink-0 text-white text-[10px]">
                  ⟳
                </div>
                <div className="text-xs font-semibold text-[#128C7E] dark:text-[#25D366] animate-subtle-pulse">
                  {streamingStageText}
                </div>
              </div>
            </div>
          )}

          <div ref={scrollEndRef} />
        </div>
      )}
    </div>
  );
};
