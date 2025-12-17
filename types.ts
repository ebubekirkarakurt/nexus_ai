
export type AppMode = 'editor' | 'assistant';

export interface DocumentIssue {
  id: string;
  type: 'Spelling' | 'Clarity' | 'Tone' | 'Grammar';
  page: number;
  originalText: string;
  suggestion: string;
  description?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  draft?: {
    title: string;
    content: string;
  };
}

export interface Section {
  id: string;
  title: string;
  status: 'Analyzed' | 'Needs Data' | 'Focus';
  description: string;
}
