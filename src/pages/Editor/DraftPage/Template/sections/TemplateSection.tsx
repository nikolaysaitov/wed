import { ReactNode, useEffect, useState } from 'react';
import { useInvitationStore } from '@api/invitation/invitation-last.store.ts';
import { invitationSectionsType } from '@api/invitation/invitation.ts';

type TemplateSectionProps = {
  id: invitationSectionsType;
  className: string;
  children: ReactNode | ReactNode[];
};

export const TemplateSection = ({ id, className, children }: TemplateSectionProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const section = useInvitationStore(({ sections }) => sections[id]);

  useEffect(() => {
    setIsVisible(section.isIncluded);
  }, [section]);

  return (
    <>
      {isVisible ? (
        <section id={id} className={className}>
          {children}
        </section>
      ) : (
        <></>
      )}
    </>
  );
};
