import { Invitation, ShortInvitation } from '@api/invitation/invitation.ts';

export type projectStatus = 'created' | 'paid' | 'deleted';

export interface Project {
  id: string;
  userId: string;
  templateId: string;
  invitations: Invitation[];
  createdAt: Date;
  updatedAt: Date;
  status: projectStatus;
  wifeName?: string;
  husbandName?: string;
  blockColor?: string;
  font: string;
  photos: string[];
  questionnaire: Questionnaire[];
}

export interface ShortProject {
  id: string;
  templateId: string;
  templateName: string;
  status: projectStatus;
  invitations: ShortInvitation[];
}

export type ProjectCreate = Partial<Project> &
  Required<Pick<Project, 'templateId' | 'userId'>>;

export interface Questionnaire {
  id: string;
  projectId: string;
  type: questionnaireType;
  question: string;
  shortName: string;
  options: string[];
}

export type questionnaireType = 'single' | 'multi' | 'text';
