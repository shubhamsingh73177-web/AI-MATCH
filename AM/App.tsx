import { useState } from 'react';
import { useSettings } from './hooks/useSettings';
import { useChatHistory } from './hooks/useChatHistory';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { ChatWindow } from './components/chat/ChatWindow';
import { ChatInput } from './components/chat/ChatInput';
import { ComparisonModal } from './components/modals/ComparisonModal';
import { ToolCatalogModal } from './components/modals/ToolCatalogModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { AboutModal } from './components/modals/AboutModal';
import type { AIModel } from './types/aiModel';
import { AI_MODELS_DATABASE } from './data/aiModels';

export function App() {
  const { settings, updateSetting, toggleSetting } = useSettings();
  const {
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
  } = useChatHistory(settings);

  // Modals state
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [comparisonModels, setComparisonModels] = useState<AIModel[]>([]);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);
  const [inputPrompt, setInputPrompt] = useState('');

  // Handle open comparison modal
  const handleOpenCompare = (model?: AIModel) => {
    if (model) {
      // Find suitable comparison rivals in the same category
      const rivals = AI_MODELS_DATABASE.filter(
        m => m.category === model.category && m.id !== model.id
      ).slice(0, 2);
      setComparisonModels([model, ...rivals]);
    } else {
      // Default top models for quick comparison
      setComparisonModels([
        AI_MODELS_DATABASE.find(m => m.id === 'claude-3-7-sonnet') || AI_MODELS_DATABASE[0],
        AI_MODELS_DATABASE.find(m => m.id === 'deepseek-r1') || AI_MODELS_DATABASE[1],
        AI_MODELS_DATABASE.find(m => m.id === 'gemini-2-flash') || AI_MODELS_DATABASE[2]
      ]);
    }
    setIsCompareModalOpen(true);
  };

  const handleToggleTheme = () => {
    const nextTheme = settings.theme === 'dark' ? 'light' : 'dark';
    updateSetting('theme', nextTheme);
  };

  return (
    <div className="h-screen w-screen flex bg-[#F0F2F5] dark:bg-[#111B21] text-slate-900 dark:text-[#E9EDEF] overflow-hidden select-none font-sans">
      {/* Left Sidebar */}
      <Sidebar
        conversations={conversations}
        activeId={activeId}
        isOpenMobile={isSidebarMobileOpen}
        onSelectConversation={selectConversation}
        onNewChat={createNewChat}
        onDeleteConversation={deleteConversation}
        onTogglePin={togglePin}
        onRenameConversation={renameConversation}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onOpenCatalog={() => setIsCatalogModalOpen(true)}
        onCloseMobile={() => setIsSidebarMobileOpen(false)}
      />

      {/* Main Chat Workspace */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-[#EFEAE2] dark:bg-[#0C1317] relative">
        {/* Header */}
        <Header
          settings={settings}
          onToggleTheme={handleToggleTheme}
          onOpenCatalog={() => setIsCatalogModalOpen(true)}
          onOpenCompareModal={() => handleOpenCompare()}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
          onToggleSidebarMobile={() => setIsSidebarMobileOpen(!isSidebarMobileOpen)}
        />

        {/* Chat Message Scroll Window */}
        <ChatWindow
          conversation={activeConversation}
          isStreaming={isStreaming}
          streamingStageText={streamingStageText}
          onSendMessage={sendMessage}
          onOpenCompare={handleOpenCompare}
          onOpenCatalog={() => setIsCatalogModalOpen(true)}
        />

        {/* Bottom Chat Input Bar */}
        <ChatInput
          onSendMessage={sendMessage}
          isStreaming={isStreaming}
          inputPrompt={inputPrompt}
          setInputPrompt={setInputPrompt}
        />
      </main>

      {/* Deep Side-by-Side Comparison Modal */}
      <ComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        initialModels={comparisonModels}
      />

      {/* Full 75+ AI Models & Tools Catalog Modal */}
      <ToolCatalogModal
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
        onSelectForChat={sendMessage}
        onOpenCompare={handleOpenCompare}
      />

      {/* User Settings & Filter Preferences Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={settings}
        onUpdateSetting={updateSetting}
        onToggleSetting={toggleSetting}
        onClearAllChats={clearAllChats}
      />

      {/* About AI Match Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
}

export default App;
