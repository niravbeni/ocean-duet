"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import type {
  ConversationState,
  ConversationTurn,
  Participant,
  Scenario,
  AdaptiveSettings,
  OceanProfile,
  UIState,
  AnalyticsTab,
  Document,
} from "@/lib/types";
import {
  DEFAULT_PARTICIPANT_A,
  DEFAULT_PARTICIPANT_B,
  DEFAULT_SCENARIO,
  DEFAULT_ADAPTIVE_SETTINGS,
} from "@/lib/constants";

// ============================================
// State Types
// ============================================

interface AppState {
  conversation: ConversationState;
  ui: UIState;
}

// ============================================
// Action Types
// ============================================

type Action =
  | { type: "SET_PARTICIPANT_A"; payload: Partial<Participant> }
  | { type: "SET_PARTICIPANT_B"; payload: Partial<Participant> }
  | { type: "SET_SCENARIO"; payload: Partial<Scenario> }
  | { type: "SET_ADAPTIVE_SETTINGS"; payload: Partial<AdaptiveSettings> }
  | { type: "ADD_TURN"; payload: ConversationTurn }
  | { type: "UPDATE_TURN"; payload: { turnId: string; updates: Partial<ConversationTurn> } }
  | { type: "START_CONVERSATION" }
  | { type: "PAUSE_CONVERSATION" }
  | { type: "RESUME_CONVERSATION" }
  | { type: "COMPLETE_CONVERSATION" }
  | { type: "RESET_CONVERSATION" }
  | { type: "SET_CURRENT_SPEAKER"; payload: "A" | "B" }
  | { type: "ADD_DOCUMENT"; payload: { participantId: "A" | "B"; document: Document } }
  | { type: "REMOVE_DOCUMENT"; payload: { participantId: "A" | "B"; documentId: string } }
  | { type: "SET_SELECTED_TURN"; payload: { turnId: string; turnNumber: number } | null }
  | { type: "SET_ANALYTICS_TAB"; payload: AnalyticsTab }
  | { type: "TOGGLE_TRAIT_OVERLAY" }
  | { type: "SET_GENERATING"; payload: boolean }
  | { type: "UPDATE_TRAJECTORY"; payload: { speaker: "A" | "B"; trajectory: OceanProfile } };

// ============================================
// Initial State
// ============================================

const initialState: AppState = {
  conversation: {
    id: uuidv4(),
    participantA: DEFAULT_PARTICIPANT_A,
    participantB: DEFAULT_PARTICIPANT_B,
    scenario: DEFAULT_SCENARIO,
    turns: [],
    adaptiveSettings: DEFAULT_ADAPTIVE_SETTINGS,
    status: "idle",
    currentSpeaker: "A",
    trajectoryA: [],
    trajectoryB: [],
  },
  ui: {
    selectedTurn: null,
    activeAnalyticsTab: "trajectory",
    showTraitOverlay: true,
    isGenerating: false,
  },
};

// ============================================
// Reducer
// ============================================

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_PARTICIPANT_A":
      return {
        ...state,
        conversation: {
          ...state.conversation,
          participantA: { ...state.conversation.participantA, ...action.payload },
        },
      };

    case "SET_PARTICIPANT_B":
      return {
        ...state,
        conversation: {
          ...state.conversation,
          participantB: { ...state.conversation.participantB, ...action.payload },
        },
      };

    case "SET_SCENARIO":
      return {
        ...state,
        conversation: {
          ...state.conversation,
          scenario: { ...state.conversation.scenario, ...action.payload },
        },
      };

    case "SET_ADAPTIVE_SETTINGS":
      return {
        ...state,
        conversation: {
          ...state.conversation,
          adaptiveSettings: { ...state.conversation.adaptiveSettings, ...action.payload },
        },
      };

    case "ADD_TURN":
      return {
        ...state,
        conversation: {
          ...state.conversation,
          turns: [...state.conversation.turns, action.payload],
          currentSpeaker: action.payload.speaker === "A" ? "B" : "A",
        },
      };

    case "UPDATE_TURN":
      return {
        ...state,
        conversation: {
          ...state.conversation,
          turns: state.conversation.turns.map((turn) =>
            turn.id === action.payload.turnId
              ? { ...turn, ...action.payload.updates }
              : turn
          ),
        },
      };

    case "START_CONVERSATION":
      return {
        ...state,
        conversation: {
          ...state.conversation,
          status: "running",
        },
      };

    case "PAUSE_CONVERSATION":
      return {
        ...state,
        conversation: {
          ...state.conversation,
          status: "paused",
        },
      };

    case "RESUME_CONVERSATION":
      return {
        ...state,
        conversation: {
          ...state.conversation,
          status: "running",
        },
      };

    case "COMPLETE_CONVERSATION":
      return {
        ...state,
        conversation: {
          ...state.conversation,
          status: "completed",
        },
      };

    case "RESET_CONVERSATION":
      return {
        ...state,
        conversation: {
          ...state.conversation,
          id: uuidv4(),
          turns: [],
          status: "idle",
          currentSpeaker: "A",
          trajectoryA: [],
          trajectoryB: [],
        },
        ui: {
          ...state.ui,
          selectedTurn: null,
        },
      };

    case "SET_CURRENT_SPEAKER":
      return {
        ...state,
        conversation: {
          ...state.conversation,
          currentSpeaker: action.payload,
        },
      };

    case "ADD_DOCUMENT": {
      const participantKey = action.payload.participantId === "A" ? "participantA" : "participantB";
      return {
        ...state,
        conversation: {
          ...state.conversation,
          [participantKey]: {
            ...state.conversation[participantKey],
            documents: [...state.conversation[participantKey].documents, action.payload.document],
          },
        },
      };
    }

    case "REMOVE_DOCUMENT": {
      const participantKey = action.payload.participantId === "A" ? "participantA" : "participantB";
      return {
        ...state,
        conversation: {
          ...state.conversation,
          [participantKey]: {
            ...state.conversation[participantKey],
            documents: state.conversation[participantKey].documents.filter(
              (doc) => doc.id !== action.payload.documentId
            ),
          },
        },
      };
    }

    case "SET_SELECTED_TURN":
      return {
        ...state,
        ui: {
          ...state.ui,
          selectedTurn: action.payload,
        },
      };

    case "SET_ANALYTICS_TAB":
      return {
        ...state,
        ui: {
          ...state.ui,
          activeAnalyticsTab: action.payload,
        },
      };

    case "TOGGLE_TRAIT_OVERLAY":
      return {
        ...state,
        ui: {
          ...state.ui,
          showTraitOverlay: !state.ui.showTraitOverlay,
        },
      };

    case "SET_GENERATING":
      return {
        ...state,
        ui: {
          ...state.ui,
          isGenerating: action.payload,
        },
      };

    case "UPDATE_TRAJECTORY": {
      const trajectoryKey = action.payload.speaker === "A" ? "trajectoryA" : "trajectoryB";
      return {
        ...state,
        conversation: {
          ...state.conversation,
          [trajectoryKey]: [...state.conversation[trajectoryKey], action.payload.trajectory],
        },
      };
    }

    default:
      return state;
  }
}

// ============================================
// Context
// ============================================

interface ConversationContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  // Convenience actions
  setParticipantA: (updates: Partial<Participant>) => void;
  setParticipantB: (updates: Partial<Participant>) => void;
  setScenario: (updates: Partial<Scenario>) => void;
  setAdaptiveSettings: (updates: Partial<AdaptiveSettings>) => void;
  addTurn: (turn: ConversationTurn) => void;
  updateTurn: (turnId: string, updates: Partial<ConversationTurn>) => void;
  startConversation: () => void;
  pauseConversation: () => void;
  resumeConversation: () => void;
  completeConversation: () => void;
  resetConversation: () => void;
  addDocument: (participantId: "A" | "B", document: Document) => void;
  removeDocument: (participantId: "A" | "B", documentId: string) => void;
  setSelectedTurn: (turnId: string | null, turnNumber?: number) => void;
  setAnalyticsTab: (tab: AnalyticsTab) => void;
  toggleTraitOverlay: () => void;
  setGenerating: (isGenerating: boolean) => void;
  updateTrajectory: (speaker: "A" | "B", trajectory: OceanProfile) => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

// ============================================
// Provider
// ============================================

export function ConversationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value: ConversationContextType = {
    state,
    dispatch,
    setParticipantA: (updates) => dispatch({ type: "SET_PARTICIPANT_A", payload: updates }),
    setParticipantB: (updates) => dispatch({ type: "SET_PARTICIPANT_B", payload: updates }),
    setScenario: (updates) => dispatch({ type: "SET_SCENARIO", payload: updates }),
    setAdaptiveSettings: (updates) => dispatch({ type: "SET_ADAPTIVE_SETTINGS", payload: updates }),
    addTurn: (turn) => dispatch({ type: "ADD_TURN", payload: turn }),
    updateTurn: (turnId, updates) => dispatch({ type: "UPDATE_TURN", payload: { turnId, updates } }),
    startConversation: () => dispatch({ type: "START_CONVERSATION" }),
    pauseConversation: () => dispatch({ type: "PAUSE_CONVERSATION" }),
    resumeConversation: () => dispatch({ type: "RESUME_CONVERSATION" }),
    completeConversation: () => dispatch({ type: "COMPLETE_CONVERSATION" }),
    resetConversation: () => dispatch({ type: "RESET_CONVERSATION" }),
    addDocument: (participantId, document) =>
      dispatch({ type: "ADD_DOCUMENT", payload: { participantId, document } }),
    removeDocument: (participantId, documentId) =>
      dispatch({ type: "REMOVE_DOCUMENT", payload: { participantId, documentId } }),
    setSelectedTurn: (turnId, turnNumber) =>
      dispatch({
        type: "SET_SELECTED_TURN",
        payload: turnId ? { turnId, turnNumber: turnNumber || 0 } : null,
      }),
    setAnalyticsTab: (tab) => dispatch({ type: "SET_ANALYTICS_TAB", payload: tab }),
    toggleTraitOverlay: () => dispatch({ type: "TOGGLE_TRAIT_OVERLAY" }),
    setGenerating: (isGenerating) => dispatch({ type: "SET_GENERATING", payload: isGenerating }),
    updateTrajectory: (speaker, trajectory) =>
      dispatch({ type: "UPDATE_TRAJECTORY", payload: { speaker, trajectory } }),
  };

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
}

// ============================================
// Hook
// ============================================

export function useConversation() {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error("useConversation must be used within a ConversationProvider");
  }
  return context;
}
