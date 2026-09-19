import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isStreaming: boolean;
  inputPrompt?: string;
  setInputPrompt?: (val: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isStreaming,
  inputPrompt = '',
  setInputPrompt
}) => {
  const [localText, setLocalText] = useState(inputPrompt);
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputPrompt) {
      setLocalText(inputPrompt);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  }, [inputPrompt]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setLocalText(val);
    setInputPrompt?.(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!localText.trim() || isStreaming) return;
    onSendMessage(localText.trim());
    setLocalText('');
    setInputPrompt?.('');
  };

  const handleVoiceSimulation = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    // Simulate speech recognition
    const sampleVoiceQueries = [
      "I want to create a 30-second cinematic video for my college event. It should be free.",
      "I want to remove the background from my product image and add studio lighting.",
      "Find the best free AI for coding in VS Code with local offline privacy.",
      "I want to summarize a 100-page PDF and ask questions with citations."
    ];
    const picked = sampleVoiceQueries[Math.floor(Math.random() * sampleVoiceQueries.length)];

    setTimeout(() => {
      setLocalText(picked);
      setInputPrompt?.(picked);
      setIsRecording(false);
    }, 1500);
  };

  return (
    <div className="w-full bg-[#F0F2F5] dark:bg-[#202C33] p-2.5 sm:p-3.5 border-t border-black/10 dark:border-white/10 shrink-0">
      <div className="max-w-4xl mx-auto flex items-end gap-2">
        {/* Voice Input Button */}
        <button
          type="button"
          onClick={handleVoiceSimulation}
          title={isRecording ? 'Listening...' : 'Voice Input Simulation'}
          className={`p-2.5 rounded-full transition-all shrink-0 ${
            isRecording
              ? 'bg-rose-500 text-white animate-pulse'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'
          }`}
        >
          <Mic className="w-5 h-5" />
        </button>

        {/* Textarea Input Container */}
        <div className="flex-1 bg-white dark:bg-[#2A3942] rounded-2xl px-3.5 py-2 border border-black/10 dark:border-white/5 focus-within:border-[#128C7E] dark:focus-within:border-[#25D366] transition-colors shadow-2xs">
          <textarea
            ref={textareaRef}
            rows={1}
            value={localText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={isStreaming}
            placeholder={
              isRecording
                ? "Listening... (Simulating voice recognition)"
                : "What do you want to accomplish? (e.g., 'I want to create a 30-sec video for free')"
            }
            className="w-full resize-none bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none max-h-32 leading-relaxed"
          />
        </div>

        {/* Send Button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!localText.trim() || isStreaming}
          className={`p-2.5 rounded-full text-white transition-all shrink-0 shadow-xs flex items-center justify-center ${
            localText.trim() && !isStreaming
              ? 'bg-[#128C7E] hover:bg-[#075E54] active:scale-95 cursor-pointer'
              : 'bg-slate-300 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-70'
          }`}
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </div>

      {/* Helper Shortcut Text */}
      <div className="text-center mt-1.5 hidden sm:block">
        <span className="text-[10px] text-slate-400 dark:text-slate-500">
          Press <kbd className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono">Enter</kbd> to send, <kbd className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono">Shift+Enter</kbd> for newline
        </span>
      </div>
    </div>
  );
};
