import React, { useState } from 'react';
import type { Conversation } from '../../types/chat';
import {
  Plus,
  MessageSquare,
  Search,
  Settings as SettingsIcon,
  Info,
  Pin,
  Trash2,
  Edit2,
  Check,
  X,
  Compass
} from 'lucide-react';

interface SidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  isOpenMobile: boolean;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string) => void;
  onTogglePin: (id: string) => void;
  onRenameConversation: (id: string, newTitle: string) => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  onOpenCatalog: () => void;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeId,
  isOpenMobile,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  onTogglePin,
  onRenameConversation,
  onOpenSettings,
  onOpenAbout,
  onOpenCatalog,
  onCloseMobile
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const filtered = conversations.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinned = filtered.filter(c => c.isPinned);
  const unpinned = filtered.filter(c => !c.isPinned);

  const startRename = (c: Conversation, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(c.id);
    setEditTitle(c.title);
  };

  const saveRename = (id: string, e: React.MouseEvent | React.FormEvent) => {
    e.stopPropagation();
    if (editTitle.trim()) {
      onRenameConversation(id, editTitle.trim());
    }
    setEditingId(null);
  };

  const cancelRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
  };

  const sidebarContent = (
    <div className="h-full flex flex-col bg-[#FFFFFF] dark:bg-[#111B21] border-r border-black/10 dark:border-[#222E35] w-[300px] sm:w-[320px] select-none text-slate-800 dark:text-[#E9EDEF]">
      {/* Top Header & New Chat Button */}
      <div className="p-3.5 border-b border-black/10 dark:border-[#222E35] bg-[#F0F2F5] dark:bg-[#202C33]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#128C7E] text-white flex items-center justify-center text-sm font-bold shadow-2xs">
              🎯
            </div>
            <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
              AI Match
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">v2.5</span>
        </div>

        {/* New Chat Button */}
        <button
          type="button"
          onClick={() => {
            onNewChat();
            onCloseMobile();
          }}
          className="w-full flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold text-xs py-2.5 px-3 rounded-xl transition-all shadow-xs active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>New Recommendation Chat</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-2.5 border-b border-black/5 dark:border-[#222E35]">
        <div className="flex items-center gap-2 bg-[#F0F2F5] dark:bg-[#202C33] rounded-xl px-3 py-1.5 border border-black/5 dark:border-white/5">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {/* Pinned Section */}
        {pinned.length > 0 && (
          <div>
            <div className="px-2 mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#128C7E] dark:text-[#25D366]">
              <Pin className="w-2.5 h-2.5" />
              <span>Pinned Recommendations</span>
            </div>
            <div className="space-y-1">
              {pinned.map(c => renderConversationItem(c))}
            </div>
          </div>
        )}

        {/* Regular Conversations */}
        <div>
          <div className="px-2 mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#8696A0]">
            Recent Task Queries
          </div>
          {unpinned.length === 0 && pinned.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400">
              No conversations found.
            </div>
          ) : (
            <div className="space-y-1">
              {unpinned.map(c => renderConversationItem(c))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-2 border-t border-black/10 dark:border-[#222E35] bg-[#F0F2F5] dark:bg-[#202C33] space-y-1">
        <button
          type="button"
          onClick={onOpenCatalog}
          className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#128C7E] dark:text-[#25D366]" />
            <span>AI Tools Catalog (75+)</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#128C7E]/15 text-[#128C7E] dark:text-[#25D366] font-bold">
            Live
          </span>
        </button>

        <div className="grid grid-cols-2 gap-1 pt-1">
          <button
            type="button"
            onClick={onOpenSettings}
            className="flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <SettingsIcon className="w-3.5 h-3.5 text-slate-500" />
            <span>Settings</span>
          </button>

          <button
            type="button"
            onClick={onOpenAbout}
            className="flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <Info className="w-3.5 h-3.5 text-slate-500" />
            <span>About</span>
          </button>
        </div>
      </div>
    </div>
  );

  function renderConversationItem(c: Conversation) {
    const isActive = c.id === activeId;
    const isEditing = editingId === c.id;

    return (
      <div
        key={c.id}
        onClick={() => {
          onSelectConversation(c.id);
          onCloseMobile();
        }}
        className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs cursor-pointer transition-all ${
          isActive
            ? 'bg-[#128C7E]/15 text-[#128C7E] dark:text-[#25D366] font-semibold'
            : 'hover:bg-[#F5F6F6] dark:hover:bg-[#202C33] text-slate-700 dark:text-[#E9EDEF]'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
          <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#128C7E] dark:text-[#25D366]' : 'text-slate-400'}`} />
          {isEditing ? (
            <div className="flex items-center gap-1 w-full" onClick={e => e.stopPropagation()}>
              <input
                type="text"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                autoFocus
                onKeyDown={e => {
                  if (e.key === 'Enter') saveRename(c.id, e);
                  if (e.key === 'Escape') cancelRename(e as any);
                }}
                className="w-full bg-white dark:bg-black/40 text-xs px-1.5 py-0.5 rounded border border-[#128C7E] text-slate-900 dark:text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={e => saveRename(c.id, e)}
                className="p-1 text-emerald-500 hover:text-emerald-600"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={cancelRename}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium leading-tight">{c.title}</div>
              <div className="text-[10px] text-slate-400 dark:text-[#8696A0] mt-0.5 flex items-center gap-1">
                {c.isPinned && <Pin className="w-2.5 h-2.5 text-[#128C7E] dark:text-[#25D366] shrink-0" />}
                <span>{c.updatedAt || c.createdAt}</span>
              </div>
            </div>
          )}
        </div>

        {/* Hover Action Buttons */}
        {!isEditing && (
          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                onTogglePin(c.id);
              }}
              title={c.isPinned ? 'Unpin' : 'Pin to top'}
              className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <Pin className={`w-3 h-3 ${c.isPinned ? 'text-[#128C7E] dark:text-[#25D366]' : ''}`} />
            </button>
            <button
              type="button"
              onClick={e => startRename(c, e)}
              title="Rename"
              className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <Edit2 className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                onDeleteConversation(c.id);
              }}
              title="Delete"
              className="p-1 rounded text-slate-400 hover:text-rose-500"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block h-full shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
