import { Navigate, useParams } from 'react-router-dom';

import { Footer } from '@ui/footer/Footer.tsx';
import styles from './EditorPage.module.scss';
import { EditorHeader } from '@ui/editor/header/EditorHeader.tsx';
import { Aside } from '@pages/Editor/DraftPage/Aside/Aside.tsx';
import { useEffect, useState } from 'react';
import invitationService from '@api/invitation/invitation.service.ts';
import templateService from '@api/templates/template.service.ts';
import { EditorPlug } from '@ui/editor/plug/EditorPlug.tsx';
import { Template } from '@pages/Editor/DraftPage/Template/Template.tsx';

export function EditorPage() {
  const { invitationId } = useParams<'invitationId'>();
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [templateHtml, setTemplateHtml] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (!invitationId) return;

    invitationService.getInvitationById(invitationId).then((x) => {
      if (x) {
        setTemplateId(x.templateId);
      }
    });
  }, [invitationId]);

  useEffect(() => {
    if (!templateId) return;
    templateService.getTmplById(templateId).then((html) => {
      // const templateHtml = parse(html, parseTemplateOptions);

      if (html) {
        setTemplateHtml(html);
      }
    });
  }, [templateId]);

  if (!invitationId) {
    return <Navigate to="/gallery" replace />;
  }

  return (
    <div id="page" className={`${styles.page}`}>
      <EditorHeader type={'editor'} />

      <div className={styles.layout}>
        <Aside />

        <section className={styles.template}>
          <EditorPlug
            text={
              'Вы зашли в редактор макета, чтобы внести изменения в текст наведите мышью на выбранным\n' +
              'вами текст для редактирования, щёлкните по нему и введите нужный вам текст.'
            }
          />

          {templateHtml && <Template html={templateHtml} />}
        </section>
      </div>

      <Footer />
    </div>
  );
}
