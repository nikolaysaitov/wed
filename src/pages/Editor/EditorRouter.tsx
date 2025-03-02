import { Navigate, Route, Routes } from 'react-router-dom';

import { EditorPage } from './EditorPage.tsx';
import { Template } from '@pages/Editor/DraftPage/Template/Template.tsx';

export function EditorRouter() {
  return (
    <Routes>
      <Route path="/" element={<EditorPage />}>
        <Route index element={<Navigate to="/gallery" replace />} />
        <Route path=":invitationId" element={<Template />} />
      </Route>
    </Routes>
  );
}
