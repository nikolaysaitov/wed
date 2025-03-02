import { createEvent, createStore } from 'effector';
import { Invitation, invitationSectionsType } from './invitation.ts';
import {
  AddEventAction,
  ChangeEventAction,
  ChangeLocationAction,
  DeleteEventAction,
  ImageAction,
  ToggleLocationAction,
  ToggleSectionAction
} from './invitation.actions.ts';

export const $invitation = createStore<Invitation | null>(null);

export const getSectionById = (sectionId: invitationSectionsType) =>
  $invitation.map((tmpl) => tmpl?.sections[sectionId] ?? null);

export const setInvitation = createEvent<Invitation>('Set current Invitation');
export const changeWeddingDate = createEvent<Date>('Change wedding date');
export const changeHusband = createEvent<string>('Change husband name');
export const changeWife = createEvent<string>('Change wife name');
export const changeImage = createEvent<ImageAction>('Change image');
export const toggleSection = createEvent<ToggleSectionAction>('Toggle section');
export const toggleLocation = createEvent<ToggleLocationAction>('Toggle location');
export const changeLocation = createEvent<ChangeLocationAction>('Change location');
export const addEvent = createEvent<AddEventAction>('Add event');
export const changeEvent = createEvent<ChangeEventAction>('Change event');
export const deleteEvent = createEvent<DeleteEventAction>('Delete event');

$invitation.on(setInvitation, (_, tmpl) => tmpl);

$invitation.on(changeHusband, (invitation, husbandName) =>
  invitation ? { ...invitation, husbandName } : undefined
);

$invitation.on(changeWife, (invitation, wifeName) =>
  invitation ? { ...invitation, wifeName } : undefined
);

$invitation.on(toggleSection, (invitation, { sectionId, isIncluded = false }) => {
  if (invitation) {
    const section = invitation.sections[sectionId];

    const newInvitation = {
      ...invitation,
      sections: { ...invitation.sections, [sectionId]: { ...section, isIncluded } }
    };

    console.log({ newInvitation });

    return newInvitation;
  } else {
    return invitation;
  }
});
