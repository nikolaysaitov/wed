import { Route, Routes } from 'react-router-dom';

import { GalleryPage } from './GalleryPage.tsx';
import { GalleryTemplate } from './ViewPage/TemplateViewer/GalleryTemplate.tsx';

export function GalleryRouter() {
  return (
    <Routes>
      <Route path="/" element={<GalleryPage />}>
        <Route path=":templateId" element={<GalleryTemplate />} />
      </Route>
    </Routes>
  );
}
