import { Section2 } from '@ui/editor/sections/Section2.tsx';
import { Checkbox } from '@ui/editor/inputs/checkbox/Checkbox.tsx';
import styles from '../../Aside.module.scss';
import { useInvitationStore } from '@api/invitation/invitation-last.store.ts';

export const Location = () => {
  const { weddingPlace, banquet } = useInvitationStore(({ sections }) => sections.location.places);
  const switchLocation = useInvitationStore(({ switchLocation }) => switchLocation);

  return (
    <Section2 sectionId={'location'} title={'Место проведения'}>
      <div className={styles.subSection}>
        <Checkbox
          label={'Дворец бракосочетания'}
          initialValue={weddingPlace.isIncluded}
          onChange={() => {
            switchLocation('weddingPlace');
          }}
        />
        <Checkbox
          label={'Банкет'}
          initialValue={banquet.isIncluded}
          onChange={() => {
            switchLocation('banquet');
          }}
        />
      </div>
    </Section2>
  );
};
