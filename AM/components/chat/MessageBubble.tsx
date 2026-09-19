import React, { useState } from 'react';
import type { ChatMessage } from '../../types/chat';
import type { AIModel } from '../../types/aiModel';
import { RecommendationCard } from '../recommendation/RecommendationCard';
import { TradeOffBadges } from '../recommendation/TradeOffBadges';
import { ComparisonTable } from '../recommendation/ComparisonTable';
import { WorkflowDiagram } from '../recommendation/WorkflowDiagram';
import { FollowUpPills } from '../chat/FollowUpPills';
import { Check, CheckCheck, Copy, Sparkles, Info } from 'lucide-react';

interface MessageBubbleProps {
  message: ChatMessage;
  onOpenCompare?: (model: AIModel) => void;
  onSelectOption?: (optionValue: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onOpenCompare,
  onSelectOption
}) => {
  const isUser = message.sender === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    let copyText = message.text;
    if (message.recommendationPayload) {
      const p = message.recommendationPayload;
      copyText += `\n\nRecommended: ${p.primaryRecommendation.name} (${p.primaryRecommendation.provider})\n${p.primaryRecommendation.websiteUrl}`;
    }
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isUser) {
    return (
      <div className="flex justify-end mb-3.5 animate-bubble">
        <div className="max-w-[85%] sm:max-w-[70%] bg-[#D9FDD3] dark:bg-[#005C4B] text-slate-900 dark:text-[#E9EDEF] rounded-2xl rounded-tr-xs px-4 py-2.5 shadow-xs border border-black/5 dark:border-white/5 relative group">
          <p className="text-sm leading-relaxed whitespace-pre-wrap select-text">
            {message.text}
          </p>
          <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-500 dark:text-[#8696A0]">
            <span>{message.timestamp}</span>
            <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />
          </div>
        </div>
      </div>
    );
  }

  // Assistant Message
  const payload = message.recommendationPayload;

  return (
    <div className="flex justify-start mb-4 animate-bubble">
      <div className="max-w-[95%] sm:max-w-[85%] md:max-w-[80%] bg-white dark:bg-[#202C33] text-slate-900 dark:text-[#E9EDEF] rounded-2xl rounded-tl-xs p-4 shadow-sm border border-black/10 dark:border-white/10 relative">
        {/* Assistant Header Identifier */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#128C7E] dark:text-[#25D366]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Match Engine</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              title="Copy response"
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
            <span className="text-[10px] text-slate-400 dark:text-[#8696A0]">
              {message.timestamp}
            </span>
          </div>
        </div>

        {/* Narrative Text */}
        <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap select-text mb-2">
          {message.text}
        </div>

        {/* Structured Recommendations Payload */}
        {payload && (
          <div className="mt-2 space-y-3">
            {/* Top Recommended Card */}
            <RecommendationCard
              model={payload.primaryRecommendation}
              onOpenCompare={onOpenCompare}
            />

            {/* Trade-Off Highlights */}
            {payload.tradeOffWinners && (
              <TradeOffBadges
                winners={payload.tradeOffWinners}
                onSelectModel={onOpenCompare}
              />
            )}

            {/* Multi-Step Workflow Pipeline Visualizer (if applicable) */}
            {payload.isWorkflow && payload.workflowSteps && (
              <WorkflowDiagram
                steps={payload.workflowSteps}
                onSelectModel={onOpenCompare}
              />
            )}

            {/* In-Chat Comparison Table */}
            <ComparisonTable
              primaryModel={payload.primaryRecommendation}
              alternativeModels={payload.alternativeModels}
              onOpenCompare={onOpenCompare}
            />

            {/* Follow-up Interactive Options */}
            {payload.followUpQuestions && payload.followUpQuestions.length > 0 && onSelectOption && (
              <FollowUpPills
                questions={payload.followUpQuestions}
                onSelectOption={onSelectOption}
              />
            )}

            {/* Verification Disclaimer */}
            <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 pt-2 border-t border-black/5 dark:border-white/5">
              <Info className="w-3 h-3 shrink-0" />
              <span>{payload.disclaimer || 'Information verified March 2025 — verify current limits on provider site.'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
