# OCEAN Duet

An adaptive conversation simulator that generates realistic, multi-turn conversations between two individuals, each defined by customizable OCEAN personality profiles.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fniravbeni%2Focean-duet&env=OPENAI_API_KEY&envDescription=OpenAI%20API%20key%20for%20conversation%20generation&envLink=https%3A%2F%2Fplatform.openai.com%2Fapi-keys&project-name=ocean-duet&repository-name=ocean-duet)

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

## Deploy to Vercel

The easiest way to deploy OCEAN Duet is with Vercel:

1. Click the "Deploy with Vercel" button above
2. Connect your GitHub account
3. Add your `OPENAI_API_KEY` environment variable when prompted
4. Click "Deploy"

Your app will be live in minutes!

### Manual Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add your environment variable in the Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `OPENAI_API_KEY` with your API key

## Local Development

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
```bash
cp .env.example .env.local
# Edit .env.local and add your API key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | Your OpenAI API key for GPT models |

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
