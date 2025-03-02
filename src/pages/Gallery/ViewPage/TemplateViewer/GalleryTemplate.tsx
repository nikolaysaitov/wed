import { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

import { TemplateViewer } from '@ui/editor/template-viewer/TemplateViewer.tsx';
import { EditorPlug } from '@ui/editor/plug/EditorPlug.tsx';
import templateService from '@api/templates/template.service.ts';
import { parseViewTemplate } from '@pages/Gallery/ViewPage/utils/parseTemplate.tsx';

export const GalleryTemplate = () => {
  const { templateId } = useParams<'templateId'>();
  const [templateHtml, setTemplateHtml] = useState<
    ReactNode | ReactNode[] | null
  >(null);

  useEffect(() => {
    console.log(templateId);
    if (templateId) {
      templateService
        .getTmplById(templateId)
        .then((res) => {
          // const modifiedHtml = res.replace(
          //   /<head>/i,
          //   `<head><meta name="viewport" content="width=${VIEWPORT_SETTINGS[device].viewportWidth}, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">`,
          // );

          // setTmplHtml(modifiedHtml);

          const rect = parse(res, parseViewTemplate);
          setTemplateHtml(rect);
        })
        .catch(() => {
          setTemplateHtml(null);
        });
    }
  }, [templateId]);

  return templateHtml ? (
    <TemplateViewer htmlUrl={`/api/v1/templates/${templateId}/index.html`} />
  ) : (
    <EditorPlug text={'Шаблон пока в разработке'} />
  );
};
