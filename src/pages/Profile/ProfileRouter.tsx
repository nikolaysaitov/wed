import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Profile } from "./Profile.tsx";
import { UserInfo } from "./info/UserInfo.tsx";
import { UserProject } from "./project/UserProject.tsx";
import { ProfileAnswers } from "./answers/ProfileAnswers.tsx";
import { UserExit } from "./exit/UserExit.tsx";
import { UserLikes } from "./likes/UserLikes.tsx";

export function ProfileRouter() {
  const location = useLocation();

  useEffect(() => {
    const lastVisited = localStorage.getItem("lastVisitedProfilePage");
    if (location.pathname !== "/" && location.pathname !== lastVisited) {
      localStorage.setItem("lastVisitedProfilePage", location.pathname); // Последний маршрут
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Profile />}>
        <Route path="me" element={<UserInfo />} />
        <Route path="project" element={<UserProject />} />
        <Route path="favorites" element={<UserLikes />} />
        <Route path="answers" element={<ProfileAnswers />} />
        <Route path="exit" element={<UserExit />} />
      </Route>
    </Routes>
  );
}
