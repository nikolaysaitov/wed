import { ReactNode } from 'react';
// import { LocationType } from '@api/templates/invitation.ts';
// import { useTemplateStore } from '@api/templates/templateLast.store.ts';
import styles from './SwitchableContent.module.scss';
import { LocationType } from '@api/invitation/invitation.ts';
import { useInvitationStore } from '@api/invitation/invitation-last.store.ts';

type SwitchableContentProps = {
  id: LocationType;
  className: string;
  children: ReactNode | ReactNode[] | null;
};

export const SwitchableContent = ({ id, className, children }: SwitchableContentProps) => {
  const isIncluded = useInvitationStore(({ sections }) => sections.location.places[id].isIncluded);

  return <div className={`${className} ${!isIncluded && styles.invisible}`}>{children}</div>;
};
