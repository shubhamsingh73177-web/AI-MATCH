import React from 'react';
import type { UserSettings } from '../../types/chat';
import { X, Moon, Sun, Monitor, Shield, Cpu, Code2, RefreshCw } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onUpdateSetting: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
  onToggleSetting: (key: 'freeOnly' | 'openSourceOnly' | 'preferLocal' | 'apiRequired') => void;
  onClearAllChats: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSetting,
  onToggleSetting,
  onClearAllChats
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#111B21] border border-black/10 dark:border-[#222E35] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden text-slate-800 dark:text-[#E9EDEF]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-black/10 dark:border-[#222E35] bg-[#F0F2F5] dark:bg-[#202C33] flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              ⚙️ AI Match Settings & Preferences
            </h2>
            <p className="text-xs text-slate-500 dark:text-[#8696A0] mt-0.5">
              Customize recommendation filtering and interface
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="p-4 sm:p-5 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Theme Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#8696A0] block mb-2">
              Appearance Theme
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'light', label: 'Light', icon: <Sun className="w-4 h-4 text-amber-500" /> },
                { id: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4 text-slate-300" /> },
                { id: 'system', label: 'System', icon: <Monitor className="w-4 h-4 text-slate-400" /> }
              ].map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onUpdateSetting('theme', t.id as any)}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    settings.theme === t.id
                      ? 'border-[#128C7E] bg-[#128C7E]/10 text-[#128C7E] dark:text-[#25D366]'
                      : 'border-black/10 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-[#202C33] text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recommendation Filtering Preferences */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#8696A0] block">
              Recommendation Engine Filters
            </label>

            {/* Free Only Switch */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#202C33] border border-black/5 dark:border-white/5">
              <div className="pr-4">
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Free-Only Mode</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Only recommend models with a genuine free tier or 100% free access.
                </div>
              </div>
              <button
                type="button"
                onClick={() => onToggleSetting('freeOnly')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.freeOnly ? 'bg-[#128C7E]' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.freeOnly ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Open Source Only */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#202C33] border border-black/5 dark:border-white/5">
              <div className="pr-4">
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Open-Source Only</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Filter strictly for models with open weights and permissive licenses.
                </div>
              </div>
              <button
                type="button"
                onClick={() => onToggleSetting('openSourceOnly')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.openSourceOnly ? 'bg-[#128C7E]' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.openSourceOnly ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Prefer Local AI */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#202C33] border border-black/5 dark:border-white/5">
              <div className="pr-4">
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-purple-500" />
                  <span>Prefer Local Offline AI</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Prioritize private local models runnable via Ollama or LM Studio.
                </div>
              </div>
              <button
                type="button"
                onClick={() => onToggleSetting('preferLocal')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.preferLocal ? 'bg-[#128C7E]' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.preferLocal ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Data Reset */}
          <div className="pt-2 border-t border-black/10 dark:border-white/10">
            <button
              type="button"
              onClick={() => {
                if (confirm('Reset conversation history and load sample demo chats?')) {
                  onClearAllChats();
                  onClose();
                }
              }}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 text-xs font-semibold transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset & Reload Sample Chats</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
