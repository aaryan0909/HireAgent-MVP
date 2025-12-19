
export type UserType = 'MANAGER' | 'CANDIDATE';

export interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

export interface RoleProfile {
  title: string;
  mustHaveSkills: string[];
  niceToHaveSkills: string[];
  personalityTraits: string[];
  tradeOffs: string;
  applicationInstructions: string;
}

export interface CandidateProfile {
  summary: string;
  skills: string[];
  preferences: string;
  personality: string;
}

export interface MatchResult {
  candidateId: string;
  roleId: string;
  scores: {
    skills: number;
    personality: number;
    overall: number;
  };
  reasoning: string;
  category: 'personality-first' | 'skills-first' | 'hybrid';
}

export interface AppState {
  view: 'specs' | 'demo';
  activeUser: UserType;
  roles: RoleProfile[];
  candidates: CandidateProfile[];
  chatHistory: Message[];
}
