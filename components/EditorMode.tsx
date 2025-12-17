
import React, { useState } from 'react';
import { DocumentIssue } from '../types';

interface EditorModeProps {
  onSwitchToAssistant: () => void;
}

const INITIAL_ISSUES: DocumentIssue[] = [
  {
    id: '1',
    type: 'Spelling',
    page: 1,
    originalText: 'revolutionize',
    suggestion: 'optimize',
    description: 'Calculated based on clarity & style'
  },
  {
    id: '2',
    type: 'Clarity',
    page: 1,
    originalText: '...significant reduction...',
    suggestion: '20% reduction',
    description: 'Consider quantifying this claim to add impact.'
  },
  {
    id: '3',
    type: 'Tone',
    page: 2,
    originalText: '...upgraded to support ACID...',
    suggestion: 'Upgraded system for ACID support',
    description: 'Passive voice. Active voice is stronger.'
  }
];

const EditorMode: React.FC<EditorModeProps> = ({ onSwitchToAssistant }) => {
  const [activeTab, setActiveTab] = useState<'Proofing' | 'Comments' | 'Assistant'>('Proofing');

  return (
    <div className="flex flex-1 overflow-hidden relative">
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Toolbar */}
        <div className="flex-none bg-background-dark border-b border-border-dark/50 z-10">
          <div className="px-6 py-2 flex items-center justify-between overflow-x-auto">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1 pr-2">
                <button className="flex flex-col items-center justify-center p-2 px-3 text-white bg-surface-dark/50 hover:bg-white/10 rounded-lg transition-colors border border-border-dark/50">
                  <span className="material-symbols-outlined text-[20px] text-primary mb-0.5">spellcheck</span>
                  <span className="text-[10px] font-medium leading-none">Editor</span>
                </button>
                <button className="flex flex-col items-center justify-center p-2 px-3 text-[#a3b99d] hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-[20px] mb-0.5">bar_chart</span>
                  <span className="text-[10px] font-medium leading-none">Count</span>
                </button>
              </div>
              <div className="w-px h-8 bg-border-dark mx-1"></div>
              <div className="flex items-center gap-1 px-2">
                <button className="flex flex-col items-center justify-center p-2 px-3 text-white bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-[20px] text-primary mb-0.5">edit_document</span>
                  <span className="text-[10px] font-bold leading-none text-primary">Tracking</span>
                </button>
                <div className="flex flex-col gap-1 ml-1">
                  <button className="flex items-center gap-2 px-2 py-0.5 text-xs text-white bg-surface-dark hover:bg-white/10 rounded border border-border-dark text-left w-28">
                    <span className="material-symbols-outlined text-[14px]">visibility</span>
                    All Markup
                  </button>
                  <button className="flex items-center gap-2 px-2 py-0.5 text-xs text-white bg-surface-dark hover:bg-white/10 rounded border border-border-dark text-left w-28">
                    <span className="material-symbols-outlined text-[14px]">reviews</span>
                    Show Markup
                  </button>
                </div>
              </div>
              <div className="w-px h-8 bg-border-dark mx-1"></div>
              <div className="flex items-center gap-1 px-2">
                <button className="flex flex-col items-center justify-center p-2 text-[#a3b99d] hover:text-green-400 rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-[22px]">check_circle</span>
                  <span className="text-[10px] font-medium mt-0.5">Accept</span>
                </button>
                <button className="flex flex-col items-center justify-center p-2 text-[#a3b99d] hover:text-red-400 rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-[22px]">cancel</span>
                  <span className="text-[10px] font-medium mt-0.5">Reject</span>
                </button>
              </div>
              <div className="w-px h-8 bg-border-dark mx-1"></div>
              <div className="flex items-center gap-1 px-2">
                <button className="flex flex-col items-center justify-center p-2 text-[#a3b99d] hover:text-white rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-[20px] mb-0.5">add_comment</span>
                  <span className="text-[10px] font-medium">New</span>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={onSwitchToAssistant}
                className="flex items-center justify-center overflow-hidden rounded-full h-9 bg-surface-dark border border-primary/30 text-white gap-2 text-sm font-bold px-4 hover:bg-primary/10 hover:border-primary transition-all group"
              >
                <span className="material-symbols-outlined text-[18px] text-primary group-hover:scale-110 transition-transform">auto_awesome</span>
                <span className="truncate">AI Rewrite</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Canvas */}
        <main className="flex-1 overflow-y-auto bg-background-dark relative flex justify-center p-8 lg:p-12 scroll-smooth">
          <div className="w-full max-w-[850px] min-h-[1100px] bg-white text-slate-900 rounded-sm page-shadow relative mx-auto mb-20 overflow-hidden">
            <div className="p-[72px] h-full flex flex-col">
              <div className="mb-8 border-b border-gray-100 pb-4">
                <h1 className="text-[36px] font-extrabold leading-tight tracking-tight text-slate-900 mb-2">Project Nexus Proposal</h1>
                <div className="text-sm text-slate-500 font-medium">Prepared for Q4 Strategy Review • October 2023</div>
              </div>
              <div className="prose prose-slate max-w-none">
                <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">1. Executive Summary</h2>
                <p className="text-base text-slate-700 leading-relaxed mb-4">
                  Project Nexus aims to <span className="bg-red-100 text-red-800 line-through decoration-red-500 px-0.5 rounded-sm">revolutionize</span> <span className="bg-green-100 text-green-800 border-b-2 border-green-500 px-0.5 rounded-sm">optimize</span> our internal data processing workflows by integrating advanced machine learning models directly into our ingestion pipelines. This document outlines the technical requirements, expected outcomes, and the timeline for the Q4 rollout. By leveraging real-time analytics, we anticipate a <span className="border-b-2 border-dotted border-blue-500 cursor-pointer bg-blue-50">significant reduction</span> in manual oversight.
                </p>
                
                <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">2. Key Objectives</h2>
                <p className="text-base text-slate-700 leading-relaxed mb-2">Our primary goals for this quarter are focused on efficiency and compliance:</p>
                <ul className="list-disc pl-5 space-y-2 text-slate-700 mb-6">
                  <li><span className="bg-primary/20 px-1 rounded cursor-pointer border-b border-primary/50">Reduce latency by 40%</span> across all regional nodes.</li>
                  <li>Automate 85% of manual tagging tasks using NLP models.</li>
                  <li>Ensure GDPR compliance across all <span className="bg-green-100 text-green-800 border-b-2 border-green-500 px-0.5 rounded-sm">and CCPA</span> new datasets before ingestion.</li>
                  <li>Establish a redundant failover system for critical data paths.</li>
                </ul>

                <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">3. Technical Architecture</h2>
                <p className="text-base text-slate-700 leading-relaxed mb-4">
                  The proposed architecture utilizes a microservices approach. Each service will be containerized and orchestrated via Kubernetes. The data lake layer will be <span className="bg-yellow-100 border-b-2 border-yellow-500 cursor-pointer">upgraded to support ACID transactions</span>, ensuring data integrity during high-throughput periods.
                </p>

                <div className="h-48 w-full bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 mb-6 relative group cursor-pointer">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">image</span>
                    <p className="text-slate-500 text-sm">System Architecture Diagram v1.2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-surface-dark border border-border-dark text-gray-400 text-xs font-medium px-4 py-2 rounded-full shadow-lg flex gap-4 z-20 backdrop-blur-md bg-opacity-90">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Review Mode</span>
            <span className="w-px h-3 bg-gray-600 my-auto"></span>
            <span>3 Changes</span>
            <span className="w-px h-3 bg-gray-600 my-auto"></span>
            <span>2 Comments</span>
            <span className="w-px h-3 bg-gray-600 my-auto"></span>
            <span>English (US)</span>
          </div>
        </main>
      </div>

      {/* Right Sidebar */}
      <aside className="w-[360px] bg-surface-dark border-l border-border-dark flex flex-col shrink-0 z-10">
        <div className="p-4 border-b border-border-dark flex justify-between items-center">
          <div className="flex gap-4">
            {['Proofing', 'Comments', 'Assistant'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`${activeTab === tab ? 'text-white font-bold border-b-2 border-primary' : 'text-[#a3b99d] font-medium hover:text-white'} text-sm pb-4 -mb-4.5 transition-colors`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="text-[#a3b99d] hover:text-white">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {activeTab === 'Proofing' && (
            <>
              <div className="bg-[#2c3928] rounded-xl p-5 mb-2 border border-border-dark relative overflow-hidden">
                <div className="absolute right-0 top-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <h3 className="text-white font-bold text-lg">Editor Score</h3>
                    <p className="text-[#a3b99d] text-xs mt-1">Calculated based on clarity & style</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-primary flex items-center justify-center">
                    <span className="text-white font-bold text-sm">85</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <div className="flex-1 bg-surface-dark rounded-lg p-2 text-center border border-border-dark">
                    <div className="text-white font-bold">2</div>
                    <div className="text-[10px] text-[#a3b99d] uppercase">Spelling</div>
                  </div>
                  <div className="flex-1 bg-surface-dark rounded-lg p-2 text-center border border-border-dark">
                    <div className="text-white font-bold">1</div>
                    <div className="text-[10px] text-[#a3b99d] uppercase">Grammar</div>
                  </div>
                  <div className="flex-1 bg-surface-dark rounded-lg p-2 text-center border border-border-dark">
                    <div className="text-white font-bold">3</div>
                    <div className="text-[10px] text-[#a3b99d] uppercase">Style</div>
                  </div>
                </div>
              </div>

              <p className="text-[#a3b99d] text-xs font-bold uppercase tracking-wider mt-2 mb-1">Critical Issues (2)</p>
              
              {INITIAL_ISSUES.filter(i => i.type !== 'Tone').map((issue) => (
                <div key={issue.id} className="bg-background-dark border border-border-dark rounded-xl p-4 hover:border-primary/50 transition-colors group cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${issue.type === 'Spelling' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                      {issue.type}
                    </span>
                    <span className="text-[#a3b99d] text-xs">Page {issue.page}</span>
                  </div>
                  <p className="text-[#a3b99d] text-sm mb-2 line-through decoration-red-500/50">"{issue.originalText}"</p>
                  <div className="flex gap-2 items-center">
                    <span className="material-symbols-outlined text-[16px] text-primary">arrow_right_alt</span>
                    <p className="text-white text-sm font-bold">{issue.suggestion}</p>
                  </div>
                  {issue.description && (
                    <p className="text-white/60 text-[11px] leading-relaxed italic border-l-2 border-primary/40 pl-2 mt-2">
                      {issue.description}
                    </p>
                  )}
                  <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-primary/20 hover:bg-primary/30 text-primary text-xs font-bold px-3 py-1.5 rounded-lg flex-1">Change</button>
                    <button className="bg-surface-dark hover:bg-white/10 text-[#a3b99d] hover:text-white px-2 py-1.5 rounded-lg">
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}

              <p className="text-[#a3b99d] text-xs font-bold uppercase tracking-wider mt-4 mb-1">Refinements (1)</p>
              <div className="bg-background-dark border border-border-dark rounded-xl p-4 hover:border-primary/50 transition-colors group cursor-pointer opacity-75">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-yellow-500/10 text-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-500/20">Tone</span>
                  <span className="text-[#a3b99d] text-xs">Page 2</span>
                </div>
                <p className="text-[#a3b99d] text-sm mb-2">"...upgraded to support ACID..."</p>
                <p className="text-white text-xs leading-relaxed">Passive voice. Active voice is stronger.</p>
              </div>
            </>
          )}

          {activeTab === 'Assistant' && (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <span className="material-symbols-outlined text-4xl text-primary mb-4">auto_awesome</span>
              <h3 className="text-white font-bold mb-2">Nexus AI Assistant</h3>
              <p className="text-[#a3b99d] text-sm mb-6">Ask me to summarize, rewrite, or analyze this document in detail.</p>
              <button onClick={onSwitchToAssistant} className="w-full bg-primary/20 border border-primary/30 text-primary font-bold py-3 rounded-xl hover:bg-primary/30 transition-all">
                Launch Full Assistant
              </button>
            </div>
          )}
        </div>

        <div className="p-4 bg-background-dark border-t border-border-dark">
          <button className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            Accept All Changes
          </button>
        </div>
      </aside>
    </div>
  );
};

export default EditorMode;
