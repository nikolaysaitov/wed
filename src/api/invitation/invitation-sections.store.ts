import { createEvent, createStore } from 'effector';
import { createSection, Sections } from './invitation.ts';
import { ToggleSectionAction } from './invitation.actions.ts';

export const $invitationSections = createStore<Sections>({
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
});

export const toggleTmplSection = createEvent<ToggleSectionAction>('Toggle section');

$invitationSections.on(toggleTmplSection, (sections, { sectionId, isIncluded = false }) => {
  const section = sections[sectionId];

  return {
    ...sections,
    [sectionId]: { ...section, isIncluded }
  };
});

// const updateTargetStoreEffect = sample({
//   clock: toggleTmplSection,
//   fn: (sourceValue, d) => {
//     return null;
//   },
//   target: $invitation
// });
