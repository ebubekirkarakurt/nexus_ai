
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Section } from '../types';
import { getGeminiResponse } from '../geminiService';

interface AssistantModeProps {
  onReturnToEditor: () => void;
}

const SECTIONS: Section[] = [
  { id: '1', title: 'Executive Summary', status: 'Analyzed', description: 'Contains key objectives and Q4 rollout timeline.' },
  { id: '2', title: 'Key Objectives', status: 'Needs Data', description: 'Review latency metrics and automation targets.' },
  { id: '3', title: 'Risk Assessment', status: 'Focus', description: 'Currently discussing mitigation strategies for legacy data.' }
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: "I've reviewed the Risk Assessment section. While you've identified data migration as a primary risk, the mitigation strategy feels a bit brief.",
    timestamp: 'Today, 10:42 AM',
  },
  {
    id: '2',
    role: 'user',
    content: "Yes, that's a good point. Can you draft a paragraph explaining how the Kubernetes orchestration handles node failure during the migration?",
    timestamp: 'Today, 10:44 AM',
  }
];

const AssistantMode: React.FC<AssistantModeProps> = ({ onReturnToEditor }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getGeminiResponse(input, "You are Nexus AI Assistant. Help the user edit and improve their document. Provide drafted content when asked.");
      
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        draft: input.toLowerCase().includes('draft') || input.toLowerCase().includes('paragraph') ? {
          title: 'Draft Content',
          content: response
        } : undefined
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-1 overflow-hidden relative">
      {/* Left Sidebar - Context */}
      <aside className="w-[320px] bg-background-dark border-r border-border-dark flex flex-col p-6 overflow-y-auto">
        <h3 className="text-[#a3b99d] text-[10px] font-bold uppercase tracking-wider mb-4">Current Context</h3>
        <div className="bg-[#2c3928]/30 rounded-2xl p-4 border border-border-dark mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-primary text-[20px]">description</span>
            <span className="text-white font-bold text-sm">Project Nexus Proposal</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#a3b99d] text-[16px] mt-0.5">location_on</span>
            <div>
              <p className="text-[#a3b99d] text-[10px] uppercase font-bold">Active Section</p>
              <p className="text-white text-sm font-medium">4. Risk Assessment</p>
            </div>
          </div>
        </div>

        <h3 className="text-[#a3b99d] text-[10px] font-bold uppercase tracking-wider mb-4">Document Memory</h3>
        <div className="flex flex-col gap-3">
          {SECTIONS.map((section) => (
            <div key={section.id} className={`p-4 rounded-2xl border transition-all cursor-pointer ${section.status === 'Focus' ? 'bg-primary/10 border-primary/30' : 'bg-surface-dark border-border-dark hover:border-primary/20'}`}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-white font-bold text-sm">{section.title}</span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${section.status === 'Analyzed' ? 'bg-primary/20 text-primary' : section.status === 'Needs Data' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'}`}>
                  {section.status}
                </span>
              </div>
              <p className="text-[#a3b99d] text-[11px] leading-relaxed">{section.description}</p>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-[#0d160a] relative overflow-hidden">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 scroll-smooth">
          <div className="flex justify-center mb-4">
             <span className="bg-surface-dark px-3 py-1 rounded-full text-[10px] text-[#a3b99d] font-bold">Today, 10:42 AM</span>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="size-10 rounded-full bg-surface-dark overflow-hidden shrink-0 border border-border-dark">
                  <img src="https://picsum.photos/100/100?random=2" alt="Nexus AI" className="w-full h-full object-cover" />
                </div>
              )}
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.role === 'assistant' && <p className="text-white font-bold text-sm mb-2">Nexus Assistant</p>}
                
                <div className={`${msg.role === 'user' ? 'bg-[#2c3928] text-white' : 'bg-transparent text-[#a3b99d]'} rounded-2xl p-4 text-sm leading-relaxed ${msg.role === 'user' ? 'inline-block text-left' : ''}`}>
                  {msg.content}
                </div>

                {msg.draft && (
                   <div className="mt-4 bg-[#1a2c17] rounded-3xl border border-border-dark overflow-hidden">
                    <div className="p-6 border-l-4 border-primary">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="material-symbols-outlined text-primary text-[20px]">article</span>
                        <span className="text-white font-bold text-sm">{msg.draft.title}</span>
                      </div>
                      <div className="text-white/80 text-sm leading-loose italic whitespace-pre-wrap">
                        "{msg.draft.content}"
                      </div>
                      <div className="flex gap-2 mt-6">
                        <button className="flex items-center gap-2 bg-surface-dark px-3 py-1.5 rounded-full border border-border-dark text-[10px] font-bold text-white hover:bg-white/10">
                          <span className="material-symbols-outlined text-[14px]">psychology</span>
                          Explain this concept
                        </button>
                        <button className="flex items-center gap-2 bg-surface-dark px-3 py-1.5 rounded-full border border-border-dark text-[10px] font-bold text-white hover:bg-white/10">
                          <span className="material-symbols-outlined text-[14px]">translate</span>
                          Translate to Spanish
                        </button>
                        <button className="flex items-center gap-2 bg-surface-dark px-3 py-1.5 rounded-full border border-border-dark text-[10px] font-bold text-white hover:bg-white/10">
                          <span className="material-symbols-outlined text-[14px]">compress</span>
                          Make it concise
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="size-10 rounded-full bg-surface-dark overflow-hidden shrink-0 border border-border-dark">
                  <img src="https://picsum.photos/100/100?random=1" alt="User" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4">
              <div className="size-10 rounded-full bg-surface-dark shrink-0 animate-pulse"></div>
              <div className="bg-surface-dark rounded-2xl p-4 w-24 h-12 flex items-center justify-center gap-1">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-6">
          <div className="max-w-3xl mx-auto relative bg-surface-dark rounded-3xl border border-border-dark p-2 transition-all focus-within:border-primary/50 shadow-2xl">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
              placeholder="Ask Nexus to edit, write, or explain..."
              className="w-full bg-transparent border-none text-white focus:ring-0 text-sm p-3 min-h-[60px] resize-none"
            />
            <div className="flex items-center justify-between px-3 pb-2">
              <div className="flex gap-2">
                <button className="p-2 text-[#a3b99d] hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">link</span>
                </button>
                <button className="p-2 text-[#a3b99d] hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">mic</span>
                </button>
              </div>
              <button 
                onClick={handleSend}
                className={`size-10 rounded-full flex items-center justify-center transition-all ${input.trim() ? 'bg-primary text-background-dark scale-110 shadow-lg shadow-primary/20' : 'bg-white/5 text-[#a3b99d]'}`}
              >
                <span className="material-symbols-outlined text-[20px] font-bold">arrow_upward</span>
              </button>
            </div>
          </div>
          <p className="text-center text-[10px] text-[#a3b99d]/50 mt-3">Nexus AI can make mistakes. Please review generated content.</p>
        </div>
      </main>

      {/* Right Sidebar - Tools */}
      <aside className="w-[320px] bg-background-dark border-l border-border-dark flex flex-col p-6 overflow-y-auto">
        <div className="flex items-center gap-2 mb-8">
           <span className="material-symbols-outlined text-primary text-[22px]">extension</span>
           <h3 className="text-white font-bold text-sm">Active Tools</h3>
        </div>

        <div className="flex flex-col gap-4 mb-8">
           <div className="bg-[#1a2c17] rounded-3xl p-4 border border-border-dark hover:border-primary/20 cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                   <span className="material-symbols-outlined text-primary">segment</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#a3b99d] group-hover:text-white transition-colors">open_in_new</span>
              </div>
              <h4 className="text-white font-bold text-sm mb-1">Rewrite Section</h4>
              <p className="text-[#a3b99d] text-[10px] leading-relaxed">Change tone, length, or format of selected text.</p>
           </div>

           <div className="bg-[#1a2c17] rounded-3xl p-4 border border-border-dark hover:border-primary/20 cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                   <span className="material-symbols-outlined text-primary">auto_stories</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#a3b99d] group-hover:text-white transition-colors">open_in_new</span>
              </div>
              <h4 className="text-white font-bold text-sm mb-1">Generate Summary</h4>
              <p className="text-[#a3b99d] text-[10px] leading-relaxed">Create an abstract or executive summary.</p>
           </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[#a3b99d] text-[10px] font-bold uppercase tracking-wider">Suggestions</h3>
          <span className="bg-red-500/20 text-red-400 text-[9px] font-bold px-1.5 py-0.5 rounded">3 FOUND</span>
        </div>

        <div className="flex flex-col gap-3">
           <div className="bg-surface-dark rounded-2xl p-4 border border-border-dark hover:border-yellow-500/20">
              <div className="flex items-center gap-2 mb-2">
                 <span className="material-symbols-outlined text-yellow-500 text-[18px]">warning</span>
                 <span className="text-white font-bold text-xs">Passive Voice</span>
              </div>
              <p className="text-[#a3b99d] text-[10px] leading-relaxed mb-3">"The data lake layer will be upgraded..." considers active voice.</p>
              <div className="flex gap-2">
                 <button className="bg-white/5 hover:bg-white/10 text-white text-[9px] font-bold px-3 py-1 rounded-full border border-border-dark">Fix</button>
                 <button className="bg-transparent text-[#a3b99d] hover:text-white text-[9px] font-bold px-3 py-1">Ignore</button>
              </div>
           </div>

           <div className="bg-surface-dark rounded-2xl p-4 border border-border-dark hover:border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                 <span className="material-symbols-outlined text-blue-400 text-[18px]">auto_fix_high</span>
                 <span className="text-white font-bold text-xs">Clarity</span>
              </div>
              <p className="text-[#a3b99d] text-[10px] leading-relaxed mb-3">Sentence length in paragraph 2 exceeds recommended limits.</p>
              <div className="flex gap-2">
                 <button className="bg-white/5 hover:bg-white/10 text-white text-[9px] font-bold px-3 py-1 rounded-full border border-border-dark">Shorten</button>
                 <button className="bg-transparent text-[#a3b99d] hover:text-white text-[9px] font-bold px-3 py-1">Ignore</button>
              </div>
           </div>
        </div>
      </aside>
    </div>
  );
};

export default AssistantMode;
