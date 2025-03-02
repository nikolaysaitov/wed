import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useUnit } from "effector-react";

import { $user } from "@api/user";
import { LandingPage } from "../LandingPage/LandingPage";
import { Catalog } from "../Catalog/Catalog.tsx";
import { Login } from "../Login/Login";
import Background from "../../components/background/Background.tsx";
import UpButton from "../../components-ui/upButton/UpButton.tsx";
import { UserProvider } from "@context/user/UserProvider.tsx";
import { EditorRouter } from "../Editor/EditorRouter.tsx";
import { ProfileRouter } from "../Profile/ProfileRouter.tsx";
import { GalleryRouter } from "@pages/Gallery/GalleryRouter.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function App() {
  const user = useUnit($user);

  useEffect(() => {
    // console.log(user);
  }, [user]);
  const location = useLocation();

  const [lastVisitedProfilePage, setLastVisitedProfilePage] = useState<string | null>(null);
  useEffect(() => {
    setLastVisitedProfilePage(localStorage.getItem("lastVisitedProfilePage"));
  }, [location]);

  return (
    <UserProvider>
      <Background />
      <UpButton />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to={lastVisitedProfilePage ? lastVisitedProfilePage : `/profile/me`} />} />
          <Route path="profile/*" element={user ? <ProfileRouter /> : <Navigate to="/login" />} />
          <Route path="gallery/*" element={<GalleryRouter />} />
          <Route path="editor/*" element={<EditorRouter />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </QueryClientProvider>
    </UserProvider>
  );
}
