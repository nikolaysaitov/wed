import { ReactNode, useEffect, useState } from 'react';

import styles from './Template.module.scss';
import { useInvitationStore } from '@api/invitation/invitation-last.store.ts';
import { parseTemplateOptions } from '@pages/Editor/DraftPage/Template/utils/parseTemplate.tsx';
import parse from 'html-react-parser';
import { TemplateViewer } from '@ui/editor/template-viewer/TemplateViewer.tsx';

type Props = {
  html?: string;
};

export const Template = ({ html }: Props) => {
  const [, setTemplateName] = useState<string | undefined>(undefined);
  const [invitationHtml, setInvitationHtml] = useState<
    ReactNode | ReactNode[] | null
  >(null);
  const setName = useInvitationStore(({ setName }) => setName);
  const tmplName = '';

  useEffect(() => {
    if (!html) {
      return;
    }

    const HTMLTemplate = parse(html, parseTemplateOptions);

    console.log(HTMLTemplate);
    if (HTMLTemplate) {
      setInvitationHtml(HTMLTemplate);
    }
  }, [html]);

  useEffect(() => {
    if (tmplName) {
      setTemplateName(tmplName);
      setName(tmplName);
    }
  }, [tmplName]);

  return (
    <section className={styles.container}>
      <TemplateViewer htmlElement={invitationHtml}></TemplateViewer>
    </section>
  );
};
