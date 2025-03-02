import { IColorCard } from '@pages/Editor/DraftPage/Aside/Structure/DressCode/DressCode.model.ts';

export interface Invitation {
  templateId: string;
  wifeName: string;
  husbandName: string;
  weddingDate: Date;
  sections: Sections;
  type: invitationType;
  status: templateStatus;
  blockColor: string;
  font: templateFont;
  userId: string;
}

export interface FullInvitation extends Invitation {
  id: string;
}

export interface ShortInvitation {
  id: string;
  type: invitationType;
  status: templateStatus;
}

export const InvitationTypeI18n: Record<invitationType, string> = {
  personal: 'Персональный',
  common: 'Общий'
};

export type InvitationCreate = Pick<Invitation, 'templateId' | 'userId'> &
  Partial<InvitationMainInfo | InvitationAdditionalInfo | Sections>;
export type InvitationMainInfo = Pick<
  Invitation,
  'wifeName' | 'husbandName' | 'weddingDate'
>;
export type InvitationAdditionalInfo = Pick<
  Invitation,
  'font' | 'type' | 'blockColor'
>;

export type templateStatus = 'draft' | 'completed' | 'published' | 'deleted';
export type templateFont = 'font1' | 'font2' | 'font3' | 'font4';
export type invitationType = 'personal' | 'common';

export type Sections = {
  header: Section;
  info: Section;
  location: LocationSection;
  timeline: TimelineSection;
  timer: Section;
  dresscode: DressCodeSection;
  details: DetailsSection;
  rsvp: RSVPSection;
  questions: SurveySection;
};

export type invitationSectionsType =
  | 'header'
  | 'info'
  | 'location'
  | 'timeline'
  | 'timer'
  | 'dresscode'
  | 'details'
  | 'rsvp'
  | 'questions';

export interface Image {
  id: string;
  url: string;
}

export interface Section {
  sectionId: invitationSectionsType;
  isIncluded: boolean;
  images?: Image[];
}

export interface LocationSection extends Section {
  places: Record<LocationType, Location>;
}

export type LocationType = 'banquet' | 'weddingPlace';

export interface Location {
  isIncluded: boolean;
  subTitle: string;
  address: string;
}

export interface TimelineSection extends Section {
  schedule: ScheduleItem[];
}

export interface ScheduleItem {
  time: Date | string;
  event: string;
}

export interface DressCodeSection extends Section {
  palette: IColorCard[];
}

export interface DetailsSection extends Section {
  contents: string[];
}

export interface RSVPSection extends Section {
  guests: Guest[];
}

export interface Guest {
  fullName: string;
  presence: boolean;
  additionalGuests: number;
}

export interface SurveySection extends Section {
  questions: Question[];
}

export interface Question {
  question: string;
  type: questionType;
  options?: Option[];
}

export type questionType = 'single' | 'multi' | 'text';

export interface Option {
  key: string;
  value: string;
}

export const createInvitation = ({
  templateId,
  userId
}: InvitationCreate): Invitation => ({
  templateId,
  userId,
  wifeName: '',
  husbandName: '',
  weddingDate: new Date(),
  status: 'draft',
  type: 'common',
  font: 'font1',
  blockColor: '',
  sections: {
    header: createSection('header'),
    info: createSection('info'),
    location: {
      ...createSection('location'),
      places: {
        banquet: { isIncluded: true, address: '', subTitle: '' },
        weddingPlace: { isIncluded: true, address: '', subTitle: '' }
      }
    },
    timeline: { ...createSection('timeline'), schedule: [] },
    timer: createSection('timer'),
    dresscode: { ...createSection('dresscode'), palette: [] },
    details: { ...createSection('details'), contents: [] },
    rsvp: { ...createSection('rsvp'), guests: [] },
    questions: { ...createSection('questions'), questions: [] }
  }
});

export const createSection = (sectionId: invitationSectionsType): Section => ({
  sectionId,
  isIncluded: true
});
