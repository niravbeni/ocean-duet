# OCEAN Duet

An adaptive conversation simulator that generates realistic, multi-turn conversations between two individuals, each defined by customizable OCEAN personality profiles.

## Features

- **Personality-Driven Dialogue**: Generate conversations influenced by Big Five (OCEAN) personality traits
- **Real-time Trait Analysis**: Visualize how personality signals emerge and evolve through trajectory charts
- **Trait Highlighting**: See which parts of dialogue reflect specific personality traits
- **Document Grounding (RAG)**: Upload documents to provide context for participants
- **Adaptive Listening Mode**: (V2-ready) Dynamic communication style adjustments based on detected signals

## Tech Stack

- **Frontend**: Next.js 14+, React, TypeScript, Tailwind CSS, shadcn/ui
- **AI**: OpenAI GPT models for generation and analysis
- **Visualization**: Recharts for trajectory and radar charts
- **State Management**: React Context with useReducer

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/niravbeni/ocean-duet.git
cd ocean-duet
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your OpenAI API key:
```
OPENAI_API_KEY=your-api-key-here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Configure participants (name, role, persona, OCEAN profile)
2. Set up the conversation scenario (topic, background, tone)
3. Click "Start" to begin the simulation
4. Watch the conversation unfold with real-time analytics
5. Toggle trait overlay to see personality signals in the dialogue
6. Click on turns to view detailed radar charts
7. Export conversations as JSON or Markdown

## License

MIT
