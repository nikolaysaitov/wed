import { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { Footer } from '@ui/footer/Footer.tsx';
import { useUser } from '@context/user/UserContext.ts';
import invitationService from '@api/invitation/invitation.service.ts';
import { ITemplate } from '@api/templates/template.ts';
import TemplateService from '@api/templates/template.service.ts';
import styles from './GalleryPage.module.scss';
import { EditorPlug } from '@ui/editor/plug/EditorPlug.tsx';
import { EditorHeader } from '@ui/editor/header/EditorHeader.tsx';
import { GalleryNav } from '@pages/Gallery/ViewPage/Nav/GalleryNav.tsx';

export function GalleryPage() {
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const { templateId } = useParams<'templateId'>();
  const { user } = useUser();
  const navigate = useNavigate();

  const createInvitation = useCallback(
    (templateId: string) => {
      if (!user) return;

      invitationService
        .createInvitation({ userId: user.id, templateId })
        .then(({ id }) => {
          if (!id) return;
          navigate(`/editor/${id}`);
        });
    },
    [user, navigate]
  );

  useEffect(() => {
    TemplateService.getAllTemplates({ page: 1, limit: 20 }).then(
      ({ data: tmpls }) => {
        console.log(tmpls);
        setTemplates(tmpls);
      }
    );
  }, []);

  return (
    <div id="page" className={`${styles.page}`}>
      <EditorHeader
        type={'view'}
        onEdit={templateId ? () => createInvitation(templateId) : undefined}
      />

      <div className={styles.layout}>
        <GalleryNav cards={templates} onEdit={(id) => createInvitation(id)} />

        {templateId ? (
          <Outlet />
        ) : (
          <EditorPlug
            text={
              'Вы пока не выбрали макет. Выберете понравившийся в меню слева'
            }
          />
        )}
      </div>

      <Footer />
    </div>
  );
}
