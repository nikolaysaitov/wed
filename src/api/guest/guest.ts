import { sortType } from '@api/utils/chunk.ts';

export interface Guest {
  id: string;
  name: string;
  status: boolean;
  answers: Record<string, string | string[]>;
  additional: string[];
  invitationId: string;
}

export interface IGuestRequest {
  questionnaireFilters: IQuestionnaireFilter[];
  page: string;
  limit: string;
  sortBy?: sortType;
  order?: string;
}

export interface IQuestionnaireFilter {
  questionnaireId: string;
  answer: string[];
}

export interface IGuestQueries {
  projectId?: string;
  approval?: approvalType;
}

export type approvalType = 'all' | 'true' | 'false';
