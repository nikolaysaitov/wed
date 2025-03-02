import { useInvitationStore } from '@api/invitation/invitation-last.store.ts';

type PaletteProps = {
  className?: string;
};
export const Palette = ({ className }: PaletteProps) => {
  const colors = useInvitationStore(
    ({ sections }) => sections.dresscode.palette
  );

  return (
    <ul className={className}>
      {colors.map(({ value }) => (
        <li
          key={value}
          className={'dresscode__color'}
          style={{ background: value }}
        />
      ))}
    </ul>
  );
};
