"use client";

import { SetupPanel } from "@/components/setup/SetupPanel";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { AnalyticsPanel } from "@/components/analytics/AnalyticsPanel";
import { ExportButton } from "@/components/setup/ExportButton";

export default function Home() {
  return (
    <main className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">OCEAN Duet</h1>
          <span className="text-sm text-muted-foreground">
            Adaptive Conversation Simulator
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ExportButton />
          <span className="text-sm text-muted-foreground">v1.0</span>
        </div>
      </header>

      {/* Three-panel layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Setup */}
        <aside className="w-80 border-r flex flex-col overflow-hidden shrink-0">
          <SetupPanel />
        </aside>

        {/* Center Panel - Chat */}
        <section className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <ChatPanel />
        </section>

        {/* Right Panel - Analytics */}
        <aside className="w-96 border-l flex flex-col overflow-hidden shrink-0">
          <AnalyticsPanel />
        </aside>
      </div>
    </main>
  );
}
