// --- ENUMS
export const Visibility = {
  Private: 0,
  Public: 2
} as const;
export type Visibility = typeof Visibility[keyof typeof Visibility];

export const SatisfactionScale = {
  VeryDissatisfied: 0,
  SlightlyDissatisfied: 1,
  Neither: 2,
  SlightlySatisfied: 3,
  VerySatisfied: 4
} as const;
export type SatisfactionScale = typeof SatisfactionScale[keyof typeof SatisfactionScale];

export const DecisionStatus = {
  Active: 0,
  Reflected: 1,
  Abandoned: 2
} as const;
export type DecisionStatus = typeof DecisionStatus[keyof typeof DecisionStatus];

// --- AUTH
export interface RegisterCommand {
  email?: string;
  password?: string;
}

export interface LoginCommand {
  email?: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
}

// --- DECISIONS
export interface CreateDecisionCommand {
  title: string;
  description: string;
  expectedOutcome: string;
  visibility: Visibility;
  expectedReflectionDate: string;
}

export interface UpdateDecisionCommand {
  id: number;
  title?: string;
  description?: string;
  expectedOutcome?: string;
  visibility?: Visibility;
  expectedReflectionDate?: string | null;
  actualOutcome?: string | null;
  lessonsLearned?: string | null;
  privateNotes?: string | null;
  satisfaction?: SatisfactionScale;
}

export interface DecisionDto {
  id: number;

  // PHASE 1: Defining Decisions
  title: string;
  description: string;
  expectedOutcome: string;
  visibility: Visibility;

  createdAt: string;
  expectedReflectionDate: string;
  status: DecisionStatus;

  // PHASE 2: Reflection
  actualOutcome: string | null;
  lessonsLearned: string | null;
  privateNotes: string | null;
  satisfaction: SatisfactionScale | null;
  reflectedAt: string | null;
}

// --- PUBLIC POSTS
export interface PublicPostDto {
  id: number;
  authorNickname: string;
  title: string;
  description: string;
  actualOutcome: string | null;
  lessonsLearned: string | null;
  satisfaction: SatisfactionScale | null;
  upvoteCount: number;
  publishedAt: string;
}

export interface PaginatedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// RFC 7807
export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  errors?: Record<string, string[]>;
  [key: string]: any;
}
