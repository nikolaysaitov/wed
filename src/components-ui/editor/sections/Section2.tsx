import { ReactElement, useState } from 'react';

import { Icon } from '../../icon/icon.tsx';
import { Checkbox } from '../inputs/checkbox/Checkbox.tsx';
import { useInvitationStore } from '@api/invitation/invitation-last.store.ts';
import { invitationSectionsType } from '@api/invitation/invitation.ts';
import styles from './Section.module.scss';

type Section1Props = {
  sectionId: invitationSectionsType;
  title: string;
  children?: ReactElement | ReactElement[] | null;
  isOpened?: boolean;
};

export const Section2 = ({ sectionId, title, children, isOpened }: Section1Props) => {
  const [open, setOpen] = useState<boolean>(!!isOpened);
  const section = useInvitationStore(({ sections }) => sections[sectionId]);
  const switchSection = useInvitationStore(({ switchSection }) => switchSection);

  return (
    <section className={`${styles.section2} ${open && styles.open}`}>
      <div className={styles.header}>
        <Checkbox
          initialValue={section.isIncluded}
          onChange={() => {
            switchSection(sectionId);
          }}
          label={title}
        />

        {!!children && (
          <Icon
            className={styles.icon}
            icon={'CaretDown'}
            width={15}
            onClick={() => setOpen((value) => !value)}
          />
        )}
      </div>
      <div className={`${styles.list} ${open && !!children && styles.open}`}>{children}</div>
    </section>
  );
};
