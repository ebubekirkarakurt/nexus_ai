# Nexus AI - Intelligent Document Editor

AI-powered document editor that combines traditional word processing with cutting-edge artificial intelligence. Built to enhance productivity and writing quality with real-time AI assistance and intelligent content analysis.

## Features

### AI Assistant Mode
- Real-time AI support with context-aware responses
- Interactive chat interface for instant help
- Document memory that understands your content

### Smart Content Analysis
- Automatic section analysis and categorization
- Document quality scoring system
- Critical issues detection (spelling, clarity, style)

### Advanced Writing Tools
- Rewrite sections with different tones and formats
- Generate summaries automatically
- Real-time suggestions for passive voice, clarity, and grammar
- Smart recommendations based on writing style

### Review & Proofing
- Track changes with accept/reject functionality
- Comments and markup visualization
- Multiple review states and collaboration features

## Installation

```bash
git clone https://github.com/ebubekirkarakurt/nexus_ai.git
cd nexus_ai
npm install
npm run dev
```

## Usage

```javascript
import NexusAI from 'nexus-ai';

const editor = new NexusAI({
  aiEnabled: true,
  trackChanges: true
});

// Use AI assistant
await editor.ai.ask("Help me improve this paragraph");

// Rewrite content
await editor.ai.rewriteSection({
  tone: 'professional',
  length: 'concise'
});

// Generate summary
const summary = await editor.ai.generateSummary();
```

## Tech Stack

- Frontend: React.js
- AI/ML: Google AI API
- Editor: Custom rich text editor
- Styling: Tailwind CSS
- Build: Vite

## Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

