
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import EditorMode from './components/EditorMode';
import AssistantMode from './components/AssistantMode';
import { AppMode } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('editor');

  const toggleMode = () => {
    setMode(prev => prev === 'editor' ? 'assistant' : 'editor');
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      <Header currentMode={mode} onToggleMode={toggleMode} />
      {mode === 'editor' ? (
        <EditorMode onSwitchToAssistant={() => setMode('assistant')} />
      ) : (
        <AssistantMode onReturnToEditor={() => setMode('editor')} />
      )}
    </div>
  );
};

export default App;
