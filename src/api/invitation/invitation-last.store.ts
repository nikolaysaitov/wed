import {
  createSection,
  DetailsSection,
  DressCodeSection,
  LocationSection,
  LocationType,
  RSVPSection,
  ScheduleItem,
  Section,
  SurveySection,
  TimelineSection,
  invitationSectionsType
} from '@api/invitation/invitation.ts';
import { create } from 'zustand';
import { v4 as uuid } from 'uuid';

interface InvitationState {
  name: string;
  wifeName: string;
  husbandName: string;
  weddingDate: Date;
  sections: {
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
  setName: (name: string) => void;
  changeWifeName: (name: string) => void;
  changeHusbandName: (name: string) => void;
  changeWeddingDate: (date: Date) => void;
  switchSection: (id: invitationSectionsType) => void;
  switchLocation: (id: LocationType) => void;
  changeLocationTitle: (id: LocationType, title: string) => void;
  changeLocationAddress: (id: LocationType, address: string) => void;
  addScheduleItem: (item: ScheduleItem) => void;
  deleteScheduleItem: (id: string) => void;
  addPaletteItem: (color: string) => void;
  deletePaletteItem: (color: string) => void;
  deleteLastPaletteItem: () => void;
}

export const useInvitationStore = create<InvitationState>()((set) => ({
  name: '',
  wifeName: '',
  husbandName: '',
  weddingDate: new Date(),
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
    dresscode: {
      ...createSection('dresscode'),
      palette: [
        { id: '1', value: '#83d783' },
        { id: '2', value: '#ea6262' },
        { id: '3', value: '#2d4402' }
      ]
    },
    details: { ...createSection('details'), contents: [] },
    rsvp: { ...createSection('rsvp'), guests: [] },
    questions: { ...createSection('questions'), questions: [] }
  },
  setName: (name: string) => set(() => ({ name })),
  changeWifeName: (wifeName) => set(() => ({ wifeName })),
  changeHusbandName: (husbandName) => set(() => ({ husbandName })),
  changeWeddingDate: (weddingDate) => set(() => ({ weddingDate })),
  switchSection: (id: invitationSectionsType) =>
    set((state) => ({
      ...state,
      sections: {
        ...state.sections,
        [id]: { ...state.sections[id], isIncluded: !state.sections[id].isIncluded }
      }
    })),
  switchLocation: (id: LocationType) =>
    set((state) => ({
      ...state,
      sections: {
        ...state.sections,
        location: {
          ...state.sections.location,
          places: {
            ...state.sections.location.places,
            [id]: {
              ...state.sections.location.places[id],
              isIncluded: !state.sections.location.places[id].isIncluded
            }
          }
        }
      }
    })),
  changeLocationTitle: (id: LocationType, title: string) =>
    set((state) => ({
      ...state,
      sections: {
        ...state.sections,
        location: {
          ...state.sections.location,
          places: {
            ...state.sections.location.places,
            [id]: {
              ...state.sections.location.places[id],
              title
            }
          }
        }
      }
    })),
  changeLocationAddress: (id: LocationType, address: string) =>
    set((state) => ({
      ...state,
      sections: {
        ...state.sections,
        location: {
          ...state.sections.location,
          places: {
            ...state.sections.location.places,
            [id]: {
              ...state.sections.location.places[id],
              address
            }
          }
        }
      }
    })),
  addScheduleItem: (item: ScheduleItem) =>
    set((state) => ({
      ...state,
      sections: {
        ...state.sections,
        timeline: {
          ...state.sections.timeline,
          schedule: [...state.sections.timeline.schedule, item]
        }
      }
    })),
  deleteScheduleItem: (id: string) =>
    set((state) => ({
      ...state,
      sections: {
        ...state.sections,
        timeline: {
          ...state.sections.timeline,
          schedule: state.sections.timeline.schedule.filter(({ time }) => time !== id)
        }
      }
    })),
  addPaletteItem: (value: string) =>
    set((state) => ({
      ...state,
      sections: {
        ...state.sections,
        dresscode: {
          ...state.sections.dresscode,
          palette: [...state.sections.dresscode.palette, { id: uuid(), value }]
        }
      }
    })),
  deletePaletteItem: (color: string) =>
    set((state) => ({
      ...state,
      sections: {
        ...state.sections,
        dresscode: {
          ...state.sections.dresscode,
          palette: state.sections.dresscode.palette.filter(({ id }) => id !== color)
        }
      }
    })),
  deleteLastPaletteItem: () =>
    set((state) => ({
      ...state,
      sections: {
        ...state.sections,
        dresscode: {
          ...state.sections.dresscode,
          palette: state.sections.dresscode.palette.filter(
            (_, i) => i !== state.sections.dresscode.palette.length - 1
          )
        }
      }
    }))
}));
