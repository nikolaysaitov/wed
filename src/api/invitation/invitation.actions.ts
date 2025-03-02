import {
  Image,
  Location,
  LocationType,
  ScheduleItem,
  invitationSectionsType
} from './invitation.ts';

export interface SectionAction {
  sectionId: invitationSectionsType;
}

export type ImageAction = Image & SectionAction;
export type ToggleSectionAction = SectionAction & {
  isIncluded: boolean;
};

export interface ToggleLocationAction extends SectionAction {
  sectionId: 'location';
  isIncluded: boolean;
  locationType: LocationType;
}

export interface ChangeLocationAction extends SectionAction, Location {
  sectionId: 'location';
  locationType: LocationType;
}

export interface AddEventAction extends SectionAction, ScheduleItem {
  sectionId: 'timeline';
}

export interface DeleteEventAction extends SectionAction, ScheduleItem {
  sectionId: 'timeline';
}

export interface ChangeEventAction extends SectionAction, Partial<ScheduleItem> {
  sectionId: 'timeline';
}
