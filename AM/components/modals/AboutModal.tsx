import React from 'react';
import { X, Sparkles, ShieldCheck, GitFork } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#111B21] border border-black/10 dark:border-[#222E35] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden text-slate-800 dark:text-[#E9EDEF]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-black/10 dark:border-[#222E35] bg-[#F0F2F5] dark:bg-[#202C33] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#128C7E] to-[#25D366] flex items-center justify-center text-lg shadow-2xs">
              🎯
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                About AI Match
              </h2>
              <p className="text-xs text-slate-500 dark:text-[#8696A0]">
                Modern AI Model & Workflow Recommendation Engine
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 text-xs leading-relaxed max-h-[75vh] overflow-y-auto text-slate-600 dark:text-slate-300">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              What is AI Match?
            </h3>
            <p>
              AI Match is an intelligent assistant designed to solve the growing paradox of choice in artificial intelligence. Instead of guessing whether to use Claude, ChatGPT, DeepSeek, Cursor, Flux, Kling, or ElevenLabs, simply describe what you want to achieve.
            </p>
          </div>

          {/* Pillars */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-start gap-2.5 bg-slate-50 dark:bg-[#202C33] p-3 rounded-xl border border-black/5 dark:border-white/5">
              <Sparkles className="w-4 h-4 text-[#128C7E] dark:text-[#25D366] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">
                  Multi-Dimensional Trade-Offs
                </strong>
                <span>
                  No fake "9.8/10" scores. We evaluate real trade-offs: highest quality output, 100% free accessibility, beginner friendliness, speed, and local privacy.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-50 dark:bg-[#202C33] p-3 rounded-xl border border-black/5 dark:border-white/5">
              <GitFork className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">
                  Multi-Stage Automation Pipelines
                </strong>
                <span>
                  Complex tasks (like creating a video ad or building a SaaS) don't rely on just one AI. AI Match designs step-by-step sequential workflows with the best tool for each stage.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-50 dark:bg-[#202C33] p-3 rounded-xl border border-black/5 dark:border-white/5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">
                  Strict Transparency on Free Tiers
                </strong>
                <span>
                  We clearly separate 100% Free, Free Tier, Paid, Open Source, and Local Offline models with verified daily limits.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-black/10 dark:border-white/10 text-[11px] text-slate-400 dark:text-slate-500">
            <p>
              Database verified and updated for <strong>March 2025</strong>. Model capabilities and free credit quotas may change periodically on provider platforms.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-[#F0F2F5] dark:bg-[#202C33] border-t border-black/10 dark:border-[#222E35] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-semibold transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
